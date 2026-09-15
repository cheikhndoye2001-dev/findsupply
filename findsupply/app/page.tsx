"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function HomePage() {
  const router = useRouter();
  const supabase = createClient();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [sizeColorModel, setSizeColorModel] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState<"EUR" | "FCFA">(
    "FCFA"
  );
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!photoFile) {
      setError("Ajoutez une photo de l'article recherché.");
      return;
    }
    if (!itemDescription.trim() || !clientName.trim() || !clientContact.trim()) {
      setError("Merci de remplir la description, votre nom et un contact.");
      return;
    }

    setSubmitting(true);
    try {
      const ext = photoFile.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(path, photoFile, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("photos").getPublicUrl(path);

      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_description: itemDescription,
          quantity: Number(quantity) || 1,
          size_color_model: sizeColorModel || null,
          budget_amount: budgetAmount ? Number(budgetAmount) : null,
          budget_currency: budgetAmount ? budgetCurrency : null,
          photo_url: publicUrl,
          client_name: clientName,
          client_contact: clientContact,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Échec de l'envoi de la demande.");
      }

      router.push("/merci");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-line px-5 py-6">
        <p className="font-display text-2xl font-bold tracking-tight">
          FindSupply
        </p>
        <p className="mt-1 text-sm text-ink/70">
          You Find It. We Supply It.
        </p>
      </header>

      <section className="px-5 pt-8 pb-4">
        <h1 className="font-display text-[1.75rem] leading-tight font-bold max-w-[22ch]">
          Montrez-nous l&rsquo;article. On vous trouve la source.
        </h1>
        <p className="mt-3 text-ink/70 max-w-[38ch]">
          Une photo, quelques précisions, et on part à sa recherche auprès de
          nos fournisseurs.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="px-5 pb-16">
        <div className="mt-2">
          <label className="block text-sm font-semibold mb-2">
            Photo de l&rsquo;article
          </label>
          <div className="w-full aspect-[4/3] rounded-card border-2 border-dashed border-line bg-cardbg flex flex-col items-center justify-center gap-2 overflow-hidden">
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoPreview}
                alt="Aperçu de l'article"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <span className="text-3xl">📷</span>
                <span className="text-sm text-ink/60">
                  Aucune photo sélectionnée
                </span>
              </>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="rounded-card border border-line bg-cardbg py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              📷 Prendre une photo
            </button>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="rounded-card border border-line bg-cardbg py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              🖼️ Choisir dans la galerie
            </button>
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-2" htmlFor="item_description">
            Que recherchez-vous ?
          </label>
          <textarea
            id="item_description"
            required
            rows={3}
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Ex : Basket Nike Air Max blanche, taille 42"
            className="w-full rounded-card border border-line bg-cardbg px-4 py-3 text-ink placeholder:text-ink/40"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="quantity">
            Quantité
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-card border border-line bg-cardbg px-4 py-3"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="budget_amount">
            Budget (optionnel)
          </label>
          <div className="flex gap-2">
            <input
              id="budget_amount"
              type="number"
              min={0}
              inputMode="decimal"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              placeholder="Ex : 15000"
              className="flex-1 min-w-0 rounded-card border border-line bg-cardbg px-4 py-3"
            />
            <div className="flex rounded-card border border-line bg-cardbg overflow-hidden flex-shrink-0">
              <button
                type="button"
                onClick={() => setBudgetCurrency("FCFA")}
                className={`px-3 py-3 text-sm font-semibold ${
                  budgetCurrency === "FCFA"
                    ? "bg-stamp text-white"
                    : "text-ink/60"
                }`}
              >
                FCFA
              </button>
              <button
                type="button"
                onClick={() => setBudgetCurrency("EUR")}
                className={`px-3 py-3 text-sm font-semibold ${
                  budgetCurrency === "EUR"
                    ? "bg-stamp text-white"
                    : "text-ink/60"
                }`}
              >
                €
              </button>
            </div>
          </div>
          <p className="mt-1.5 text-xs text-ink/50">
            Choisissez la monnaie qui vous convient pour le paiement.
          </p>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="size_color_model">
            Taille / couleur / modèle (optionnel)
          </label>
          <input
            id="size_color_model"
            type="text"
            value={sizeColorModel}
            onChange={(e) => setSizeColorModel(e.target.value)}
            placeholder="Ex : Taille 42, coloris noir"
            className="w-full rounded-card border border-line bg-cardbg px-4 py-3"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-line">
          <p className="text-sm font-semibold text-ink/70 mb-3">
            Pour vous recontacter
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="client_name">
                Votre nom
              </label>
              <input
                id="client_name"
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-card border border-line bg-cardbg px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="client_contact">
                Téléphone / WhatsApp
              </label>
              <input
                id="client_contact"
                type="tel"
                required
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                placeholder="+221 77 000 00 00"
                className="w-full rounded-card border border-line bg-cardbg px-4 py-3"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-alert font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 w-full rounded-card bg-stamp text-white font-semibold py-4 disabled:opacity-60"
        >
          {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
        </button>
      </form>
    </main>
  );
}
