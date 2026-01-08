import { NextResponse } from "next/server";

import { appointmentStore } from "@/lib/appointments";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ appointments: [] });
  }

  const appointments = appointmentStore.getAppointmentsForDate(date);
  return NextResponse.json({ appointments });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    customerName?: string;
    email?: string;
    phone?: string;
    serviceId?: string;
    barberId?: string;
    date?: string;
    time?: string;
    notes?: string;
  };

  if (!payload.customerName || !payload.phone || !payload.serviceId) {
    return NextResponse.json(
      { error: "Preencha nome, telefone e serviço." },
      { status: 400 }
    );
  }

  if (!payload.barberId || !payload.date || !payload.time) {
    return NextResponse.json(
      { error: "Selecione barbeiro, data e horário." },
      { status: 400 }
    );
  }

  try {
    const appointment = appointmentStore.createAppointment({
      customerName: payload.customerName,
      email: payload.email?.trim() || undefined,
      phone: payload.phone,
      serviceId: payload.serviceId,
      barberId: payload.barberId,
      date: payload.date,
      time: payload.time,
      notes: payload.notes?.trim() || undefined,
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao criar agendamento.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
