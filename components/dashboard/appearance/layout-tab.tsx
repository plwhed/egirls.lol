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
          <div className="mt-4 space-y-1.5">
            <div className="h-4 rounded bg-white/10" />
            <div className="h-4 rounded bg-white/10" />
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
          <div className="mt-4 space-y-1.5">
            <div className="h-4 rounded bg-white/10" />
            <div className="h-4 rounded bg-white/10" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function LayoutTab({
  initialLayout,
  initialBlur,
  initialOverlayEnabled,
  initialOverlayText,
}: {
  initialLayout: string;
  initialBlur: number;
  initialOverlayEnabled: boolean;
  initialOverlayText: string;
}) {
  const [selected, setSelected] = useState(initialLayout);
  const [blur, setBlur] = useState(initialBlur);
  const [overlayEnabled, setOverlayEnabled] = useState(initialOverlayEnabled);
  const [overlayText, setOverlayText] = useState(initialOverlayText);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        layout: selected,
        blur,
        overlayEnabled,
        overlayText,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Layout picker */}
      <div>
        <p className="mb-3 text-sm font-medium text-white/70">Profile layout</p>
        <div className="grid grid-cols-2 gap-3">
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
      </div>

      {/* Background blur */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-white/70">Background blur</p>
          <span className="text-xs text-white/40">{blur}px</span>
        </div>
        <input
          type="range"
          min={0}
          max={20}
          value={blur}
          onChange={(e) => setBlur(Number(e.target.value))}
          className="w-full accent-emerald-400"
        />
        <div className="flex justify-between text-[10px] text-white/30 mt-1">
          <span>None</span>
          <span>Heavy</span>
        </div>
      </div>

      {/* Click-to-show overlay */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-white/70">Click-to-show overlay</p>
          <button
            onClick={() => setOverlayEnabled(!overlayEnabled)}
            className={`relative h-6 w-11 rounded-full transition ${
              overlayEnabled ? "bg-emerald-400" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                overlayEnabled ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
        {overlayEnabled && (
          <input
            type="text"
            value={overlayText}
            onChange={(e) => setOverlayText(e.target.value)}
            placeholder="Click to show"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:opacity-50"
      >
        {saved ? "Saved!" : saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
