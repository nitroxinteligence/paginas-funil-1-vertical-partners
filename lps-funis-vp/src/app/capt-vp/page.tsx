"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowRight } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseClient";

const whatsappMessage =
  "Olá! Vim do site da Vertical Partners e gostaria de saber mais sobre as soluçoes de IA da Vertical.";
const whatsappLink = `https://wa.me/5548996940931?text=${encodeURIComponent(
  whatsappMessage
)}`;

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

export default function Page() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [whatsappValue, setWhatsappValue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (!digits) {
      return "";
    }

    if (digits.length <= 2) {
      return `(${digits}`;
    }

    const ddd = digits.slice(0, 2);
    const rest = digits.slice(2);
    const first = rest.slice(0, 1);
    const middle = rest.slice(1, 5);
    const last = rest.slice(5, 9);

    let formatted = `(${ddd}) ${first}`;

    if (middle.length > 0) {
      formatted += `.${middle}`;
    }

    if (last.length > 0) {
      formatted += `-${last}`;
    }

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
      .from("leads_capt_vp")
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
        {step === 1 && (
          <section className="space-y-6">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-normal leading-tight text-balance sm:text-5xl lg:text-5xl">
                Veja com seus próprios olhos{" "}
                <span className="bg-gradient-to-r from-blue-300 via-blue-300 to-blue-200 bg-clip-text font-semibold text-transparent">
                  por que essa IA está deixando empresários
                </span>{" "}
                e infoprodutores{" "}
                <span className="text-blue-200 font-semibold">desconfortáveis.</span>
              </h1>
              <div className="space-y-4 text-slate-700 font-medium text-base leading-relaxed sm:text-lg dark:text-white/85">
                <p>Não é venda. Não é promessa. É demonstração!</p>
                <p>
                  Se você é dono de negócio e ainda resolve tudo na unha, com
                  equipe operacional preguiçosa, talvez isso te incomode um
                  pouco.
                </p>
                <p>Você não está se cadastrando. Está se qualificando!</p>
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
                    onChange={(event) => {
                      setWhatsappValue(formatWhatsapp(event.target.value));
                    }}
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
                    {isSubmitting ? "Enviando..." : "Quero prosseguir"}
                  </ShinyButton>
                  {submitError && (
                    <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {submitError}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-normal leading-tight text-balance sm:text-5xl lg:text-5xl">
                Nós testamos de tudo para fazer você chegar até o final deste
                fluxo e o que deu certo foram duas coisas…
              </h1>
              <div className="space-y-4 text-slate-700 font-medium text-base leading-relaxed sm:text-lg dark:text-white/85">
                <Card className="rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
                  <CardContent className="space-y-4 px-4 py-5 sm:px-6">
                    <Card className="gap-0 border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-lime-400/15 py-4 text-emerald-50 shadow-none">
                      <CardContent className="flex items-start gap-3 px-4 sm:px-6">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/10 text-lg font-semibold text-emerald-100">
                          1
                        </div>
                        <div className="flex min-w-0 flex-wrap items-center gap-2 text-left text-sm font-medium sm:text-base">
                          <span>Vídeo de 3 minutos</span>
                          <ArrowRight
                            className="size-4 text-emerald-200/80"
                            aria-hidden="true"
                          />
                          <span>IA atendendo no WhatsApp</span>
                          <ArrowRight
                            className="size-4 text-emerald-200/80"
                            aria-hidden="true"
                          />
                          <span>Qualificação</span>
                          <ArrowRight
                            className="size-4 text-emerald-200/80"
                            aria-hidden="true"
                          />
                          <span>Ligação</span>
                          <ArrowRight
                            className="size-4 text-emerald-200/80"
                            aria-hidden="true"
                          />
                          <span>Agendamento</span>
                          <ArrowRight
                            className="size-4 text-emerald-200/80"
                            aria-hidden="true"
                          />
                          <span>Reunião de Diagnóstico</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="gap-0 border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-200 py-4 text-slate-900/90 shadow-none dark:border-white/15 dark:from-white/12 dark:via-white/6 dark:to-white/16 dark:text-white/90">
                      <CardContent className="flex items-center gap-3 px-4 sm:px-6">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-white/80">
                          2
                        </div>
                        <p className="min-w-0 text-left text-sm font-medium sm:text-base">
                          Segunda opção: Direto para o WhatsApp (rápido e objetivo)
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
                {!showDetails && (
                  <div className="flex flex-col items-center gap-6 py-6">
                    <Button
                      variant="outline"
                      className="group w-full bg-black text-base font-medium text-white shadow-[0_0_32px_rgba(15,23,42,0.18)] hover:bg-black/90 focus-visible:bg-black/90 hover:text-white focus-visible:text-white [&_svg]:text-white hover:[&_svg]:text-white sm:w-[320px] sm:text-lg sm:hover:w-[360px] h-14 px-10 sm:h-16 sm:px-14 transition-[width] duration-200 ease-out dark:bg-white dark:text-black dark:shadow-[0_0_32px_rgba(255,255,255,0.22)] dark:hover:bg-white dark:focus-visible:bg-white dark:hover:text-black dark:focus-visible:text-black dark:[&_svg]:text-black dark:hover:[&_svg]:text-black"
                      onClick={() => setShowDetails(true)}
                    >
                      <span>Clique para entender tudo!</span>
                      <ArrowDown className="ml-2 size-4 -translate-y-0.5 opacity-80 text-white dark:text-black" />
                    </Button>
                    <div className="h-px w-full bg-slate-200 dark:bg-white/10" />
                  </div>
                )}
                {showDetails && (
                  <div className="space-y-4 animate-in fade-in duration-500 mt-14">
                    <p>
                      Porque existem os sem tempo. Os apressados. Aqueles que não gostam de
                      encheção de linguiça. E como quem manda nesse fluxo é
                      você, se não quiser assistir ao nosso vídeo (que não é enrolação) 
                      sobre o que fazemos, e por que fazemos tão bem, 
                      você pode ir direto para o WhatsApp e testar
                      na prática!
                    </p>
                     <p>
                      Acreditamos fielmente que nada converte mais
                      do que ver o fluxo rodando ao vivo!
                    </p>
                    <p>
                      Por isso, em vez de te explicar, a gente prefere mostrar.
                    </p>
                    <p>Promessa é teatro. Fluxo rodando é prova!</p>
                    {!showChoices && (
                      <div className="flex flex-col items-center gap-6 py-6">
                      <Button
                        variant="outline"
                        className="group w-full bg-black text-base font-medium text-white shadow-[0_0_32px_rgba(15,23,42,0.18)] hover:bg-black/90 focus-visible:bg-black/90 hover:text-white focus-visible:text-white [&_svg]:text-white hover:[&_svg]:text-white sm:w-[400px] sm:text-lg sm:hover:w-[480px] h-14 px-10 sm:h-16 sm:px-14 transition-[width] duration-200 ease-out dark:bg-white dark:text-black dark:shadow-[0_0_32px_rgba(255,255,255,0.22)] dark:hover:bg-white dark:focus-visible:bg-white dark:hover:text-black dark:focus-visible:text-black dark:[&_svg]:text-black dark:hover:[&_svg]:text-black"
                        onClick={() => setShowChoices(true)}
                      >
                        Clique para escolher qual fluxo seguir!
                          <ArrowRight className="ml-2 size-4 -translate-y-0.5 opacity-80 text-white dark:text-black" />
                        </Button>
                        <div className="h-px w-full bg-slate-200 dark:bg-white/10" />
                      </div>
                    )}
                  </div>
                )}
                {showChoices && (
                  <div className="space-y-4 animate-in fade-in duration-500 mt-14">
                    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 mx-auto w-full max-w-6xl justify-items-center">
                      <Card className="w-full sm:max-w-[660px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-zinc-800 dark:from-[#1b1b1f] dark:via-[#131318] dark:to-[#0d0d12] dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                        <CardContent className="space-y-4 px-5 py-6 sm:px-8 sm:py-8">
                          <p className="text-base font-medium sm:text-lg">
                            Quero assistir o vídeo criado por especialistas da Vertical Partners.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full h-14 sm:h-16 text-base sm:text-lg border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100 px-6 sm:px-8 dark:border-white/40 dark:text-white dark:hover:bg-white/10"
                            onClick={() => setStep(3)}
                          >
                            Assistir vídeo
                          </Button>
                        </CardContent>
                      </Card>
                      <Card className="w-full sm:max-w-[660px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-zinc-800 dark:from-[#1b1b1f] dark:via-[#131318] dark:to-[#0d0d12] dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                        <CardContent className="space-y-4 px-5 py-6 sm:px-8 sm:py-8">
                          <p className="text-base font-medium sm:text-lg">
                            Quero ir direto para o WhatsApp e conhecer mais sobre a Vertical Partners.
                          </p>
                          <Button
                            asChild
                            className="w-full h-14 sm:h-16 text-base sm:text-lg bg-black text-white hover:bg-black/90 px-6 sm:px-8 dark:bg-white dark:text-black dark:hover:bg-white/90"
                          >
                            <a
                              href={whatsappLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Agendar Auditoria
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-normal leading-tight text-balance sm:text-5xl lg:text-5xl">
                Assista a este vídeo abaixo de no máximo 3 minutos e entenda como vamos reduzir em até
                80% seu custo operacional e aumentar em até 3X seu faturamento líquido nos próximos 90 dias
              </h1>
            </div>
            <Card className="border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-black dark:text-white">
              <CardContent className="space-y-4 text-slate-700 dark:text-white/85">
                <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100/80 px-4 py-16 text-center text-sm uppercase tracking-[0.2em] text-slate-500 sm:py-20 dark:border-white/15 dark:bg-black/40 dark:text-white/60">
                  Espaço para o vídeo
                </div>
                <div className="flex justify-center">
                  <ShinyButton
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Clique e experimente o nosso potencial
                  </ShinyButton>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
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
