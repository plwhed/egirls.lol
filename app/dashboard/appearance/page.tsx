import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { profiles, socialLinks } from "@/lib/schema";
import { eq } from "drizzle-orm";
import LandingBackground from "@/components/landing-background";
import Sidebar from "@/components/dashboard/sidebar";
import AppearanceClient from "./client";

export const metadata = {
  title: "Appearance — egirls.lol",
};

export default async function AppearancePage() {
  const session = await getSession();
  if (!session) redirect("/register");

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, session.id));

  const links = await db
    .select()
    .from(socialLinks)
    .where(eq(socialLinks.userId, session.id))
    .orderBy(socialLinks.order);

  return (
    <LandingBackground>
      <div className="relative min-h-screen font-sans text-white">
        <Sidebar />
        <main className="ml-72 px-10 py-10">
          <AppearanceClient
            profile={profile ?? null}
            socialLinks={links.map((l) => ({
              platform: l.platform,
              url: l.url,
              order: l.order,
            }))}
          />
        </main>
      </div>
    </LandingBackground>
  );
}
