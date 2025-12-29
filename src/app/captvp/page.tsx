"use client";

import { useState, type ReactNode } from "react";
import { MeshGradient, Dithering } from "@paper-design/shaders-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type ShinyButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
};

function ShinyButton({
  children,
  href,
  onClick,
  className = "",
  target,
  rel,
  type = "button",
}: ShinyButtonProps) {
  const Component = (href ? "a" : "button") as "a" | "button";

  return (
    <>
      <style jsx>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-cta {
          --shiny-cta-bg: #0c0b12;
          --shiny-cta-bg-subtle: #13111b;
          --shiny-cta-fg: #ffffff;
          --shiny-cta-highlight: #7bc9ff;
          --shiny-cta-highlight-subtle: #d7a6ff;
          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);

          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          padding: 1.25rem 2.75rem;
          font-size: 1.1rem;
          line-height: 1.2;
          font-weight: 600;
          border: 1px solid transparent;
          border-radius: 9999px;
          color: var(--shiny-cta-fg);
          background: linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
            conic-gradient(
              from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
              transparent,
              var(--shiny-cta-highlight) var(--gradient-percent),
              var(--gradient-shine) calc(var(--gradient-percent) * 2),
              var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
              transparent calc(var(--gradient-percent) * 4)
            ) border-box;
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine, transform, filter;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 280px;
        }

        .shiny-cta::before,
        .shiny-cta::after,
        .shiny-cta span::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active {
          translate: 0 1px;
        }

        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(circle at var(--position) var(--position), white calc(var(--position) / 4), transparent 0)
            padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(from calc(var(--gradient-angle) + 45deg), black, transparent 10% 90%, black);
          border-radius: inherit;
          opacity: 0.35;
          z-index: -1;
        }

        .shiny-cta::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(-50deg, transparent, var(--shiny-cta-highlight), transparent);
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
        }

        .shiny-cta span {
          z-index: 1;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        .shiny-cta,
        .shiny-cta::before,
        .shiny-cta::after {
          animation: var(--animation) var(--duration), var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-cta:is(:hover, :focus-visible) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
          filter: brightness(1.05);
          transform: translateY(-1px);
        }

        .shiny-cta:is(:hover, :focus-visible),
        .shiny-cta:is(:hover, :focus-visible)::before,
        .shiny-cta:is(:hover, :focus-visible)::after {
          animation-play-state: running;
        }

        .shiny-cta:is(:hover, :focus-visible) span::before {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from,
          to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }
      `}</style>
      <Component
        className={`shiny-cta ${className}`}
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        {...(Component === "button" ? { type } : {})}
      >
        <span>{children}</span>
      </Component>
    </>
  );
}

const whatsappMessage =
  "Olá! Vim do site da Vertical Partners e gostaria de saber mais sobre as soluçoes de IA da Vertical.";
const whatsappLink = `https://wa.me/5548996940931?text=${encodeURIComponent(
  whatsappMessage
)}`;

export default function Page() {
  const [step, setStep] = useState<1 | 2>(1);
  const [whatsappValue, setWhatsappValue] = useState("");

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;

    const ddd = digits.slice(0, 2);
    const rest = digits.slice(2);
    const first = rest.slice(0, 1);
    const middle = rest.slice(1, 5);
    const last = rest.slice(5, 9);

    let formatted = `(${ddd}) ${first}`;
    if (middle.length > 0) formatted += `.${middle}`;
    if (last.length > 0) formatted += `-${last}`;
    return formatted;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-72 overflow-hidden sm:-top-24 sm:h-96"
        aria-hidden="true"
      >
        <MeshGradient
          colors={["#5b00ff", "#00ffa3", "#ff9a00", "#ea00ff"]}
          swirl={0.5}
          distortion={0.85}
          speed={0.12}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        {/* @ts-expect-error shadcn preset uses colors/intensity props */}
        <Dithering
          colors={["#ffffff", "#f2f2f2", "#eaeaea"]}
          intensity={0.18}
          shape="simplex"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <section className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-4 text-center">
                <h1 className="text-3xl font-normal leading-tight text-balance sm:text-5xl lg:text-5xl">
                  Veja com seus próprios olhos por que essa IA
                  está deixando empresários e infoprodutores desconfortáveis.
                </h1>
                <div className="space-y-3 text-white/85 font-medium text-base leading-relaxed sm:text-lg">
                  <p>
                    Se você é dono de negócio e ainda resolve tudo na unha, com equipe operacional preguiçosa, talvez assistir esse vídeo de x minutos te incomode um pouco.
                  </p>
                  <p className="text-xl font-semibold text-white sm:text-2xl">Preencha os dados e se surpreenda.</p>
                </div>
              </div>

            <Card className="border-white/10 bg-black text-white">
              <CardContent className="space-y-4">
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setStep(2);
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-white">
                      Digite seu nome completo
                    </Label>
                    <Input
                      id="nome"
                      name="nome"
                      autoComplete="name"
                      required
                      className="border-white/15 bg-black text-white placeholder:text-white/40 focus-visible:border-white/30 focus-visible:ring-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-white">
                      Me diga o seu WhatsApp?
                    </Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={whatsappValue}
                      onChange={(event) => setWhatsappValue(formatWhatsapp(event.target.value))}
                      className="border-white/15 bg-black text-white placeholder:text-white/40 focus-visible:border-white/30 focus-visible:ring-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-white">
                      Quer inserir seu instagram? Personalizamos ainda mais sua jornada.
                    </Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      autoComplete="username"
                      className="border-white/15 bg-black text-white placeholder:text-white/40 focus-visible:border-white/30 focus-visible:ring-white/20"
                    />
                  </div>
                  <ShinyButton type="submit" className="w-full justify-center">
                    CLIQUE E VEJA PORQUE SOMOS DIFERENTES DE TUDO
                  </ShinyButton>
                </form>
              </CardContent>
            </Card>
            </>
          )}

          {step === 2 && (
            <section className="space-y-8 py-10 text-center">
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                ASSISTA ESSE VÍDEO DE 3min e ENTENDA COMO VAMOS DIMINUIR EM ATÉ 80% SEU CUSTO OPERACIONAL E AUMENTAR EM ATÉ 3X SEU FATURAMENTO LÍQUIDO NOS PRÓXIMOS 90 DIAS
              </h2>
              <Card className="border-white/10 bg-black text-white">
                <CardContent className="space-y-4 text-white/85">
                  <div className="flex items-center justify-center rounded-lg border border-white/15 bg-black/40 px-4 py-16 text-center text-sm uppercase tracking-[0.2em] text-white/60 sm:py-20">
                    VIDEO DE APRESENTAÇÃO
                  </div>
                  <ShinyButton href={whatsappLink} target="_blank" rel="noreferrer" className="w-full justify-center">
                    CLIQUE NO BOTÃO E VEJA A MÁGICA ACONTECER
                  </ShinyButton>
                </CardContent>
              </Card>
            </section>
          )}
        </section>

        <footer className="mt-6 border-t border-white/10 pt-8 text-sm text-white/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-base font-semibold text-white">Vertical Partners</p>
              <p className="text-xs text-white/60">IA aplicada para acelerar crescimento e eficiência.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
              <span className="rounded-full border border-white/10 px-3 py-1">Termos</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Privacidade</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Contato</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-white/50">© {new Date().getFullYear()} Vertical Partners. Todos os direitos reservados.</div>
        </footer>
      </div>
    </main>
  );
}
