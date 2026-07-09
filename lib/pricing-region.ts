export type PricingRegion = "pl" | "eu" | "us";

const EUROPEAN_COUNTRY_CODES = new Set([
  "AD", "AL", "AM", "AT", "AZ", "BA", "BE", "BG", "BY", "CH", "CY", "CZ",
  "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE",
  "IS", "IT", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL",
  "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SK", "SM", "TR", "UA",
  "VA",
]);

export function getPricingRegion(
  countryCode: string | null,
  acceptLanguage: string,
): PricingRegion {
  const country = countryCode?.toUpperCase();

  if (country === "PL") {
    return "pl";
  }

  if (country && EUROPEAN_COUNTRY_CODES.has(country)) {
    return "eu";
  }

  if (!country && acceptLanguage.toLowerCase().startsWith("pl")) {
    return "pl";
  }

  return "us";
}
