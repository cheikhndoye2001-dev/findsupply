"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem("findsupply_cookie_notice");
      if (!seen) setVisible(true);
    } catch {
      // localStorage indisponible (mode privé strict) : on n'affiche rien
    }
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem("findsupply_cookie_notice", "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-line bg-cardbg/95 backdrop-blur px-5 py-4">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-xs text-ink/70 flex-1">
          Ce site utilise uniquement des cookies strictement nécessaires à
          son fonctionnement (connexion admin) et, si activé, une mesure
          d&rsquo;audience anonyme sans suivi individuel. En savoir plus dans
          notre{" "}
          <a
            href="/confidentialite"
            className="text-teal underline underline-offset-2"
          >
            politique de confidentialité
          </a>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="flex-shrink-0 rounded-card bg-stamp text-white text-sm font-semibold px-4 py-2"
        >
          J&rsquo;ai compris
        </button>
      </div>
    </div>
  );
}
