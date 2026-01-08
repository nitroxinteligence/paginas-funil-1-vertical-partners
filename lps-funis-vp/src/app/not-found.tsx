import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <div className="mt-6 text-7xl font-semibold leading-none text-transparent bg-gradient-to-r from-sky-300 via-sky-500 to-blue-600 bg-clip-text sm:text-8xl">
          404
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-white/70">
          Essa página não existe.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <Link href="/capt-vp">Ir para página principal</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
