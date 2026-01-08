# PRD - Estratégia de Animação da Interface

## 1. Visão Geral e Objetivos

**Objetivo:** Implementar animações de entrada e saída em todos os componentes da interface para criar uma experiência de usuário fluida, moderna e premium. As animações devem guiar o foco do usuário e tornar as transições entre as etapas do funil claras e agradáveis.

**Princípios Fundamentais:**
- **Consistência:** Todas as animações de entrada e saída devem seguir o mesmo padrão visual (fade-in suave com um leve movimento) para criar uma linguagem de movimento coesa.
- **Performance:** As animações devem ser performáticas, utilizando transformações de CSS (`opacity`, `transform`) aceleradas por hardware para não impactar a responsividade da página.
- **Sutileza:** As animações devem ser rápidas e sutis, aprimorando a experiência sem causar atrasos ou distrações desnecessárias.
- **Exceção:** O botão "VOLTAR" permanecerá estático, pois sua função é de navegação persistente e não deve ser parte da animação de conteúdo.

---

## 2. Requisitos Funcionais

1.  **Animação de Entrada:** Todos os componentes visíveis em cada etapa do funil (títulos, cards, botões, imagens, etc.) devem aparecer com uma animação de "fade-in" (transição de opacidade de 0 para 1) combinada com um leve movimento vertical de baixo para cima.
2.  **Animação de Saída:** Ao transicionar para a próxima etapa, os componentes da etapa atual devem desaparecer com uma animação de "fade-out" (transição de opacidade de 1 para 0) e um leve movimento vertical para cima.
3.  **Animação em Cascata (Staggering):** Dentro de uma mesma etapa, os elementos devem aparecer em uma sequência rápida (em cascata) em vez de todos ao mesmo tempo. Por exemplo, o título aparece primeiro, seguido pelo card, e depois pelo botão. Isso cria um efeito visual mais dinâmico e profissional.
4.  **Gerenciamento de Componentes:** O sistema de animação deve ser capaz de lidar com a entrada e saída de componentes que são renderizados condicionalmente no DOM.

---

## 3. Solução Técnica: Framer Motion

Para atender a todos os requisitos de forma eficiente e robusta, a biblioteca **Framer Motion** será utilizada.

**Justificativa da Escolha:**
- **Feita para React:** Integra-se perfeitamente com o ciclo de vida dos componentes React.
- **`AnimatePresence`:** É a solução ideal para animar componentes que entram e saem do DOM, como é o caso das diferentes seções do nosso funil. Ele detecta quando um componente filho é removido e executa uma animação de saída antes de removê-lo de fato.
- **Declarativa e Reutilizável:** Permite definir animações complexas de forma declarativa através de `variants`, que são objetos de animação reutilizáveis. Isso evita a repetição de código e facilita a manutenção.
- **Animações em Cascata:** Possui uma API nativa e simples para orquestrar animações de componentes filhos (`staggerChildren`), atendendo perfeitamente ao requisito 3.

---

## 4. Plano de Implementação

### Fase 0: Instalação
1.  Adicionar a biblioteca Framer Motion ao projeto.
    ```bash
    npm install framer-motion
    ```

### Fase 1: Criação de um Wrapper de Animação Reutilizável
Para evitar a repetição, criaremos um componente `AnimatedSectionWrapper.tsx` que encapsulará a lógica de animação.

**Código do Wrapper (`src/components/ui/AnimatedSectionWrapper.tsx`):**
```tsx
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      when: 'beforeChildren', // Anima o pai antes dos filhos
      staggerChildren: 0.2, // Atraso entre a animação de cada filho
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.section
    className={className}
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </motion.section>
);

export const AnimatedItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div className={className} variants={itemVariants}>
    {children}
  </motion.div>
);
```

### Fase 2: Integração no Funil
Vamos integrar o wrapper no nosso roteador de seções principal (`InitialSection.tsx`).

1.  **Envolver com `AnimatePresence`:** No `InitialSection.tsx`, o `switch` (ou `if/else`) que renderiza os componentes de cada etapa será envolvido pelo componente `<AnimatePresence>` da Framer Motion. Isso permitirá as animações de saída.
2.  **Aplicar o Wrapper:** Cada seção (o formulário, a tela de som, `QualificationSection`, etc.) será envolvida pelo nosso novo componente `<AnimatedSection>`.
3.  **Aplicar Animação em Cascata:** Dentro de cada seção, os elementos individuais (títulos, cards, botões) serão envolvidos por `<AnimatedItem>` para criar o efeito de cascata.

**Exemplo de Refatoração em `InitialSection.tsx`:**
```tsx
// ... imports
import { AnimatePresence } from 'framer-motion';
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSectionWrapper';

// ...
// Dentro do return do componente

<AnimatePresence mode="wait">
  {currentStep === 'form' && (
    <AnimatedSection key="form">
      <AnimatedItem>
        {/* Título */}
      </AnimatedItem>
      <AnimatedItem>
        {/* Card do Formulário */}
      </AnimatedItem>
      <AnimatedItem>
        {/* Botão "Quero iniciar agora" */}
      </AnimatedItem>
    </AnimatedSection>
  )}

  {currentStep === 'sound' && (
    <AnimatedSection key="sound">
      {/* ... conteúdo da seção de som com AnimatedItem ... */}
    </AnimatedSection>
  )}

  {/* E assim por diante para todas as outras seções */}
</AnimatePresence>
```

### Fase 3: Refatoração de Todas as Seções
Cada componente de seção (`QualificationSection`, `ObstacleSection`, `MessageSection`, etc.) será modificado para usar os wrappers `AnimatedSection` e `AnimatedItem` em seus elementos internos, garantindo que a animação seja aplicada de forma consistente em todo o funil.

Este plano garante uma implementação limpa, reutilizável e de alta qualidade que atenderá a todos os requisitos de animação. Aguardo sua aprovação para começar a execução.