import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type DiagnosticPayload = {
  leadId?: string;
  name?: string;
  whatsapp?: string;
  instagram?: string;
  site?: string;
  industry?: string;
  obstacles?: string[];
  instagramProfile?: unknown;
};

export async function POST(request: Request) {
  let body: DiagnosticPayload | null = null;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const {
    leadId,
    name,
    whatsapp,
    instagram,
    site,
    industry,
    obstacles,
    instagramProfile,
  } = body ?? {};

  if (!name || !industry || !obstacles || !Array.isArray(obstacles)) {
    return NextResponse.json(
      { error: "Missing required fields." },
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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase =
    supabaseUrl && supabaseKey
      ? createClient(supabaseUrl, supabaseKey)
      : null;

  const finalPrompt = `
    **Contexto da Empresa:**
    A Vertical Partners é especialista em otimizar operações e escalar negócios usando um ecossistema de automação e inteligência artificial (RAA). Nossos serviços incluem:
    - **Agentes de IA para Qualificação:** Automatizam a qualificação de leads, garantindo que apenas os mais preparados cheguem à equipe de vendas.
    - **Agentes de IA para Vendas:** Atuam no processo de vendas, nutrindo leads e realizando follow-ups.
    - **Agentes de IA para Atendimento ao Cliente:** Fornecem suporte 24/7, resolvendo dúvidas e problemas comuns.
    - **Automação de Processos Operacionais:** Reduzem a carga de trabalho manual em tarefas repetitivas (financeiro, agendamentos, etc.).
    - **Análise de Dados com IA:** Extraem insights de dados para otimizar estratégias de marketing e vendas.

    **Sua Persona:** Você é um consultor de negócios sênior e especialista em IA da Vertical Partners. Sua linguagem é profissional, mas inspiradora e direta.

    **Dados do Lead:**
    - Nome: ${name}
    - Indústria: ${industry}
    - Obstáculos Selecionados: ${obstacles.join(", ")}
    - Perfil do Instagram: ${JSON.stringify(instagramProfile, null, 2)}

    **Sua Tarefa OBRIGATÓRIA (Siga à risca):**
    Você deve gerar um diagnóstico estratégico para ${name}. O resultado DEVE ser um objeto JSON com as chaves "personalizedSummary" e "timelineSolutions".

    **Análise Crítica (MUITO IMPORTANTE):**
    - A biografia do Instagram (\`instagramProfile.biography\`) é a fonte de informação mais confiável sobre o negócio real do lead.
    - O campo \`industry\` é a categoria que o lead selecionou, mas pode ser genérico.
    - **Se a biografia contradisser a indústria, você DEVE basear seu diagnóstico na biografia.** Por exemplo, se a indústria for 'Clínica' mas a bio falar sobre 'Advogados', todo o seu texto deve ser focado em advocacia. Ignore a indústria selecionada se a bio for mais específica. Adapte sua linguagem para o nicho real do lead.

    1.  **personalizedSummary (String):**
        - Crie um parágrafo de diagnóstico (máximo de 3-4 frases).
        - Comece se dirigindo a ${name}.
        - Analise o cenário dele com base em sua indústria (${industry}) e nos dados do Instagram (com prioridade na bio).
        - Conecte os obstáculos (${obstacles.join(", ")}) à necessidade urgente de automação e IA.
        - Termine com uma frase de impacto sobre como o ecossistema RAA da Vertical Partners é a solução lógica para o crescimento dele.

    2.  **timelineSolutions (Array de Strings):**
        - Para CADA um dos obstáculos em "${obstacles.join(", ")}", crie uma solução correspondente baseada nos serviços da Vertical Partners listados no contexto.
        - Cada item do array deve ser uma string no formato "**Nome da Solução:** Descrição.".
        - A descrição deve ser curta, clara e mostrar o benefício direto.
        - **Exemplo de Mapeamento (use como guia):**
          - Se o obstáculo for "Sair do operacional", a solução pode ser "**Automação de Processos:** Implementaremos agentes de IA para automatizar suas tarefas repetitivas, liberando seu tempo para focar na estratégia."
          - Se for "Muitos leads desqualificados", a solução pode ser "**Agente de Qualificação com IA:** Nosso agente irá filtrar e qualificar 100% dos seus leads, entregando apenas as melhores oportunidades para seu time."
          - Se for "Baixo volume de vendas", a solução pode ser "**Agente de Vendas com IA:** Um agente de IA irá nutrir e engajar seus leads 24/7, aumentando suas conversões de forma consistente."

    **Formato de Saída (JSON Válido OBRIGATÓRIO):**
    {
      "personalizedSummary": "Sua análise aqui...",
      "timelineSolutions": [
        "**Solução para o Obstáculo 1:** Descrição da solução.",
        "**Solução para o Obstáculo 2:** Descrição da solução.",
        "..."
      ]
    }
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
          model: "gpt-4o",
          messages: [{ role: "user", content: finalPrompt }],
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error(
        "[API /generate-diagnostic] OpenAI error:",
        openaiResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }

    const openaiData = (await openaiResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const rawContent = openaiData?.choices?.[0]?.message?.content || "{}";

    let diagnostic: Record<string, unknown> = {};
    try {
      diagnostic = JSON.parse(rawContent);
    } catch (parseError) {
      console.error("[API /generate-diagnostic] JSON parse error:", parseError);
      return NextResponse.json(
        { error: "Failed to parse diagnostic response." },
        { status: 500 }
      );
    }

    let savedLeadId: string | null = leadId ?? null;

    if (supabase) {
      const profile =
        instagramProfile && typeof instagramProfile === "object"
          ? (instagramProfile as {
              username?: string;
              bio?: string;
              biography?: string;
              followers?: number;
            })
          : null;

      const leadPayload = {
        lead_name: name,
        whatsapp: whatsapp || null,
        instagram_username: instagram || profile?.username || null,
        instagram_bio: profile?.bio || profile?.biography || null,
        instagram_followers: profile?.followers || null,
        industry,
        obstacles,
        diagnostic_summary:
          typeof diagnostic.personalizedSummary === "string"
            ? diagnostic.personalizedSummary
            : null,
      };

      if (leadId) {
        const { data, error } = await supabase
          .from("leads_funil_1")
          .update(leadPayload)
          .eq("id", leadId)
          .select("id")
          .maybeSingle();

        if (error) {
          console.error(
            "[API /generate-diagnostic] Supabase update error:",
            error
          );
        } else {
          savedLeadId = data?.id ?? leadId;
        }
      }

      if (!savedLeadId && whatsapp) {
        const { data: existing, error: findError } = await supabase
          .from("leads_funil_1")
          .select("id")
          .eq("whatsapp", whatsapp)
          .limit(1);

        if (findError) {
          console.error(
            "[API /generate-diagnostic] Supabase lookup error:",
            findError
          );
        } else if (existing && existing[0]?.id) {
          const { data, error } = await supabase
            .from("leads_funil_1")
            .update(leadPayload)
            .eq("id", existing[0].id)
            .select("id")
            .maybeSingle();

          if (error) {
            console.error(
              "[API /generate-diagnostic] Supabase update error:",
              error
            );
          } else {
            savedLeadId = data?.id ?? existing[0].id;
          }
        }
      }

      if (!savedLeadId) {
        const { data, error } = await supabase
          .from("leads_funil_1")
          .insert([leadPayload])
          .select("id")
          .single();

        if (error) {
          console.error(
            "[API /generate-diagnostic] Supabase insert error:",
            error
          );
        } else {
          savedLeadId = data?.id ?? null;
        }
      }
    } else {
      console.warn(
        "[API /generate-diagnostic] Supabase credentials missing; lead not saved."
      );
    }

    return NextResponse.json({
      ...diagnostic,
      leadId: savedLeadId ?? null,
    });
  } catch (error) {
    console.error("[API /generate-diagnostic] Detailed Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
