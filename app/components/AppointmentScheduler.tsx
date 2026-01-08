"use client";

import { useEffect, useMemo, useState, type FormEvent, type MouseEvent } from "react";
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

const buildAvailabilityUrl = (date: string, serviceId?: string, barberId?: string) => {
  const params = new URLSearchParams({ date });
  if (serviceId) params.set("serviceId", serviceId);
  if (barberId) params.set("barberId", barberId);
  return `/api/appointments/availability?${params.toString()}`;
};

type StatusState =
  | { type: "success" | "error" | "info"; message: string }
  | null;

export default function AppointmentScheduler() {
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [selectedDate, setSelectedDate] = useState(todayIso());
  const [serviceId, setServiceId] = useState<string>("");
  const [barberId, setBarberId] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<StatusState>(null);
  const [loading, setLoading] = useState(false);
  const [openTimesModal, setOpenTimesModal] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(buildAvailabilityUrl(selectedDate, serviceId, barberId));
        if (!res.ok) {
          setAvailability(null);
          return;
        }

        const data = (await res.json()) as AvailabilityResult;
        setAvailability(data);

        // Define defaults somente quando ainda não há seleção
        if (data.services.length && !serviceId) setServiceId(data.services[0].id);
        if (data.barbers.length && !barberId) setBarberId(data.barbers[0].id);
      } catch {
        setAvailability(null);
      }
    };

    fetchAvailability();
  }, [selectedDate, serviceId, barberId]);

  const times = useMemo(() => availability?.times ?? [], [availability]);

  const confirmSubmit = async () => {
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
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

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data?.error ?? "Erro inesperado." });
        return;
      }

      setStatus({
        type: "success",
        message: `Agendamento confirmado para ${formatDate(selectedDate)} às ${selectedTime}.`,
      });

      setSelectedTime("");
      setNotes("");
      setOpenTimesModal(false);
    } catch {
      setStatus({ type: "error", message: "Erro ao confirmar agendamento." });
    } finally {
      setLoading(false);
    }
  };

  const handleAgendar = (e?: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setStatus(null);

    if (!customerName || !phone || !serviceId || !barberId || !selectedDate) {
      setStatus({
        type: "info",
        message: "Preencha nome, WhatsApp, serviço, barbeiro e data antes de escolher o horário.",
      });
      return;
    }

    setOpenTimesModal(true);
  };

  const businessHoursLabel = availability
    ? `${availability.businessHours.start} às ${availability.businessHours.end}`
    : "09:00 às 19:00";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Agenda online</p>
          <h3 className="text-2xl font-semibold md:text-3xl">Reserve seu horário em poucos passos</h3>
          <p className="text-sm text-white/70">
            Horário de atendimento: {businessHoursLabel}. Pausa para almoço das 12:00 às 13:00.
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-white/70">Nome completo</span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                value={customerName}
                onChange={(ev) => setCustomerName(ev.target.value)}
                placeholder="Seu nome"
                required
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-white/70">WhatsApp</span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
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
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="seuemail@email.com"
                type="email"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-white/70">Serviço</span>
              <select
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-[#f2c95a]"
                value={serviceId}
                onChange={(ev) => {
                  setServiceId(ev.target.value);
                  setSelectedTime("");
                }}
                required
              >
                {availability?.services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {s.price}
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
                onChange={(ev) => {
                  setBarberId(ev.target.value);
                  setSelectedTime("");
                }}
                required
              >
                {availability?.barbers.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} · {b.specialty}
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
                onChange={(ev) => {
                  setSelectedDate(ev.target.value);
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
              onChange={(ev) => setNotes(ev.target.value)}
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
            type="button"
            onClick={handleAgendar}
            disabled={loading}
            className="w-full rounded-full bg-[#f2c95a] px-6 py-3 text-center text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Agendar
          </button>
        </form>
      </div>

      <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Horários disponíveis</p>
          <h3 className="text-2xl font-semibold md:text-3xl">Escolha o melhor horário para você</h3>
          <p className="text-sm text-white/70">
            {availability ? `Disponibilidade para ${formatDate(availability.date)}.` : "Selecione uma data para visualizar horários."}
          </p>
        </div>

        <div className="mt-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-6 text-sm text-white/70">
            Clique em "Agendar" para abrir o formulário de horários.
          </div>
        </div>

        {openTimesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpenTimesModal(false)} />
            <div className="relative z-10 w-full max-w-3xl overflow-auto rounded-2xl p-4">
              <div className="rounded-2xl border border-white/10 bg-black p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Escolha um horário</h4>
                  <p className="text-sm text-white/70">
                    Disponibilidade para{" "}
                    {availability ? formatDate(availability.date) : formatDate(selectedDate)}
                  </p>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await confirmSubmit();
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {times.length === 0 ? (
                      <span className="col-span-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/70">
                        Não há horários disponíveis para esta data.
                      </span>
                    ) : (
                      times.map((time) => (
                        <label key={time} className="cursor-pointer">
                          <input
                            type="radio"
                            name="time"
                            value={time}
                            checked={selectedTime === time}
                            onChange={() => setSelectedTime(time)}
                            className="sr-only"
                          />
                          <div
                            className={`flex items-center justify-center rounded-2xl border px-3 py-2 text-sm transition ${
                              selectedTime === time
                                ? "border-[#f2c95a] bg-[#f2c95a] text-black"
                                : "border-white/10 bg-black/40 text-white/80 hover:border-[#f2c95a]/50"
                            }`}
                          >
                            {time}
                          </div>
                        </label>
                      ))
                    )}
                  </div>

                  <div className="mt-2 flex gap-3">
                    <button
                      type="button"
                      className="flex-1 rounded-full border border-white/10 px-6 py-3 text-sm text-white/80"
                      onClick={() => setOpenTimesModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !selectedTime}
                      className="flex-1 rounded-full bg-[#f2c95a] px-6 py-3 text-sm font-semibold text-black disabled:opacity-60"
                    >
                      {loading ? "Confirmando..." : "Confirmar agendamento"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
          <p className="font-semibold text-white">Resumo do agendamento</p>
          <div className="mt-3 space-y-2">
            <p>
              <span className="text-white/50">Serviço:</span>{" "}
              {availability?.services.find((s) => s.id === serviceId)?.name ?? "Selecione"}
            </p>
            <p>
              <span className="text-white/50">Barbeiro:</span>{" "}
              {availability?.barbers.find((b) => b.id === barberId)?.name ?? "Selecione"}
            </p>
            <p>
              <span className="text-white/50">Data:</span>{" "}
              {selectedDate ? formatDate(selectedDate) : "Selecione"}
            </p>
            <p>
              <span className="text-white/50">Horário:</span> {selectedTime || "Selecione"}
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
