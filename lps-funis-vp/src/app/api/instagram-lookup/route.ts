import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RapidProfile = {
  full_name?: string;
  username?: string;
  biography?: string;
  follower_count?: number;
  profile_pic_url?: string;
};

const normalizeInstagramUsername = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const withoutUrl = trimmed
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/[?#].*$/, "")
    .replace(/\/.*$/, "");

  const withoutAt = withoutUrl.replace(/^@+/, "");
  const cleaned = withoutAt.replace(/[^a-zA-Z0-9._]/g, "");

  return cleaned.replace(/\.+$/, "");
};

export async function POST(request: Request) {
  let body: { username?: string } | null = null;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const rawUsername = body?.username ?? "";
  const username = normalizeInstagramUsername(rawUsername);
  if (!username) {
    return NextResponse.json(
      { error: "Instagram username is required." },
      { status: 400 }
    );
  }

  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) {
    console.error("[API /instagram-lookup] FATAL: RAPIDAPI_KEY is not set.");
    return NextResponse.json(
      { error: "Server configuration error: Missing RapidAPI Key." },
      { status: 500 }
    );
  }

  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    console.error("[API /instagram-lookup] FATAL: OPENAI_API_KEY is not set.");
    return NextResponse.json(
      { error: "Server configuration error: Missing OpenAI API Key." },
      { status: 500 }
    );
  }

  try {
    console.log(
      `[API /instagram-lookup] Calling RapidAPI for username: ${username}`
    );

    const rapidUrl = new URL("https://instagram-looter2.p.rapidapi.com/profile2");
    rapidUrl.searchParams.set("username", username);

    const rapidResponse = await fetch(rapidUrl.toString(), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "instagram-looter2.p.rapidapi.com",
      },
      cache: "no-store",
    });

    const profileData = (await rapidResponse.json()) as RapidProfile | null;

    if (
      !rapidResponse.ok ||
      !profileData ||
      !profileData.profile_pic_url ||
      !profileData.full_name
    ) {
      console.warn(
        `[API /instagram-lookup] FINAL VALIDATION FAILED for username: ${username}.`
      );
      return NextResponse.json(
        { error: "Perfil não encontrado. Tem certeza que digitou certo?" },
        { status: 404 }
      );
    }

    const prompt = `
      Com base nos seguintes dados de um perfil do Instagram, crie uma mensagem de saudação curta (1-2 frases), amigável e personalizada para o usuário chamado ${profileData.full_name}. Mencione algo específico sobre a biografia dele.
      Dados do Perfil:
      - Nome Completo: ${profileData.full_name}
      - Username: ${profileData.username}
      - Biografia: ${profileData.biography}
      - Seguidores: ${profileData.follower_count}
      Exemplo de Mensagem: ${profileData.full_name}! Vimos que você é o fundador da Vertical Lex. Impressionante o que você está construindo para advogados!
      Mensagem:
    `;

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error(
        "[API /instagram-lookup] OpenAI error:",
        openaiResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: "Ocorreu um erro inesperado ao buscar o perfil." },
        { status: 500 }
      );
    }

    const openaiData = (await openaiResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const customMessage =
      openaiData?.choices?.[0]?.message?.content ||
      `Olá, ${profileData.full_name}!`;

    return NextResponse.json({
      profileData: {
        fullName: profileData.full_name,
        username: profileData.username,
        biography: profileData.biography,
        bio: profileData.biography,
        followers: profileData.follower_count,
        profilePicUrl: profileData.profile_pic_url,
      },
      customMessage,
    });
  } catch (error) {
    console.error("[API /instagram-lookup] A fatal error occurred:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro inesperado ao buscar o perfil." },
      { status: 500 }
    );
  }
}
