# 09 - Estilos dos Cards

## Visão Geral
Este documento contém todos os estilos aplicados aos cards das diferentes seções da landing page.

## Seção "Empresários ajudando empresários a crescer com IA"

### Container Externo com Borda

#### Classes Tailwind
```
max-w-6xl w-full p-2 rounded-3xl border
```

#### Propriedades CSS Inline
```css
.container-externo {
  background-color: transparent;
  border-color: #141414;
}
```

#### Breakdown das Propriedades
- **Max Width**: `max-w-6xl` (72rem / 1152px)
- **Width**: `w-full` (100%)
- **Padding**: `p-2` (0.5rem / 8px em todos os lados)
- **Border Radius**: `rounded-3xl` (1.5rem / 24px)
- **Border**: `border` (1px solid)
- **Background**: Transparente
- **Border Color**: `#141414` (cinza muito escuro)

### Card Principal

#### Classes Tailwind
```
w-full p-12 rounded-2xl border relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer min-h-80
```

#### Propriedades CSS Inline
```css
.card-principal {
  background-color: #141414;
  border-color: #323232;
  box-shadow: inset 30px 30px 60px rgba(255, 255, 255, 0.08);
}
```

#### Breakdown das Propriedades

##### Layout e Dimensões
- **Width**: `w-full` (100%)
- **Padding**: `p-12` (3rem / 48px em todos os lados)
- **Min Height**: `min-h-80` (20rem / 320px)
- **Position**: `relative`

##### Aparência Visual
- **Border Radius**: `rounded-2xl` (1rem / 16px)
- **Border**: `border` (1px solid)
- **Background Color**: `#141414` (cinza muito escuro)
- **Border Color**: `#323232` (cinza escuro)
- **Box Shadow**: `inset 30px 30px 60px rgba(255, 255, 255, 0.08)` (sombra interna com brilho sutil)

##### Interatividade
- **Cursor**: `cursor-pointer`
- **Transition**: `transition-transform duration-300 ease-in-out`
- **Hover Effect**: `hover:-translate-y-2` (move 8px para cima no hover)

### Estrutura Hierárquica
```
Container Externo (borda #141414)
└── Card Principal (borda #323232 + sombra interna)
    └── Conteúdo de texto
```

---

## Seção "Por que a maioria dos empresários travam?"

## Estrutura do Grid

### Container Principal
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Mobile */
  grid-template-columns: repeat(2, 1fr); /* Tablet (md) */
  grid-template-columns: repeat(4, 1fr); /* Desktop (lg) */
  gap: 2.5rem; /* 40px */
  max-width: 96rem; /* max-w-8xl */
  margin: 0 auto;
}
```

## Estilos do Card Principal

### Classes Tailwind
```
flex flex-col items-center justify-between p-10 rounded-2xl border h-96 w-full relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer
```

### Propriedades CSS Inline
```css
.card {
  background-color: #141414;
  border-color: #323232;
  box-shadow: inset 30px 30px 60px rgba(255, 255, 255, 0.08);
}
```

### Breakdown das Propriedades

#### Layout e Dimensões
- **Display**: `flex`
- **Flex Direction**: `flex-col` (column)
- **Align Items**: `items-center` (center)
- **Justify Content**: `justify-between` (space-between)
- **Padding**: `p-10` (2.5rem / 40px em todos os lados)
- **Height**: `h-96` (24rem / 384px)
- **Width**: `w-full` (100%)
- **Position**: `relative`

#### Aparência Visual
- **Border Radius**: `rounded-2xl` (1rem / 16px)
- **Border**: `border` (1px solid)
- **Background Color**: `#141414` (cinza muito escuro)
- **Border Color**: `#323232` (cinza escuro)

#### Efeito de Glow Interno
- **Box Shadow**: `inset 30px 30px 60px rgba(255, 255, 255, 0.08)`
  - Tipo: Inset (interno)
  - Offset X: 30px
  - Offset Y: 30px
  - Blur: 60px
  - Cor: Branco com 8% de opacidade
  - Posição: Canto inferior esquerdo

#### Animações e Interações
- **Transition**: `transition-transform duration-300 ease-in-out`
  - Propriedade: transform
  - Duração: 300ms
  - Timing Function: ease-in-out
- **Hover Effect**: `hover:-translate-y-2`
  - Movimento: -8px no eixo Y (para cima)
- **Cursor**: `cursor-pointer`

## Estilos do Container do Ícone

### Classes Tailwind
```
p-4 border
```

### Propriedades CSS Inline
```css
.icon-container {
  background-color: #202020;
  border-color: #3D3D3D;
  border-radius: 3px;
}
```

### Breakdown das Propriedades

#### Layout e Dimensões
- **Padding**: `p-4` (1rem / 16px em todos os lados)
- **Border**: `border` (1px solid)

#### Aparência Visual
- **Background Color**: `#202020` (cinza médio escuro)
- **Border Color**: `#3D3D3D` (cinza médio)
- **Border Radius**: `3px`

#### Ícone
- **Size**: `32px` (width e height)
- **Color**: `text-white` (branco)

## Estilos da Área de Texto

### Container de Texto
```css
.text-container {
  text-align: center;
}
```

### Título (H3)
```css
.card-title {
  font-weight: 500; /* font-medium */
  color: white;
  margin-bottom: 1rem; /* mb-4 */
  font-size: 24px;
}
```

### Parágrafo
```css
.card-description {
  font-weight: 500; /* font-medium */
  line-height: 1.625; /* leading-relaxed */
  font-size: 16px;
  color: #929292;
}
```

## Paleta de Cores

### Cores Principais
- **Card Background**: `#141414` (Cinza muito escuro)
- **Card Border**: `#323232` (Cinza escuro)
- **Icon Container Background**: `#202020` (Cinza médio escuro)
- **Icon Container Border**: `#3D3D3D` (Cinza médio)
- **Title Color**: `#FFFFFF` (Branco)
- **Text Color**: `#929292` (Cinza claro)
- **Glow Color**: `rgba(255, 255, 255, 0.08)` (Branco com 8% opacidade)

### Hierarquia de Cores
1. **Mais Escuro**: `#141414` (Background do card)
2. **Escuro**: `#202020` (Background do ícone)
3. **Médio Escuro**: `#323232` (Border do card)
4. **Médio**: `#3D3D3D` (Border do ícone)
5. **Claro**: `#929292` (Texto descritivo)
6. **Mais Claro**: `#FFFFFF` (Título)

## Responsividade

### Breakpoints
- **Mobile**: `grid-cols-1` (1 coluna)
- **Tablet (md: 768px+)**: `grid-cols-2` (2 colunas)
- **Desktop (lg: 1024px+)**: `grid-cols-4` (4 colunas)

### Gap entre Cards
- **Todas as telas**: `gap-10` (2.5rem / 40px)

## Acessibilidade

### Indicadores Visuais
- **Cursor Pointer**: Indica interatividade
- **Hover Effect**: Feedback visual claro
- **Transition Suave**: Melhora a experiência do usuário

### Contraste
- **Título**: Branco sobre fundo escuro (alto contraste)
- **Texto**: Cinza claro sobre fundo escuro (contraste adequado)

## Implementação CSS Pura

Para implementar estes estilos sem Tailwind:

```css
.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  max-width: 96rem;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem;
  border-radius: 1rem;
  border: 1px solid #323232;
  height: 24rem;
  width: 100%;
  position: relative;
  background-color: #141414;
  box-shadow: inset 30px 30px 60px rgba(255, 255, 255, 0.08);
  transition: transform 300ms ease-in-out;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
}

.card-icon-container {
  padding: 1rem;
  border: 1px solid #3D3D3D;
  background-color: #202020;
  border-radius: 3px;
}

.card-text-container {
  text-align: center;
}

.card-title {
  font-weight: 500;
  color: white;
  margin-bottom: 1rem;
  font-size: 24px;
}

.card-description {
  font-weight: 500;
  line-height: 1.625;
  font-size: 16px;
  color: #929292;
}
```

## Notas de Implementação

1. **Glow Effect**: O efeito de brilho interno é posicionado no canto inferior esquerdo usando `inset 30px 30px 60px`
2. **Hover Animation**: A animação de hover move o card 8px para cima com transição suave
3. **Icon Size**: Todos os ícones têm 32px de tamanho
4. **Typography**: Usa font-weight 500 (medium) para títulos e descrições
5. **Spacing**: Padding consistente de 40px nos cards e 16px nos containers de ícone

## Versão
- **Data**: Dezembro 2024
- **Versão**: 1.0
- **Última Atualização**: Implementação dos efeitos de hover