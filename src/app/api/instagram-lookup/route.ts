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

    if (!rapidResponse.ok || !profileData) {
      console.error(
        "[API /instagram-lookup] RapidAPI error:",
        rapidResponse.status,
        profileData
      );
      return NextResponse.json(
        { error: "Falha ao buscar dados do Instagram." },
        { status: 502 }
      );
    }

    const formattedProfileData = {
      fullName: profileData.full_name,
      username: profileData.username,
      biography: profileData.biography,
      bio: profileData.biography,
      followers: profileData.follower_count,
      profilePicUrl: profileData.profile_pic_url,
    };

    const promptForAI = `
      Você é um analista de negócios especialista em marketing digital e IA.
      Sua tarefa é analisar o perfil do Instagram de um lead e extrair uma breve descrição do negócio dele e seu principal desafio.
      
      Dados do perfil:
      ${JSON.stringify(formattedProfileData, null, 2)}
      
      Retorne um JSON válido com duas chaves:
      1. "businessDescription": uma descrição curta (1 frase) do negócio.
      2. "mainChallenge": qual o principal desafio que esse negócio provavelmente enfrenta (1 frase).
      
      Formato:
      { "businessDescription": "...", "mainChallenge": "..." }
    `;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: promptForAI }],
        response_format: { type: "json_object" },
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error(
        "[API /instagram-lookup] OpenAI error:",
        openaiResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: "Falha ao analisar perfil do Instagram." },
        { status: 500 }
      );
    }

    const openaiData = (await openaiResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const rawContent = openaiData?.choices?.[0]?.message?.content || "{}";

    let aiAnalysis: { businessDescription?: string; mainChallenge?: string } = {};
    try {
      aiAnalysis = JSON.parse(rawContent);
    } catch (parseError) {
      console.error("[API /instagram-lookup] JSON parse error:", parseError);
    }

    return NextResponse.json({
      profileData: formattedProfileData,
      aiAnalysis,
    });
  } catch (error) {
    console.error("[API /instagram-lookup] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

