"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RequestStatus,
  STATUS_LABELS,
  STATUS_ORDER,
  SourcingRequest,
  formatBudget,
} from "@/lib/types";

export default function RequestCard({ request }: { request: SourcingRequest }) {
  const router = useRouter();
  const [status, setStatus] = useState<RequestStatus>(request.status);
  const [note, setNote] = useState(request.admin_note ?? "");
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function updateRequest(next: {
    status?: RequestStatus;
    admin_note?: string;
  }) {
    setSaving(true);
    await fetch(`/api/requests/${request.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaving(false);
    router.refresh();
  }

  const formattedDate = new Date(request.created_at).toLocaleDateString(
    "fr-FR",
    { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }
  );

  return (
    <div className="rounded-card border border-line bg-cardbg overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex gap-3 p-3 text-left"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={request.photo_url}
          alt={request.item_description}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold truncate">{request.item_description}</p>
          <p className="text-xs text-ink/60 mt-0.5">
            {request.client_name} · {formattedDate}
          </p>
          <span className={`status-pill status-${status} mt-2`}>
            {STATUS_LABELS[status]}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-4 pt-1 border-t border-line space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={request.photo_url}
            alt={request.item_description}
            className="w-full max-h-72 rounded-lg object-cover"
          />

          <dl className="text-sm space-y-1">
            <div className="flex gap-2">
              <dt className="text-ink/50 w-24 flex-shrink-0">Quantité</dt>
              <dd>{request.quantity}</dd>
            </div>
            {request.size_color_model && (
              <div className="flex gap-2">
                <dt className="text-ink/50 w-24 flex-shrink-0">
                  Taille/coloris
                </dt>
                <dd>{request.size_color_model}</dd>
              </div>
            )}
            {request.budget_amount && (
              <div className="flex gap-2">
                <dt className="text-ink/50 w-24 flex-shrink-0">Budget</dt>
                <dd>
                  {formatBudget(request.budget_amount, request.budget_currency)}
                </dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="text-ink/50 w-24 flex-shrink-0">Contact</dt>
              <dd>{request.client_contact}</dd>
            </div>
          </dl>

          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1">
              Statut
            </label>
            <select
              value={status}
              disabled={saving}
              onChange={(e) => {
                const next = e.target.value as RequestStatus;
                setStatus(next);
                updateRequest({ status: next });
              }}
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
            >
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1">
              Note interne
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => updateRequest({ admin_note: note })}
              placeholder="Ex : contact fournisseur trouvé, prix 8$..."
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
            />
          </div>

          <a
            href={`https://wa.me/${request.client_contact.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm font-semibold text-teal underline underline-offset-2"
          >
            Contacter sur WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
