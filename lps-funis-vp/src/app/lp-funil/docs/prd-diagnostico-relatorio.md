# PRD: Seção de Diagnóstico com IA Generativa

## 1. Visão Geral e Objetivo

**Objetivo:** Evoluir a seção de diagnóstico para uma experiência **hiper-personalizada e inteligente**, utilizando um Large Language Model (LLM), o GPT-4o Mini. O objetivo é ir além das respostas pré-definidas, gerando um diagnóstico que analisa e interpreta as informações do lead em tempo real, incluindo sua presença online, para entregar um relatório que soe como uma consultoria exclusiva.

Isso aumentará drasticamente a percepção de valor, a autoridade da nossa marca e a probabilidade de conversão.

---

## 2. Arquitetura da Solução

A implementação exigirá uma arquitetura cliente-servidor:

1.  **Frontend (React):** Coleta os dados do usuário e, ao chegar na etapa de diagnóstico, exibe um estado de "carregamento". Envia os dados para o backend. Após receber a resposta, renderiza o diagnóstico gerado pela IA.
2.  **Backend (Serverless Function/Node.js):** Cria um endpoint seguro (ex: `/api/generate-diagnostic`) que recebe os dados do frontend. É responsável por:
    *   Armazenar e utilizar a API Key da OpenAI de forma segura.
    *   Orquestrar a busca de informações na web.
    *   Construir o prompt e chamar a API do GPT-4o Mini.
    *   Retornar o diagnóstico formatado em JSON para o frontend.

---

## 3. Fluxo de Dados e Geração

1.  **Coleta de Dados (Frontend):** O frontend coletará as seguintes informações:
    *   `name`: Nome do lead.
    *   `whatsapp`: Número do WhatsApp para extração do DDD (localização).
    *   `instagram`: Perfil do Instagram (opcional).
    *   `site`: Website da empresa (opcional).
    *   `industry`: Área de atuação selecionada.
    *   `obstacles`: Lista de obstáculos selecionados.

2.  **Enriquecimento de Dados (Backend com OpenAI Web Search):** O backend receberá os dados e utilizará a ferramenta de pesquisa da OpenAI para enriquecer o contexto:
    *   **Análise de Instagram:** Se fornecido, buscará o perfil para extrair a bio, número de seguidores e temas das postagens recentes para entender o tom de voz e o público.
    *   **Análise do Site:** Se fornecido, analisará o conteúdo para identificar os serviços oferecidos, o posicionamento da marca e o público-alvo.
    *   **Geolocalização:** Utilizará o DDD do WhatsApp para inferir o estado ou região do lead, adicionando um toque de personalização local.

3.  **Geração do Diagnóstico (Backend com GPT-4o Mini):** Com os dados enriquecidos, o backend montará um **prompt detalhado** para o GPT-4o Mini.

    **Exemplo de Estrutura do Prompt:**

    ```
    **Persona:** Você é um consultor de negócios especialista em automação e inteligência artificial para [Indústria do Lead, ex: escritórios de advocacia]. Sua comunicação é empática, estratégica e focada em resultados.

    **Contexto do Lead:**
    - Nome: [Nome]
    - Localização: [Estado inferido pelo DDD]
    - Indústria: [Indústria]
    - Obstáculos Reportados: [Lista de Obstáculos]
    - Análise do Instagram (@[handle]): [Resumo da análise da bio e posts]
    - Análise do Site ([site]): [Resumo dos serviços e posicionamento]

    **Nossas Soluções:**
    - Agente IA SDR: IA para atendimento, qualificação e agendamento 24/7 no WhatsApp.
    - Ecossistema RAA Operacional: Automação de processos internos para liberar o tempo do dono.
    - Agentes IA Internos: IA para otimizar tarefas e aumentar a produtividade da equipe.
    - Agente IA de Prospecção: Sistema autônomo para gerar leads qualificados.

    **Sua Tarefa:**
    Com base em todo o contexto, gere um diagnóstico personalizado em português do Brasil. O resultado DEVE ser um objeto JSON com duas chaves: "summary" e "solutions".

    1.  **summary:** Escreva um parágrafo de resumo (3-4 frases) que conecte a indústria do lead, seus desafios e as informações da presença online. O tom deve ser consultivo, mostrando que entendemos profundamente o seu cenário.
    2.  **solutions:** Crie uma lista de 2 a 3 itens. Para cada item, descreva de forma clara e orientada a benefícios como uma de nossas soluções resolve diretamente um dos problemas diagnosticados. Use os nomes das nossas soluções.

    **Exemplo de Saída JSON:**
    {
      "summary": "...",
      "solutions": [
        "**Agente IA SDR:** Para resolver a sobrecarga no seu WhatsApp, implementaremos uma IA que não só responderá instantaneamente, mas também qualificará cada contato, garantindo que apenas os casos mais importantes cheguem até você.",
        "..."
      ]
    }
    ```

---

## 4. Plano de Implementação

### Backend

1.  **Setup:** Criar um novo diretório `/api` ou configurar um ambiente serverless.
2.  **Endpoint:** Desenvolver a função `generate-diagnostic.ts` que lida com as requisições POST.
3.  **Segurança:** Carregar a `OPENAI_API_KEY` a partir de variáveis de ambiente (`.env`).
4.  **Lógica:** Implementar a lógica de enriquecimento de dados e a chamada para a API da OpenAI com o prompt estruturado.
5.  **Tratamento de Erros:** Garantir que a API lide com falhas na chamada à OpenAI e retorne um erro apropriado.

### Frontend

1.  **Estado de Carregamento:** No `DiagnosticSection.tsx`, adicionar um estado para `loading`, `error` e `data`.
2.  **API Call:** Usar um `useEffect` que, ao montar o componente, envia os dados do lead (props) para o endpoint `/api/generate-diagnostic`.
3.  **Renderização Condicional:**
    *   Se `loading` for `true`, exibir um componente de spinner ou skeleton (ex: "Analisando seu perfil, um momento...").
    *   Se `error` for `true`, exibir uma mensagem de erro amigável.
    *   Se `data` estiver disponível, renderizar o `summary` e a lista de `solutions` recebidos da API.
4.  **Prop Drilling:**
    *   Garantir que `industry`, `selectedObstacles`, `name`, `whatsapp`, `instagram` e `site` sejam coletados e passados de `App.tsx` até `DiagnosticSection.tsx`.

---

Com este PRD, temos um plano claro para criar uma experiência de diagnóstico verdadeiramente inteligente e de alto valor.

**Aguardando seu comando para iniciar a implementação.**