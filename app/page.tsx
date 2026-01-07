export default function Home() {
  const whatsappLink = "https://wa.me/5534992892310";

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <header className="border-b border-white/10 bg-[#0c0c0c]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a44a] text-[#c9a44a]">
              <span className="text-lg font-semibold">EB</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-white/60">
            <a className="transition hover:text-[#f2c95a]" href="#contato">
              Contato
            </a>
          </nav>
          <a
            className="w-full rounded-full border border-[#f2c95a] px-5 py-2 text-center text-sm font-semibold text-[#f2c95a] transition hover:bg-[#f2c95a] hover:text-black sm:w-auto"
            href={whatsappLink}
            rel="noreferrer"
            target="_blank"
          >
            Agendar agora
          </a>
        </div>
      </header>
            <div className="relative z-10 flex flex-1 flex-col gap-6 sm:items-start">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#f2c95a]">
                Barbearia Europa
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                Corte preciso, barba impecável e estilo europeu.
              </h1>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  className="w-full rounded-full bg-[#f2c95a] px-7 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#e1b84b] sm:w-auto"
                  href={whatsappLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  Reservar horário
                </a>
                <button className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white/80 transition hover:border-[#f2c95a] hover:text-[#f2c95a] sm:w-auto">
                  Ver serviços
                </button>
              </div>
                <a
                  className="mt-8 flex items-center justify-between rounded-2xl bg-[#f2c95a] px-5 py-4 text-sm font-semibold text-black transition hover:bg-[#e1b84b]"
                  href={whatsappLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>Próxima vaga</span>
                  <span>14:30</span>
                </a>
              </div>
            </div>
          </div>
        </section>
                <a
                  className="mt-8 w-full rounded-full bg-[#f2c95a] px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#e1b84b]"
                  href={whatsappLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  Agendar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
                  <a
                    className="w-full rounded-full border border-[#f2c95a] px-6 py-3 text-center text-sm font-semibold text-[#f2c95a] transition hover:bg-[#f2c95a] hover:text-black"
                    href={whatsappLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Solicitar consultoria
                  </a>
                </div>
              </div>
            </div>
