import { NextResponse } from "next/server";

import { appointmentStore } from "@/lib/appointments";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const serviceId = url.searchParams.get("serviceId") ?? undefined;
  const barberId = url.searchParams.get("barberId") ?? undefined;

  if (!date) {
    return NextResponse.json(
      { error: "Informe a data no formato YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const availability = appointmentStore.getAvailability(date, serviceId, barberId);
  return NextResponse.json(availability);
}
