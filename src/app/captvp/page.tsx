"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { getSupabaseClient } from "@/lib/supabaseClient";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const nome = String(formData.get("nome") || "").trim();
    const whatsapp = String(formData.get("whatsapp") || "").trim();
    const instagramValue = String(formData.get("instagram") || "").trim();
    const instagram = instagramValue.length ? instagramValue : null;

    if (!nome || !whatsapp) {
      setSubmitError("Preencha nome e WhatsApp para continuar.");
      setIsSubmitting(false);
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setSubmitError("Supabase não configurado. Preencha o .env com as credenciais.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("leads_captvp")
      .insert([{ nome, whatsapp, instagram }]);

    if (error) {
      console.error("Supabase insert failed:", error);
      setSubmitError("Não foi possível enviar seus dados agora. Tente novamente.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setStep(2);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors dark:bg-black dark:text-white">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <section className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-4 text-center">
                <h1 className="text-3xl font-normal leading-tight text-balance sm:text-5xl lg:text-5xl">
                  Veja com seus próprios olhos{" "}
                  <span className="bg-gradient-to-r from-blue-300 via-blue-300 to-blue-200 bg-clip-text font-semibold text-transparent">
                    por que essa IA está deixando empresários
                  </span>{" "}
                  e infoprodutores{" "}
                  <span className="text-blue-200 font-semibold">desconfortáveis.</span>
                </h1>
                <div className="space-y-3 text-slate-700 font-medium text-base leading-relaxed sm:text-lg dark:text-white/85">
                  <p>
                    Se você é dono de negócio e ainda resolve tudo na unha, com equipe operacional preguiçosa, talvez assistir esse vídeo de 3 minutos te incomode um pouco.
                  </p>
                  <p className="text-xl font-semibold text-slate-900 sm:text-2xl dark:text-white">Preencha os dados e se surpreenda.</p>
                </div>
              </div>

            <Card className="border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-black dark:text-white">
              <CardContent className="space-y-4">
                <form className="space-y-4" onSubmit={handleLeadSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-slate-900 dark:text-white">
                      Digite seu nome completo
                    </Label>
                    <Input
                      id="nome"
                      name="nome"
                      autoComplete="name"
                      required
                      className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-300 dark:border-white/15 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-slate-900 dark:text-white">
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
                      className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-300 dark:border-white/15 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-slate-900 dark:text-white">
                      Quer inserir seu instagram? Personalizamos ainda mais sua jornada.
                    </Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      autoComplete="username"
                      className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-300 dark:border-white/15 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/20"
                    />
                  </div>
                  <ShinyButton type="submit" className="w-full justify-center">
                    {isSubmitting ? "Enviando..." : "CLIQUE E VEJA PORQUE SOMOS DIFERENTES DE TUDO"}
                  </ShinyButton>
                  {submitError && (
                    <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {submitError}
                    </p>
                  )}
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
              <Card className="border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-black dark:text-white">
                <CardContent className="space-y-4 text-slate-700 dark:text-white/85">
                  <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100/80 px-4 py-16 text-center text-sm uppercase tracking-[0.2em] text-slate-500 sm:py-20 dark:border-white/15 dark:bg-black/40 dark:text-white/60">
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

      </div>
      <div className="mx-auto w-full max-w-5xl px-6 pb-16 sm:pb-20">
        <footer className="mt-20 w-full rounded-[50px] border border-slate-700/40 px-16 py-20 text-sm text-slate-600 sm:px-20 sm:py-24 dark:border-white/15 dark:text-white/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-900 dark:text-white">Vertical Partners</p>
              <p className="text-xs text-slate-500 dark:text-white/60">IA aplicada para acelerar crescimento e eficiência.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-white/60">
              <Link
                href="/termos-de-uso"
                className="rounded-full border border-slate-200 px-3 py-1 transition-colors hover:border-slate-300 dark:border-white/10 dark:hover:border-white/30"
              >
                Termos
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="rounded-full border border-slate-200 px-3 py-1 transition-colors hover:border-slate-300 dark:border-white/10 dark:hover:border-white/30"
              >
                Privacidade
              </Link>
              <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-white/10">Contato</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 dark:text-white/50">© {new Date().getFullYear()} Vertical Partners. Todos os direitos reservados.</div>
        </footer>
      </div>
    </main>
  );
}
