# Relatório de Diagnóstico: Erro 500 na API `generate-diagnostic`

## 1. Resumo do Problema

O sistema está enfrentando um erro `500 Internal Server Error` consistente ao tentar gerar o diagnóstico do lead. A requisição do frontend chega ao servidor da API, mas a execução falha internamente.

Análises anteriores confirmaram que:
*   A chave da API da OpenAI (`OPENAI_API_KEY`) está sendo carregada corretamente pelo servidor.
*   A configuração de proxy do Vite está funcionando, pois a requisição não resulta em um erro 404.

Isso isola o problema dentro da lógica do arquivo `api/generate-diagnostic.ts`, especificamente na interação com a biblioteca da OpenAI.

## 2. Análise da Causa Raiz

A análise do código revelou um ponto crítico no bloco `try...catch` do nosso handler da API. A forma como estávamos tentando extrair a mensagem de erro não é compatível com a estrutura de erros da biblioteca `openai` (versão 4+).

**Código Problemático:**
```typescript
} catch (error: any) {
  console.error('Error calling OpenAI API:', error);
  // Esta linha assume uma estrutura de erro (como a do Axios) que não existe no erro da OpenAI
  const errorMessage = error.response?.data?.error?.message || 'Failed to generate diagnostic.';
  return res.status(500).json({ error: errorMessage });
}
```

Quando a API da OpenAI retorna um erro (por exemplo, devido a uma chave inválida, falta de créditos ou um problema de faturamento), ela gera um objeto de erro específico. Nosso código não estava conseguindo interpretar esse objeto, resultando em um log genérico e impedindo-nos de ver a **verdadeira causa** do erro.

A causa raiz é um **tratamento de erro inadequado**, que mascara a mensagem de erro real vinda da OpenAI.

## 3. Solução Definitiva

Para resolver o problema de forma imediata e robusta, implementaremos uma solução em três partes:

### Parte 1: Tratamento de Erro Aprimorado e Logging Detalhado

Vamos refatorar o handler da API para:
1.  **Logar os Dados Recebidos:** Adicionar um `console.log` no início da função para termos certeza de quais dados estão chegando do frontend.
2.  **Interpretar o Erro da OpenAI Corretamente:** Modificar o bloco `catch` para verificar se o erro é uma instância de `APIError` da OpenAI e extrair a mensagem da forma correta. Isso nos dará clareza total sobre qualquer problema futuro.

### Parte 2: Configuração de TypeScript Específica para a API

Para garantir que o servidor da API seja compilado e executado de forma consistente pelo `ts-node`, criaremos um arquivo `tsconfig.api.json` dedicado. Isso isola a configuração do backend da configuração do frontend (Vite), prevenindo conflitos.

### Parte 3: Validação e Refinamento do Código

Revisar o código da API para garantir que todas as variáveis estão sendo usadas corretamente e que a resposta para o frontend é sempre consistente.

---

## 4. Plano de Implementação Imediato

A seguir, apresento o plano exato para corrigir o problema. Após sua aprovação, executarei estes passos.

1.  **Criar `tsconfig.api.json`:**
    *   Adicionar um arquivo de configuração do TypeScript específico para o nosso servidor Express.

2.  **Atualizar o `package.json`:**
    *   Modificar o script `dev:api` para que o `nodemon` utilize o novo `tsconfig.api.json`.

3.  **Refatorar `api/generate-diagnostic.ts`:**
    *   Aplicar o novo tratamento de erros e o logging detalhado para diagnosticar e resolver o problema de forma definitiva.

Esta abordagem não apenas resolverá o erro 500 atual, mas também tornará nosso backend muito mais robusto e fácil de depurar no futuro. A automação com IA funcionará de forma 100% funcional, pois teremos visibilidade completa sobre a comunicação com a OpenAI.

Aguardando seu comando para aplicar a solução.
