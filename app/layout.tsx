import "./css/style.css";
import { headers } from "next/headers";
import { I18nProvider } from "@/lib/i18n-context";
import { getMessages, type Locale } from "@/lib/i18n";
import type { Viewport } from "next";

async function getLocale(): Promise<Locale> {
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language")?.toLowerCase() ?? "";
  return acceptLanguage.startsWith("pl") ? "pl" : "en";
}

export async function generateMetadata() {
  const locale = await getLocale();
  const messages = getMessages(locale);

  return {
    title: messages.seo.title,
    description: messages.seo.description,
    icons: {
      icon: [{ url: "/favicon.ico?v=2", type: "image/x-icon", sizes: "16x16 32x32 48x48" }],
      shortcut: "/favicon.ico?v=2",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="relative overflow-x-clip bg-[#F4F7F5] font-inter tracking-tight text-[#002838] antialiased selection:bg-[#B9DDD5] selection:text-[#002838]">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-30 bg-[#F4F7F5]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 opacity-[0.14] [background-image:radial-gradient(circle_at_1px_1px,rgba(39,77,83,0.18)_1px,transparent_0)] [background-size:32px_32px] sm:fixed"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8rem] top-28 -z-20 h-72 w-72 rounded-full bg-[#B9DDD5]/45 blur-3xl sm:fixed motion-safe:sm:animate-float"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8rem] top-[30rem] -z-20 h-80 w-80 rounded-full bg-[#78C2B7]/15 blur-3xl sm:fixed motion-safe:sm:animate-float"
        />
        <I18nProvider locale={locale}>
          <div className="flex min-h-screen flex-col overflow-x-clip">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
