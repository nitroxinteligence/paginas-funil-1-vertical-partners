import OpenAI from 'openai';
import { APIError } from 'openai/error';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log('[API /generate-diagnostic] Received request:', req.body);

  const { name, industry, obstacles, instagramProfile } = req.body;

  if (!name || !industry || !obstacles) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: Missing API Key.' });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const finalPrompt = `
    **Contexto da Empresa:**
    A Vertical Partners é especialista em otimizar operações e escalar negócios usando um ecossistema de automação e inteligência artificial (RAA). Nossos serviços incluem:
    - **Agentes de IA para Qualificação:** Automatizam a qualificação de leads, garantindo que apenas os mais preparados cheguem à equipe de vendas.
    - **Agentes de IA para Vendas:** Atuam no processo de vendas, nutrindo leads, vendendo e realizando follow-ups.
    - **Agentes de IA para Atendimento ao Cliente:** Fornecem suporte 24/7, resolvendo dúvidas e problemas comuns.
    - **Automação de Processos Operacionais:** Reduzem a carga de trabalho manual em tarefas repetitivas (financeiro, agendamentos, etc.).
    - **Análise de Dados com IA:** Extraem insights de dados para otimizar estratégias de marketing e vendas.

    **Sua Persona:** Você é um consultor de negócios sênior e especialista em IA da Vertical Partners. Sua linguagem é profissional, mas inspiradora e direta.

    **Dados do Lead:**
    - Nome: ${name}
    - Indústria: ${industry}
    - Obstáculos Selecionados: ${obstacles.join(', ')}
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
        - Conecte os obstáculos (${obstacles.join(', ')}) à necessidade urgente de automação e IA.
        - Termine com uma frase de impacto sobre como o ecossistema RAA da Vertical Partners é a solução lógica para o crescimento dele.

    2.  **timelineSolutions (Array de Strings):**
        - Para CADA um dos obstáculos em "${obstacles.join(', ')}", crie uma solução correspondente baseada nos serviços da Vertical Partners listados no contexto.
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
    console.log('[API /generate-diagnostic] Calling OpenAI with new prompt...');
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: finalPrompt }],
      response_format: { type: 'json_object' },
    });

    const rawContent = response.choices[0].message.content;
    console.log('[API /generate-diagnostic] Raw content from OpenAI:', rawContent);

    const diagnostic = JSON.parse(rawContent || '{}');
    
    console.log('[API /generate-diagnostic] Parsed diagnostic from OpenAI:', JSON.stringify(diagnostic, null, 2));
    
    console.log('[API /generate-diagnostic] Final diagnostic generated.');
    return res.status(200).json(diagnostic);

  } catch (error) {
    console.error('[API /generate-diagnostic] Detailed Error:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof APIError) {
      errorMessage = `OpenAI API Error: ${error.status} ${error.name} - ${error.message}`;
    }
    return res.status(500).json({ error: errorMessage });
  }
};