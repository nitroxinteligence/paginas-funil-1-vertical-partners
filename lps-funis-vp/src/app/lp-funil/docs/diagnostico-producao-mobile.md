# PRD: Diagnóstico e Resolução de Inconsistências Mobile (Produção vs. Desenvolvimento)

## 1. Resumo do Problema

A aplicação está apresentando duas falhas críticas **exclusivamente no ambiente de produção (Vercel) e em dispositivos móveis**:

1.  **Inconsistência Visual Grave:** A `InitialSection` e potencialmente outros componentes estão com o layout quebrado, com estilos ausentes ou aplicados incorretamente. Isso não ocorre no ambiente de desenvolvimento local.
2.  **Erro de Runtime Crítico:** Ao interagir com a `QualificationSection` (provavelmente ao clicar no botão "Continuar"), a aplicação quebra com o erro `TypeError: Cannot read properties of null (reading 'default')`.

Esses problemas impedem o uso da aplicação em produção e indicam uma falha no processo de build e otimização para o ambiente final.

## 2. Análise e Diagnóstico

### 2.1. Causa Raiz do Problema Visual (CSS)

**Diagnóstico:** A purga de CSS do Tailwind CSS está removendo classes de utilitário necessárias no build de produção.

**Evidência:** O arquivo `tailwind.config.cjs` possui uma configuração incorreta na diretiva `content`:

```javascript
// tailwind.config.cjs
module.exports = {
  // ...
  content: [
    './index.html',
    './pages/**/*.{js,jsx}', // <-- CAMINHO INCORRETO
    './components/**/*.{js,jsx}', // <-- CAMINHO INCORRETO
    './app/**/*.{js,jsx}', // <-- CAMINHO INCORRETO
    './src/**/*.{js,jsx,ts,tsx}', // <-- Caminho correto, mas a presença dos outros é problemática
  ],
  // ...
}
```

O projeto não possui as pastas `pages/`, `components/` (na raiz) ou `app/`. O Tailwind, ao não encontrar arquivos nesses caminhos, deixa de escanear uma parte significativa dos componentes, resultando na remoção de suas classes no CSS final de produção. Em desenvolvimento, a purga não é tão agressiva, e por isso os estilos funcionam.

### 2.2. Causa Raiz do Erro de Runtime

**Diagnóstico:** A biblioteca `typewriter-effect` está falhando ao ser importada no build de produção devido a um conflito de formato de módulo (CommonJS vs. ES Modules).

**Evidência:** O erro `Cannot read properties of null (reading 'default')` é um sintoma clássico de falha na interoperabilidade de módulos. O Vite e seu bundler (esbuild) otimizam o código para produção, e algumas bibliotecas que não seguem estritamente o padrão ES Modules podem ser "quebradas" nesse processo. A importação `import Typewriter from 'typewriter-effect';` espera um `export default` que, após o processo de build, se torna `null`. A pesquisa na web confirma que este é um problema recorrente com bibliotecas como essa em ambientes Vite.

## 3. Plano de Ação e Soluções Propostas

Para resolver esses problemas de forma definitiva, as seguintes alterações devem ser aplicadas:

### 3.1. Solução para o Problema Visual

**Ação:** Corrigir a configuração `content` no arquivo `tailwind.config.cjs` para que ela reflita com precisão a estrutura de arquivos do projeto.

**Implementação:**

1.  Abra o arquivo `tailwind.config.cjs`.
2.  Substitua o array `content` pelo seguinte:

    ```javascript
    // tailwind.config.cjs
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    ```

    Esta configuração instrui o Tailwind a escanear o `index.html` e **todos** os arquivos `.js`, `.jsx`, `.ts` e `.tsx` dentro da pasta `src/`, garantindo que nenhuma classe utilizada seja removida no build.

### 3.2. Solução para o Erro de Runtime

**Ação:** Forçar o Vite a pré-empacotar a dependência `typewriter-effect` para garantir sua compatibilidade no build de produção.

**Implementação:**

1.  Abra o arquivo `vite.config.js`.
2.  Adicione a configuração `optimizeDeps` para incluir a biblioteca problemática:

    ```javascript
    // vite.config.js
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import path from 'path'

    export default defineConfig({
      plugins: [react()],
      server: {
        // ... (proxy config)
      },
      resolve: {
        // ... (alias config)
      },
      // ADICIONAR ESTA SEÇÃO
      optimizeDeps: {
        include: ['typewriter-effect'],
      },
    })
    ```

    Isso instrui o Vite a tratar `typewriter-effect` de forma especial durante a otimização de dependências, resolvendo a incompatibilidade de módulos.

## 4. Verificação e Próximos Passos

1.  **Aplicar as Correções:** Modifique os arquivos `tailwind.config.cjs` e `vite.config.js` conforme descrito acima.
2.  **Gerar um Novo Build:** Rode o comando `npm run build` localmente para simular o ambiente de produção.
3.  **Testar Localmente:** Use o comando `npm run preview` para servir o build de produção localmente e testar exaustivamente a aplicação no modo mobile do seu navegador.
4.  **Deploy:** Se os testes locais forem bem-sucedidos, faça o deploy das alterações para a Vercel.
5.  **Verificação Final:** Teste a aplicação no ambiente de produção da Vercel em um dispositivo móvel real para confirmar que ambos os problemas foram resolvidos.
