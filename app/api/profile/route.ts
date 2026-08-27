import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { profiles, socialLinks } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, session.id));

  const links = await db
    .select()
    .from(socialLinks)
    .where(eq(socialLinks.userId, session.id));

  return NextResponse.json({ profile: profile ?? null, socialLinks: links });
}

async function upsertProfile(userId: string, data: Record<string, string | null>) {
  const [existing] = await db
    .select({ userId: profiles.userId })
    .from(profiles)
    .where(eq(profiles.userId, userId));

  if (existing) {
    await db.update(profiles).set(data).where(eq(profiles.userId, userId));
  } else {
    await db.insert(profiles).values({ userId, ...data });
  }
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const profileData: Record<string, string | null> = {};
  if (body.layout !== undefined) profileData.layout = body.layout;
  if (body.avatarUrl !== undefined) profileData.avatarUrl = body.avatarUrl || null;
  if (body.backgroundUrl !== undefined) profileData.backgroundUrl = body.backgroundUrl || null;
  if (body.cursorUrl !== undefined) profileData.cursorUrl = body.cursorUrl || null;

  if (Object.keys(profileData).length) {
    await upsertProfile(session.id, profileData);
  }

  if (body.socialLinks) {
    await db.delete(socialLinks).where(eq(socialLinks.userId, session.id));
    if (body.socialLinks.length) {
      await db.insert(socialLinks).values(
        body.socialLinks.map((l: { platform: string; url: string }) => ({
          userId: session.id,
          platform: l.platform,
          url: l.url,
        }))
      );
    }
  }

  return NextResponse.json({ ok: true });
}
