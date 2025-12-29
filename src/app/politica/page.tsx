import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Política de Privacidade | Vertical Partners",
  description:
    "Entenda como a Vertical Partners coleta, usa e protege dados pessoais.",
};

const updatedAt = "08 de março de 2025";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors dark:bg-black dark:text-white">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-3 py-1 text-[0.65rem] font-semibold transition-colors hover:text-slate-900 dark:border-white/10 dark:hover:text-white"
          >
            Voltar
          </Link>
          <span>Atualizado em {updatedAt}</span>
        </div>

        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">
            Privacidade
          </p>
          <h1 className="text-3xl font-normal leading-tight text-balance sm:text-5xl">
            Política de Privacidade da Vertical Partners
          </h1>
          <p className="text-base font-medium leading-relaxed text-slate-700 dark:text-white/85 sm:text-lg">
            Esta política explica como coletamos, usamos e protegemos seus dados
            pessoais quando você navega, preenche formulários ou interage com a
            Vertical Partners.
          </p>
        </header>

        <Card className="border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-black dark:text-white">
          <CardContent className="space-y-8 py-6 text-sm leading-relaxed text-slate-700 dark:text-white/85 sm:py-8 sm:text-base">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                1. Quem somos
              </h2>
              <p>
                A Vertical Partners é uma empresa focada em soluções de
                inteligência artificial aplicadas a vendas, atendimento e
                eficiência operacional. Esta política se aplica ao site e às
                interações digitais relacionadas às nossas ofertas.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                2. Dados que coletamos
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Dados fornecidos por você:</strong> nome, WhatsApp,
                  Instagram e demais informações que você insere nos formulários.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> endereço IP, tipo de
                  dispositivo, navegador, páginas acessadas e tempo de visita.
                </li>
                <li>
                  <strong>Cookies e tecnologias similares:</strong> usados para
                  melhorar a experiência, medir desempenho e personalizar
                  comunicações.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                3. Como usamos seus dados
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Entrar em contato e responder solicitações.</li>
                <li>Qualificar e atender leads interessados nas soluções.</li>
                <li>Personalizar jornadas, conteúdos e comunicações.</li>
                <li>Melhorar nossos serviços, campanhas e experiência no site.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                4. Compartilhamento de dados
              </h2>
              <p>
                Podemos compartilhar dados com fornecedores que nos ajudam a
                operar o site e prestar serviços (ex.: hospedagem, ferramentas
                de atendimento e automação). Sempre exigimos padrões adequados
                de segurança e privacidade. Também podemos compartilhar dados
                quando exigido por lei ou autoridade competente.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                5. Armazenamento e segurança
              </h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger os
                dados pessoais contra acessos não autorizados, perda ou uso
                indevido. Ainda assim, nenhum sistema é totalmente imune a
                riscos, e recomendamos que você também proteja seus dados.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                6. Seus direitos
              </h2>
              <p>
                Você pode solicitar acesso, correção, atualização ou exclusão
                de dados pessoais, além de revogar consentimentos. Para isso,
                entre em contato pelos canais indicados abaixo.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                7. Retenção de dados
              </h2>
              <p>
                Guardamos os dados apenas pelo tempo necessário para cumprir as
                finalidades descritas nesta política, respeitando obrigações
                legais e regulatórias.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                8. Links externos
              </h2>
              <p>
                Nosso site pode conter links para páginas de terceiros. Não nos
                responsabilizamos pelas políticas de privacidade desses sites.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                9. Alterações nesta política
              </h2>
              <p>
                Podemos atualizar esta política periodicamente. Mudanças
                relevantes serão comunicadas nesta página com a data de
                atualização revisada.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                10. Contato
              </h2>
              <p>
                Para dúvidas sobre privacidade ou solicitações relacionadas aos
                seus dados, fale conosco pelo WhatsApp{" "}
                <a
                  href="https://wa.me/5548996940931"
                  className="font-semibold text-slate-900 underline-offset-4 hover:underline dark:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  +55 (48) 99694-0931
                </a>
                .
              </p>
            </section>
          </CardContent>
        </Card>

        <footer className="mt-6 border-t border-slate-200 pt-8 text-sm text-slate-600 dark:border-white/10 dark:text-white/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                Vertical Partners
              </p>
              <p className="text-xs text-slate-500 dark:text-white/60">
                IA aplicada para acelerar crescimento e eficiência.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-white/60">
              <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-white/10">
                Termos
              </span>
              <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-white/10">
                Privacidade
              </span>
              <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-white/10">
                Contato
              </span>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 dark:text-white/50">
            © {new Date().getFullYear()} Vertical Partners. Todos os direitos
            reservados.
          </div>
        </footer>
      </div>
    </main>
  );
}
