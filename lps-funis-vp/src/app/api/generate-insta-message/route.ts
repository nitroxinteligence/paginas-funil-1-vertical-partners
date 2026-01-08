import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { profileData?: unknown } | null = null;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const profileData = body?.profileData;
  if (!profileData) {
    return NextResponse.json(
      { error: "Missing profileData in request body." },
      { status: 400 }
    );
  }

  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    return NextResponse.json(
      { error: "Server configuration error: Missing API Key." },
      { status: 500 }
    );
  }

  const finalPrompt = `
    **Persona:** Você é um consultor de negócios sênior e especialista em IA da Vertical Partners.

    **Dados do Perfil do Instagram do Lead:**
    ---
    ${JSON.stringify(profileData, null, 2)}
    ---

    **Sua Tarefa OBRIGATÓRIA:**
    1. Analise os dados do perfil (biografia, número de seguidores, nome).
    2. Crie uma mensagem curta, personalizada e impactante (máximo 2 frases).
    3. A mensagem deve reconhecer o estado atual do negócio do lead (com base na bio) e sugerir o potencial de crescimento com a ajuda da Vertical Partners.
    4. Seja direto, use um tom levemente provocador e inspirador.
    5. **NÃO** use o nome do usuário.
    6. **NÃO** se apresente. Vá direto ao ponto.

    **Exemplos de Saída:**
    - "Percebi que você já tem uma base sólida, mas a sua bio mostra que podemos ir muito além. A Vertical Partners existe para transformar potencial em domínio de mercado."
    - "Sua presença online é boa, mas parece que falta uma peça para escalar de verdade. Estamos aqui para ser essa peça e levar sua operação para o próximo nível."
    - "Com ${typeof profileData === "object" && profileData !== null && "followers" in profileData ? (profileData as { followers?: number }).followers : "alguns"} seguidores, você claramente sabe o que está fazendo. Agora, imagine esse alcance com processos otimizados por IA para converter seguidores em clientes."

    **Saída Final (Apenas o texto da mensagem):**
  `;

  try {
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
          messages: [{ role: "user", content: finalPrompt }],
          temperature: 0.7,
          max_tokens: 150,
        }),
      }
    );

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error(
        "[API /generate-insta-message] OpenAI error:",
        openaiResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: "Ocorreu um erro inesperado." },
        { status: 500 }
      );
    }

    const openaiData = (await openaiResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const message =
      openaiData?.choices?.[0]?.message?.content?.trim() ||
      "Vimos um grande potencial no seu perfil e acreditamos que podemos ajudar a escalar seus resultados.";

    return NextResponse.json({ customMessage: message });
  } catch (error) {
    console.error("[API /generate-insta-message] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
