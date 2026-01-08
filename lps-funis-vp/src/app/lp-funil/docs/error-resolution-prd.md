# PRD - Diagnóstico e Correção do Erro `React.Children.only`

## 1. Resumo Executivo

**Problema:** A aplicação está travando com o erro `Uncaught Error: React.Children.only expected to receive a single React element child.` após a implementação das animações com `framer-motion`.

**Impacto:** Crítico. A aplicação não renderiza, bloqueando todo o desenvolvimento e teste.

**Causa Raiz:** Conflito de estrutura de componentes entre a biblioteca de animação (`framer-motion`) e a biblioteca de componentes de UI (`ShadCN/UI`), especificamente nos componentes de formulário.

**Solução Estratégica:** Remover a animação granular que causa o conflito e adotar uma abordagem de animação de "bloco" que é segura, eficaz e mantém a integridade da estrutura dos componentes filhos.

---

## 2. Diagnóstico Detalhado

### Análise do Erro
O erro `React.Children.only` é lançado pelo React quando um componente pai espera receber *exatamente um* elemento filho, mas recebe múltiplos filhos (ou nenhum). O stack trace aponta claramente para o componente `<Slot.SlotClone>` dentro do `form.tsx` do ShadCN/UI.

### Causa Raiz Técnica
1.  **O Mecanismo do ShadCN/UI:** Componentes como `<FormControl>` (usado dentro de `<FormField>`) são projetados para "clonar" o único filho que recebem (neste caso, o `<Input>`) para injetar propriedades necessárias para acessibilidade e controle de estado (`aria-describedby`, `id`, etc.).
2.  **A Interferência da Framer Motion:** Minha implementação anterior tentou animar cada item individualmente. Ao fazer isso, eu envolvi os componentes `<FormField>` com um componente `<AnimatedItem>`, que é um `motion.div`.
    ```jsx
    // Estrutura que CAUSA O ERRO
    <AnimatedItem>
      <FormField>
        <FormControl>
          <Input />
        </FormControl>
      </FormField>
    </AnimatedItem>
    ```
3.  **O Conflito:** O `motion.div` (`AnimatedItem`) se tornou o filho direto do `FormControl`, mas o `FormControl` esperava o `<Input>`. A `framer-motion` adiciona sua própria lógica e wrappers, quebrando a expectativa do `React.Children.only` do `FormControl`. A tentativa de animar os elementos *dentro* de uma estrutura de componentes complexa e opinativa (como o formulário do ShadCN) violou a API interna desses componentes.

### Por que as Correções Anteriores Falharam?
Minhas tentativas anteriores falharam porque eu continuei tentando fazer a animação granular funcionar, modificando a estrutura de maneiras que não resolviam o conflito fundamental. Eu estava tratando o sintoma (o erro) em vez da doença (a incompatibilidade da abordagem de animação).

---

## 3. A Solução Definitiva: Animação de Bloco

A abordagem mais eficiente, robusta e correta é parar de tentar animar os componentes internos e, em vez disso, animar as **seções como um todo**.

**Princípio:** Os componentes do ShadCN/UI devem permanecer intocados em sua estrutura interna. A animação deve ser aplicada aos seus contêineres de nível superior.

### Plano de Implementação Corretivo

**Passo 1: Remover TODA a Animação Granular (`AnimatedItem`)**
-   Vou percorrer todos os componentes de seção (`InitialSection`, `QualificationSection`, `ObstacleSection`, `MessageSection`, `RejectionSection`).
-   Removerei todos os wrappers `<AnimatedItem>` que foram adicionados ao redor de títulos, cards, botões ou qualquer outro elemento interno.

**Passo 2: Simplificar o Wrapper de Animação**
-   O componente `AnimatedSectionWrapper.tsx` será simplificado. A lógica de `staggerChildren` (animação em cascata) será removida, pois não será mais usada. O wrapper se concentrará apenas na animação de entrada e saída da seção como um bloco único.

**Código do Wrapper Simplificado (`src/components/ui/AnimatedSectionWrapper.tsx`):**
```tsx
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export const AnimatedSection = ({ children, className, stepKey }: { children: React.ReactNode; className?: string; stepKey: string }) => (
  <motion.div
    key={stepKey}
    className={className}
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </motion.div>
);
```
*(Nota: Adicionei `stepKey` para garantir que a `framer-motion` identifique corretamente cada seção como um elemento único.)*

**Passo 3: Aplicar a Animação de Bloco**
-   No roteador principal (`InitialSection.tsx`), cada seção condicional será envolvida por nosso wrapper `<AnimatedSection>` simplificado. A estrutura interna de cada seção (formulários, botões, etc.) ficará limpa, sem `motion.div`s interferindo.

**Exemplo de Refatoração Final em `InitialSection.tsx`:**
```tsx
// ... imports
import { AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSectionWrapper';

// ...
// Dentro do return do componente

<AnimatePresence mode="wait">
  {currentStep === 'form' && (
    <AnimatedSection stepKey="form">
      {/* Todo o JSX da seção do formulário aqui, SEM AnimatedItem */}
    </AnimatedSection>
  )}

  {currentStep === 'sound' && (
    <AnimatedSection stepKey="sound">
      {/* Todo o JSX da seção de som aqui, SEM AnimatedItem */}
    </AnimatedSection>
  )}

  {/* E assim por diante para todas as outras seções */}
</AnimatePresence>
```

**Resultado Esperado:**
-   O erro `React.Children.only` será **completamente eliminado**.
-   As transições entre as seções do funil terão uma animação suave de fade-in/out e movimento, conforme o objetivo original.
-   A integridade dos componentes do ShadCN/UI será preservada, garantindo que eles funcionem como esperado.

Este plano é a abordagem correta e definitiva. Ele respeita as limitações das bibliotecas e foca em alcançar o objetivo de negócio (uma transição animada e suave) sem introduzir instabilidade técnica. Aguardo sua aprovação para executar esta correção.