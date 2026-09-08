import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiUrl = process.env.FISHKI_API_URL?.replace(/\/$/, "");
  if (!apiUrl) {
    return NextResponse.json(
      { detail: "Preorder registration is temporarily unavailable." },
      { status: 503 },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 16_384) {
    return NextResponse.json({ detail: "Request is too large." }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ detail: "Invalid request." }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/v1/preorders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { detail: "Preorder registration is temporarily unavailable." },
      { status: 502 },
    );
  }
}
