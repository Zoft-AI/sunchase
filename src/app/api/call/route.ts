import { NextResponse } from "next/server";
import { requestSunchaseCall } from "@/lib/zoft-server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    phone?: string;
    countryCode?: string;
    notes?: string;
  } | null;
  const name = body?.name?.trim() ?? "";
  const phone = body?.phone?.trim() ?? "";
  const countryCode = body?.countryCode?.trim() || "+1";
  const notes = body?.notes?.trim() ?? "";
  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }

  try {
    const result = await requestSunchaseCall({
      name,
      phone,
      countryCode,
      ...(notes ? { notes } : {}),
    });
    return NextResponse.json(result);
  } catch (error) {
    const text =
      error instanceof Error ? error.message : "We could not start the call.";
    return NextResponse.json({ error: text }, { status: 502 });
  }
}
