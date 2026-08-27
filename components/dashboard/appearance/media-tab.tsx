"use client";

import { useState, useRef } from "react";

interface MediaTabProps {
  initialAvatar?: string | null;
  initialBackground?: string | null;
  initialCursor?: string | null;
}

function UploadBox({
  label,
  current,
  type,
  onUpload,
  aspect = "aspect-square",
}: {
  label: string;
  current: string | null;
  type: string;
  onUpload: (url: string) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(current);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onUpload(data.url);
      }
    } catch {
      // silent
    }
    setUploading(false);
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-white/70">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`group relative flex w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/10 bg-white/5 transition hover:border-emerald-400/40 hover:bg-white/[0.07] ${aspect}`}
      >
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/30">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <span className="text-xs">
              {uploading ? "Uploading..." : "Click to upload"}
            </span>
          </div>
        )}

        {preview && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
            <span className="text-xs font-medium text-white">Change</span>
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

export default function MediaTab({
  initialAvatar,
  initialBackground,
  initialCursor,
}: MediaTabProps) {
  const [avatar, setAvatar] = useState(initialAvatar ?? "");
  const [background, setBackground] = useState(initialBackground ?? "");
  const [cursor, setCursor] = useState(initialCursor ?? "");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatarUrl: avatar, backgroundUrl: background, cursorUrl: cursor }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <UploadBox
        label="Avatar"
        current={avatar || null}
        type="avatar"
        onUpload={setAvatar}
        aspect="aspect-square"
      />

      <UploadBox
        label="Background"
        current={background || null}
        type="background"
        onUpload={setBackground}
        aspect="aspect-video"
      />

      <UploadBox
        label="Custom Cursor"
        current={cursor || null}
        type="cursor"
        onUpload={setCursor}
        aspect="aspect-square"
      />

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
