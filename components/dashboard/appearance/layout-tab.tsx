"use client";

import { useState } from "react";

const layouts = [
  {
    id: "centered",
    label: "Centered",
    preview: (
      <div className="flex h-full items-center justify-center">
        <div className="w-2/3 space-y-2">
          <div className="mx-auto h-6 w-6 rounded-full bg-emerald-400/40" />
          <div className="mx-auto h-2.5 w-16 rounded-full bg-white/20" />
          <div className="mx-auto mt-3 h-2 w-24 rounded-full bg-white/10" />
          <div className="mt-4 space-y-1.5">
            <div className="h-5 rounded-md bg-white/10" />
            <div className="h-5 rounded-md bg-white/10" />
            <div className="h-5 rounded-md bg-white/10" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "left",
    label: "Left aligned",
    preview: (
      <div className="flex h-full items-center justify-center">
        <div className="w-2/3 space-y-2 pl-2">
          <div className="h-6 w-6 rounded-full bg-emerald-400/40" />
          <div className="h-2.5 w-16 rounded-full bg-white/20" />
          <div className="mt-3 h-2 w-24 rounded-full bg-white/10" />
          <div className="mt-4 space-y-1.5">
            <div className="h-5 rounded-md bg-white/10" />
            <div className="h-5 rounded-md bg-white/10" />
            <div className="h-5 rounded-md bg-white/10" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function LayoutTab({
  initialLayout,
}: {
  initialLayout: string;
}) {
  const [selected, setSelected] = useState(initialLayout);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layout: selected }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {layouts.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelected(l.id)}
            className={`rounded-xl border-2 p-1 transition ${
              selected === l.id
                ? "border-emerald-400 bg-emerald-400/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="aspect-[4/3] rounded-lg bg-black/40">
              {l.preview}
            </div>
            <p className="mt-2 pb-1 text-center text-xs font-medium text-white/70">
              {l.label}
            </p>
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:opacity-50"
      >
        {saved ? "Saved!" : saving ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
