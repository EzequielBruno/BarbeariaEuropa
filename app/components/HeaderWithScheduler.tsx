"use client";

import { useState } from "react";
import AppointmentScheduler from "./AppointmentScheduler";

type Props = {
  whatsappLink?: string;
};

export default function HeaderWithScheduler({ whatsappLink }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-white/10 bg-[#0c0c0c]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a44a] text-[#c9a44a]">
              <img src="/europa-logo.jpg" alt="Logo Barbearia Europa" className="h-11 w-11" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-white/60">Barbearia</p>
              <p className="text-xl font-semibold">Europa</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
            <a className="transition hover:text-[#f2c95a]" href="#servicos">Serviços</a>
            <a className="transition hover:text-[#f2c95a]" href="#estilo">Estilo</a>
            <a className="transition hover:text-[#f2c95a]" href="#portfolio">Portfólio</a>
            <a className="transition hover:text-[#f2c95a]" href="#agenda">Agenda</a>
            <a className="transition hover:text-[#f2c95a]" href="#contato">Contato</a>
          </nav>

          <button
            className="w-full rounded-full border border-[#f2c95a] px-5 py-2 text-center text-sm font-semibold text-[#f2c95a] transition hover:bg-[#f2c95a] hover:text-black sm:w-auto"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="scheduler-modal"
          >
            Agendar agora
          </button>
        </div>
      </header>

      {open && (
        <div
          id="scheduler-modal"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl">
            <div className="bg-[#0b0b0b] p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Agendamento</h3>
                <div className="flex items-center gap-3">
                  {whatsappLink && (
                    <a
                      className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-[#f2c95a] sm:inline-block"
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir no WhatsApp
                    </a>
                  )}
                  <button
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/80"
                    onClick={() => setOpen(false)}
                    aria-label="Fechar"
                  >
                    Fechar
                  </button>
                </div>
              </div>

              <AppointmentScheduler />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
