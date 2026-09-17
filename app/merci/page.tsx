import Link from "next/link";
import LegalFooter from "../LegalFooter";

export default function MerciPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
      <span className="text-4xl">✅</span>
      <h1 className="mt-4 font-display text-2xl font-bold">
        Demande envoyée
      </h1>
      <p className="mt-3 text-ink/70 max-w-[32ch]">
        On l&rsquo;examine et on revient vers vous dès qu&rsquo;on a trouvé
        l&rsquo;article, avec le prix.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-card border border-line bg-cardbg px-6 py-3 font-semibold"
      >
        Envoyer une autre demande
      </Link>
      <div className="absolute bottom-0 inset-x-0">
        <LegalFooter />
      </div>
    </main>
  );
}
