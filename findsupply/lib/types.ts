export type RequestStatus =
  | "a_traiter"
  | "recherche_en_cours"
  | "trouve"
  | "commande"
  | "livre";

export const STATUS_LABELS: Record<RequestStatus, string> = {
  a_traiter: "À traiter",
  recherche_en_cours: "Recherche en cours",
  trouve: "Trouvé",
  commande: "Commandé",
  livre: "Livré",
};

export const STATUS_ORDER: RequestStatus[] = [
  "a_traiter",
  "recherche_en_cours",
  "trouve",
  "commande",
  "livre",
];

export type Currency = "EUR" | "FCFA";

export const CURRENCY_LABELS: Record<Currency, string> = {
  EUR: "€ Euro",
  FCFA: "FCFA",
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  FCFA: "FCFA",
};

export function formatBudget(
  amount: number | null,
  currency: Currency | null
): string | null {
  if (amount === null || amount === undefined) return null;
  const formattedAmount = new Intl.NumberFormat("fr-FR").format(amount);
  const cur = currency ?? "FCFA";
  return cur === "EUR"
    ? `${formattedAmount} €`
    : `${formattedAmount} FCFA`;
}

export interface SourcingRequest {
  id: string;
  created_at: string;
  item_description: string;
  quantity: number;
  size_color_model: string | null;
  budget_amount: number | null;
  budget_currency: Currency | null;
  photo_url: string;
  client_name: string;
  client_contact: string;
  status: RequestStatus;
  admin_note: string | null;
}
