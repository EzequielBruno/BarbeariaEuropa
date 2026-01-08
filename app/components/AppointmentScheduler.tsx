"use client";

import { useEffect, useMemo, useState } from "react";

import type { AvailabilityResult } from "@/lib/appointments";

const todayIso = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (value: string) => {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
};

const buildAvailabilityUrl = (
  date: string,
  serviceId?: string,
  barberId?: string
) => {
  const params = new URLSearchParams({ date });
  if (serviceId) {
    params.set("serviceId", serviceId);
  }
  if (barberId) {
    params.set("barberId", barberId);
  }
  return `/api/appointments/availability?${params.toString()}`;
};

export default function AppointmentScheduler() {
  const [availability, setAvailability] = useState<AvailabilityResult | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState(todayIso());
  const [serviceId, setServiceId] = useState<string>("");
  const [barberId, setBarberId] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      const response = await fetch(
        buildAvailabilityUrl(selectedDate, serviceId, barberId)
      );
      if (!response.ok) {
        setAvailability(null);
        return;
      }
      const data = (await response.json()) as AvailabilityResult;
      setAvailability(data);
      if (data.services.length && !serviceId) {
        setServiceId(data.services[0].id);
      }
      if (data.barbers.length && !barberId) {
        setBarberId(data.barbers[0].id);
      }
    };

    fetchAvailability().catch(() => {
      setAvailability(null);
    });
  }, [selectedDate, serviceId, barberId]);

  const times = useMemo(() => availability?.times ?? [], [availability]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        phone,
        email,
        serviceId,
        barberId,
        date: selectedDate,
        time: selectedTime,
        notes,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.error ?? "Erro inesperado." });
      setLoading(false);
      return;
    }

    setStatus({
      type: "success",
      message: `Agendamento confirmado para ${formatDate(
        selectedDate
      )} às ${selectedTime}.`,
    });
    setSelectedTime("");
    setNotes("");
    setLoading(false);
  };

  const businessHoursLabel = availability
    ? `${availability.businessHours.start} às ${availability.businessHours.end}`
    : "09:00 às 19:00";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Agenda online
          </p>
          <h3 className="text-2xl font-semibold md:text-3xl">
            Reserve seu horário em poucos passos
          </h3>
          <p className="text-sm text-white/70">
            Horário de atendimento: {businessHoursLabel}. Pausa para almoço das
            12:00 às 13:00.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-white/70">Nome completo</span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Seu nome"
                required
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-white/70">WhatsApp</span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="(00) 00000-0000"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-white/70">E-mail (opcional)</span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seuemail@email.com"
                type="email"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-white/70">Serviço</span>
              <select
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                value={serviceId}
                onChange={(event) => {
                  setServiceId(event.target.value);
                  setSelectedTime("");
                }}
                required
              >
                {availability?.services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} · {service.price}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-white/70">Barbeiro</span>
              <select
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                value={barberId}
                onChange={(event) => {
                  setBarberId(event.target.value);
                  setSelectedTime("");
                }}
                required
              >
                {availability?.barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name} · {barber.specialty}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-white/70">Data</span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                type="date"
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(event.target.value);
                  setSelectedTime("");
                }}
                min={todayIso()}
                required
              />
            </label>
          </div>

          <label className="space-y-2 text-sm">
            <span className="text-white/70">Observações</span>
            <textarea
              className="min-h-[110px] w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Preferências, referência ou observações."
            />
          </label>

          {status && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                  : status.type === "error"
                  ? "border-red-400/40 bg-red-400/10 text-red-200"
                  : "border-white/10 bg-white/5 text-white/70"
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            className="w-full rounded-full bg-[#f2c95a] px-6 py-3 text-center text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading || !selectedTime}
            type="submit"
          >
            {loading ? "Confirmando..." : "Confirmar agendamento"}
          </button>
        </form>
      </div>

      <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Horários disponíveis
          </p>
          <h3 className="text-2xl font-semibold md:text-3xl">
            Escolha o melhor horário para você
          </h3>
          <p className="text-sm text-white/70">
            {availability
              ? `Disponibilidade para ${formatDate(availability.date)}.`
              : "Selecione uma data para visualizar horários."}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {times.length === 0 ? (
            <span className="col-span-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/70">
              Não há horários disponíveis para esta data.
            </span>
          ) : (
            times.map((time) => (
              <button
                key={time}
                className={`rounded-2xl border px-3 py-2 text-sm transition ${
                  selectedTime === time
                    ? "border-[#f2c95a] bg-[#f2c95a] text-black"
                    : "border-white/10 bg-black/40 text-white/80 hover:border-[#f2c95a]/50"
                }`}
                onClick={() => setSelectedTime(time)}
                type="button"
              >
                {time}
              </button>
            ))
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
          <p className="font-semibold text-white">Resumo do agendamento</p>
          <div className="mt-3 space-y-2">
            <p>
              <span className="text-white/50">Serviço:</span>{" "}
              {availability?.services.find((service) => service.id === serviceId)
                ?.name ?? "Selecione"}
            </p>
            <p>
              <span className="text-white/50">Barbeiro:</span>{" "}
              {availability?.barbers.find((barber) => barber.id === barberId)
                ?.name ?? "Selecione"}
            </p>
            <p>
              <span className="text-white/50">Data:</span>{" "}
              {selectedDate ? formatDate(selectedDate) : "Selecione"}
            </p>
            <p>
              <span className="text-white/50">Horário:</span>{" "}
              {selectedTime || "Selecione"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
          <p className="font-semibold text-white">Política rápida</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Confirmação imediata após envio do formulário.</li>
            <li>Remarcações devem ser avisadas com 2h de antecedência.</li>
            <li>Chegue 5 minutos antes para garantir o atendimento.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
