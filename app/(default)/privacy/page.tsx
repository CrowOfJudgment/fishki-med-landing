"use client";

import LegalDocument, { LegalDocumentCopy } from "@/components/legal-document";
import { useT } from "@/lib/i18n-context";

export default function PrivacyPage() {
  const t = useT();
  return <LegalDocument copy={t.privacy as LegalDocumentCopy} />;
}
