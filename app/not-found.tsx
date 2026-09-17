import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-6xl font-bold text-stamp">404</p>
      <h1 className="font-display text-xl font-bold mt-4">
        Cette page n&rsquo;existe pas
      </h1>
      <p className="mt-2 text-ink/70 max-w-[36ch]">
        Le lien que vous avez suivi est peut-être incorrect, ou la page a été
        déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-card bg-stamp text-white font-semibold px-6 py-3"
      >
        Retour à l&rsquo;accueil
      </Link>
    </main>
  );
}
