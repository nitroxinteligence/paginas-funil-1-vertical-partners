import axios from 'axios';
import OpenAI from 'openai';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Instagram username is required.' });
  }

  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) {
    console.error('[API /instagram-lookup] FATAL: RAPIDAPI_KEY is not set in .env file');
    return res.status(500).json({ error: 'Server configuration error: Missing RapidAPI Key.' });
  }
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('[API /instagram-lookup] FATAL: OPENAI_API_KEY is not set in .env file');
    return res.status(500).json({ error: 'Server configuration error: Missing OpenAI API Key.' });
  }

  try {
    // 1. Chamar a RapidAPI para buscar dados do perfil
    console.log(`[API /instagram-lookup] Calling RapidAPI for username: ${username}`);
    const options = {
      method: 'GET',
      url: 'https://instagram-looter2.p.rapidapi.com/profile2',
      params: { username },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'instagram-looter2.p.rapidapi.com'
      },
      validateStatus: () => true, // Sempre trata a resposta para inspecionar os dados
    };
    const response = await axios.request(options);
    const profileData = response.data;

    // VALIDAÇÃO DEFINITIVA:
    // Um perfil real DEVE ter uma foto e um nome completo.
    // Se a API retornar um objeto sem esses campos, é um perfil inválido.
    if (response.status !== 200 || !profileData || !profileData.profile_pic_url || !profileData.full_name) {
      console.warn(`[API /instagram-lookup] FINAL VALIDATION FAILED for username: ${username}. API returned insufficient data.`);
      return res.status(404).json({ error: 'Perfil não encontrado. Tem certeza que digitou certo?' });
    }
    
    console.log('[API /instagram-lookup] Successfully fetched and validated data from RapidAPI.');

    // 2. Chamar a OpenAI para gerar uma mensagem personalizada
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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

    const openAIResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });
    const customMessage = openAIResponse.choices[0].message.content || `Olá, ${profileData.full_name}!`;

    // 3. Retornar os dados combinados
    return res.status(200).json({
      profileData: {
        fullName: profileData.full_name,
        username: profileData.username,
        biography: profileData.biography,
        followers: profileData.follower_count,
        profilePicUrl: profileData.profile_pic_url,
      },
      customMessage,
    });

  } catch (error: any) {
    console.error('[API /instagram-lookup] A fatal error occurred:', error);
    return res.status(500).json({ error: 'Ocorreu um erro inesperado ao buscar o perfil.' });
  }
};