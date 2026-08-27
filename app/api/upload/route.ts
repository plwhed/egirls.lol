import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const type = formData.get("type") as string;

  if (!file || !["avatar", "background", "cursor"].includes(type)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "png";
  const filename = `${session.id}-${type}-${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filepath = path.join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { url } = await req.json();
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (url.startsWith("/uploads/")) {
    const filepath = path.join(process.cwd(), "public", url);
    try {
      await unlink(filepath);
    } catch {}
  }

  return NextResponse.json({ ok: true });
}
