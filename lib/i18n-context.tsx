"use client";

import { createContext, useContext } from "react";
import { getMessages, Locale } from "./i18n";

const I18nContext = createContext<{
  locale: Locale;
  messages: any;
} | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getMessages(locale);

  return (
    <I18nContext.Provider value={{ locale, messages: t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  return useContext(I18nContext)?.messages;
}

export function useLocale() {
  return useContext(I18nContext)?.locale ?? "en";
}
