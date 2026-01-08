import OpenAI from 'openai';
import { APIError } from 'openai/error';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { profileData } = req.body;

  if (!profileData) {
    return res.status(400).json({ error: 'Missing profileData in request body.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: Missing API Key.' });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    - "Com ${profileData.followers} seguidores, você claramente sabe o que está fazendo. Agora, imagine esse alcance com processos otimizados por IA para converter seguidores em clientes."

    **Saída Final (Apenas o texto da mensagem):**
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: finalPrompt }],
      temperature: 0.7,
      max_tokens: 150,
    });

    const message = response.choices[0].message.content?.trim() || "Vimos um grande potencial no seu perfil e acreditamos que podemos ajudar a escalar seus resultados.";
    
    return res.status(200).json({ customMessage: message });

  } catch (error) {
    console.error('[API /generate-insta-message] Error:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof APIError) {
      errorMessage = `OpenAI API Error: ${error.status} ${error.name} - ${error.message}`;
    }
    return res.status(500).json({ error: errorMessage });
  }
};
