import "./css/style.css";
import { headers } from "next/headers";
import { I18nProvider } from "@/lib/i18n-context";

export const metadata = {
  title: "Fishki — fiszki dla studentów medycyny",
  description:
    "Inteligentne fiszki i powtórki dla studentów medycyny. Anatomia, farmakologia, przedmioty kliniczne i przygotowanie do egzaminów.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerStore = await headers();

  const acceptLanguage = headerStore.get("accept-language")?.toLowerCase() ?? "";
  const locale = acceptLanguage.startsWith("pl") ? "pl" : "en";

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="relative overflow-x-hidden bg-[#f5f3ea] font-inter tracking-tight text-slate-900 antialiased selection:bg-teal-500/20 selection:text-slate-900">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.13),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent_24%),linear-gradient(180deg,#faf9f3_0%,#f3f0e6_55%,#e9f3f0_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-20 opacity-[0.07] mix-blend-multiply [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.3)_1px,transparent_0)] [background-size:30px_30px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-8rem] top-28 -z-20 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl motion-safe:animate-float"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed right-[-8rem] top-[30rem] -z-20 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl motion-safe:animate-float"
        />
        <I18nProvider locale={locale}>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
