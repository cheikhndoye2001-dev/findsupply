export const metadata = {
  title: "Conditions générales d'utilisation — FindSupply",
};

export default function CGUPage() {
  return (
    <main className="min-h-screen px-5 py-10 max-w-2xl mx-auto">
      <a href="/" className="text-sm text-teal underline underline-offset-2">
        ← Retour à l&rsquo;accueil
      </a>
      <h1 className="font-display text-2xl font-bold mt-4">
        Conditions générales d&rsquo;utilisation
      </h1>
      <p className="text-sm text-ink/50 mt-1">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="font-semibold text-ink mb-2">1. Objet</h2>
          <p>
            FindSupply permet à toute personne de soumettre une demande de
            recherche d&rsquo;article (via une photo et une description) afin
            que notre équipe tente de trouver un produit équivalent auprès de
            ses fournisseurs.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">
            2. Fonctionnement du service
          </h2>
          <p>
            L&rsquo;envoi d&rsquo;une demande via le formulaire ne constitue
            pas un engagement d&rsquo;achat ni une garantie de résultat.
            FindSupply s&rsquo;engage à faire de son mieux pour retrouver
            l&rsquo;article recherché, mais ne peut garantir sa
            disponibilité, son prix final, ni son délai de livraison avant
            confirmation directe avec vous.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">
            3. Exactitude des informations
          </h2>
          <p>
            Vous vous engagez à fournir des informations exactes (photo,
            description, coordonnées) afin de permettre un traitement
            correct de votre demande.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">
            4. Propriété du contenu envoyé
          </h2>
          <p>
            Les photos que vous envoyez restent votre propriété. Elles sont
            utilisées uniquement dans le cadre du traitement de votre
            demande auprès de nos fournisseurs.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">
            5. Données personnelles
          </h2>
          <p>
            Le traitement de vos données personnelles est détaillé dans
            notre{" "}
            <a
              href="/confidentialite"
              className="text-teal underline underline-offset-2"
            >
              politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">6. Contact</h2>
          <p>
            Pour toute question concernant ces conditions, contactez-nous via
            le numéro que vous utilisez pour vos échanges avec FindSupply.
          </p>
        </section>
      </div>
    </main>
  );
}
