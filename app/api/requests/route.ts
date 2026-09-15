import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    item_description,
    quantity,
    size_color_model,
    budget_amount,
    budget_currency,
    photo_url,
    client_name,
    client_contact,
  } = body;

  if (!item_description || !photo_url || !client_name || !client_contact) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants." },
      { status: 400 }
    );
  }

  if (budget_currency && !["EUR", "FCFA"].includes(budget_currency)) {
    return NextResponse.json(
      { error: "Monnaie invalide." },
      { status: 400 }
    );
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("requests")
    .insert({
      item_description,
      quantity: quantity ?? 1,
      size_color_model,
      budget_amount: budget_amount || null,
      budget_currency: budget_amount ? budget_currency ?? "FCFA" : null,
      photo_url,
      client_name,
      client_contact,
      status: "a_traiter",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ request: data }, { status: 201 });
}

export async function GET() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ requests: data });
}
