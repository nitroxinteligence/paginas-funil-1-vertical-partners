import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.35),_transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.06),transparent_35%,rgba(15,23,42,0.08))] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent_35%,rgba(255,255,255,0.05))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.5em] text-slate-400 dark:text-white/50">
          Erro 404
        </span>
        <div className="mt-6 text-7xl font-semibold leading-none text-transparent bg-gradient-to-r from-sky-300 via-sky-500 to-blue-600 bg-clip-text sm:text-8xl">
          404
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-white/70">
          A rota que você tentou acessar não existe ou foi movida. Volte para a
          captura principal.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <Link href="/capt-vp">Ir para capt-vp</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/10"
          >
            <Link href="/captvp">Ir para captvp</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
