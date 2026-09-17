export const metadata = {
  title: "Politique de confidentialité — FindSupply",
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen px-5 py-10 max-w-2xl mx-auto">
      <a href="/" className="text-sm text-teal underline underline-offset-2">
        ← Retour à l&rsquo;accueil
      </a>
      <h1 className="font-display text-2xl font-bold mt-4">
        Politique de confidentialité
      </h1>
      <p className="text-sm text-ink/50 mt-1">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="font-semibold text-ink mb-2">1. Qui sommes-nous ?</h2>
          <p>
            FindSupply est un service qui vous aide à retrouver un produit
            que vous recherchez, en le mettant en relation avec des
            fournisseurs. Cette page explique quelles informations nous
            collectons via le formulaire de demande et comment elles sont
            utilisées.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">
            2. Quelles données collectons-nous ?
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>La photo de l&rsquo;article que vous recherchez</li>
            <li>La description, quantité, budget et préférences que vous indiquez</li>
            <li>Votre nom</li>
            <li>Votre numéro de téléphone / WhatsApp</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">
            3. Pourquoi collectons-nous ces données ?
          </h2>
          <p>
            Uniquement pour traiter votre demande : rechercher l&rsquo;article
            correspondant auprès de nos fournisseurs et vous recontacter à ce
            sujet. Nous ne vendons ni ne partageons vos données avec des
            tiers à des fins commerciales.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">
            4. Combien de temps conservons-nous vos données ?
          </h2>
          <p>
            Vos données sont conservées le temps nécessaire au traitement de
            votre demande, puis archivées pour le suivi de notre historique
            de service. Vous pouvez demander leur suppression à tout moment
            (voir contact ci-dessous).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">
            5. Où sont hébergées vos données ?
          </h2>
          <p>
            Vos données sont stockées de façon sécurisée chez notre
            prestataire d&rsquo;hébergement (Supabase), avec un accès protégé
            par mot de passe réservé aux personnes qui traitent les
            demandes.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">6. Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies strictement nécessaires
            au fonctionnement du service (par exemple pour garder une
            session de connexion active côté administration) et, si activé,
            un outil de mesure d&rsquo;audience respectueux de la vie privée
            qui ne dépose pas de cookie de suivi individuel.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">7. Vos droits</h2>
          <p>
            Conformément à la réglementation applicable sur la protection
            des données, vous disposez d&rsquo;un droit d&rsquo;accès, de
            rectification et de suppression de vos données. Pour exercer ce
            droit, contactez-nous via le numéro que vous avez utilisé pour
            faire votre demande, ou tout autre moyen de contact fourni par
            FindSupply.
          </p>
        </section>
      </div>
    </main>
  );
}
