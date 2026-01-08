import axios from 'axios';

export default async (req: any, res: any) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).send('Image URL is required');
  }

  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    // Passa os headers de tipo de conteúdo da imagem original
    res.setHeader('Content-Type', response.headers['content-type']);
    
    // Envia a imagem de volta para o frontend
    response.data.pipe(res);

  } catch (error) {
    console.error('[API /image-proxy] Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
};
