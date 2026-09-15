import { createClient } from "@/lib/supabase/server";
import { SourcingRequest } from "@/lib/types";
import RequestCard from "./RequestCard";
import SignOutButton from "./SignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient();

  const { data: requests, error } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen pb-16">
      <header className="border-b border-line px-5 py-5 flex items-center justify-between">
        <div>
          <p className="font-display text-xl font-bold">FindSupply</p>
          <p className="text-xs text-ink/60">Espace administrateur</p>
        </div>
        <SignOutButton />
      </header>

      <div className="px-5 pt-5">
        {error && (
          <p className="text-sm text-stamp">
            Erreur de chargement des demandes : {error.message}
          </p>
        )}

        {requests && requests.length === 0 && (
          <p className="text-sm text-ink/60 mt-10 text-center">
            Aucune demande pour le moment.
          </p>
        )}

        <div className="space-y-3">
          {(requests as SourcingRequest[] | null)?.map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </div>
      </div>
    </main>
  );
}
