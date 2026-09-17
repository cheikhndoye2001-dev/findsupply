import Link from "next/link";

export default function LegalFooter() {
  return (
    <footer className="px-5 py-6 text-center text-xs text-ink/50">
      <Link href="/confidentialite" className="underline underline-offset-2">
        Confidentialité
      </Link>
      <span className="mx-2">·</span>
      <Link href="/cgu" className="underline underline-offset-2">
        CGU
      </Link>
    </footer>
  );
}
