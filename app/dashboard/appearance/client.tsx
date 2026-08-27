"use client";

import { useState } from "react";
import MediaTab from "@/components/dashboard/appearance/media-tab";
import LinksTab from "@/components/dashboard/appearance/links-tab";
import LayoutTab from "@/components/dashboard/appearance/layout-tab";

const tabs = [
  { id: "media", label: "Media", icon: "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" },
  { id: "links", label: "Links", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
  { id: "layout", label: "Layout", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
];

interface Profile {
  layout: string;
  avatarUrl: string | null;
  backgroundUrl: string | null;
  cursorUrl: string | null;
  blur: number;
  overlayEnabled: number;
  overlayText: string;
}

export default function AppearanceClient({
  profile,
  socialLinks,
}: {
  profile: Profile | null;
  socialLinks: { platform: string; url: string; order: number }[];
}) {
  const [active, setActive] = useState("media");

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Appearance</h1>
      <p className="mt-1 text-sm text-white/50">
        Customize how your profile looks.
      </p>

      <div className="mt-8 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              active === t.id
                ? "bg-emerald-400/15 text-emerald-400 ring-1 ring-emerald-400/30"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
            </svg>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
        {active === "media" && (
          <MediaTab
            initialAvatar={profile?.avatarUrl}
            initialBackground={profile?.backgroundUrl}
            initialCursor={profile?.cursorUrl}
          />
        )}
        {active === "links" && <LinksTab initialLinks={socialLinks} />}
        {active === "layout" && (
          <LayoutTab
            initialLayout={profile?.layout ?? "centered"}
            initialBlur={profile?.blur ?? 0}
            initialOverlayEnabled={!!profile?.overlayEnabled}
            initialOverlayText={profile?.overlayText ?? "Click to show"}
          />
        )}
      </div>
    </div>
  );
}
