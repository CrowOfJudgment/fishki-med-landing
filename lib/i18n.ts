import en from "@/messages/en.json";
import pl from "@/messages/pl.json";
import enLegal from "@/messages/legal-en.json";
import plLegal from "@/messages/legal-pl.json";

export const locales = ["en", "pl"] as const;

export type Locale = (typeof locales)[number];
const enMessages = { ...en, ...enLegal };
const plMessages = { ...pl, ...plLegal };

export type Messages = typeof enMessages;

export const messages = {
  en: enMessages,
  pl: plMessages,
} satisfies Record<Locale, Messages>;

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.en;
}
