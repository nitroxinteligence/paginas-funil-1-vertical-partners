import { Card, CardContent } from "@/components/ui/card";
import { termsHtml } from "@/lib/legalContent";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
        <Card className="border border-slate-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
          <CardContent className="p-8 sm:p-12">
            <div
              className="space-y-6 text-lg leading-relaxed sm:text-xl [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:leading-tight [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-8 [&_ol]:list-decimal [&_ol]:pl-8 [&_li]:mb-3 [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-4 [&_*]:!text-black"
              dangerouslySetInnerHTML={{ __html: termsHtml }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
