export default function Home() {
  const whatsappLink = "https://wa.me/5534992892310";

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <header className="border-b border-white/10 bg-[#0c0c0c]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a44a] text-[#c9a44a]">
              <span className="text-lg font-semibold">EB</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-white/60">
                Barbearia
              </p>
              <p className="text-lg font-semibold">Europa</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.32em] text-white/60 sm:text-sm">
            <a className="transition hover:text-[#f2c95a]" href="#servicos">
              Serviços
            </a>
            <a className="transition hover:text-[#f2c95a]" href="#ambiente">
              Ambiente
            </a>
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

      <main>
        <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative z-10 flex flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f2c95a] sm:text-sm">
                Barbearia Europa
              </p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
                Corte preciso, barba impecável e estilo europeu.
              </h1>
              <p className="text-sm text-white/70 sm:text-base">
                Atendimento premium com profissionais experientes, ambiente sofisticado e
                cuidado completo para você sair impecável.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  className="w-full rounded-full bg-[#f2c95a] px-7 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#e1b84b] sm:w-auto"
                  href={whatsappLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  Reservar horário
                </a>
                <a
                  className="w-full rounded-full border border-white/30 px-7 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-[#f2c95a] hover:text-[#f2c95a] sm:w-auto"
                  href="#servicos"
                >
                  Ver serviços
                </a>
              </div>
              <a
                className="flex items-center justify-between rounded-2xl bg-[#f2c95a] px-5 py-4 text-sm font-semibold text-black transition hover:bg-[#e1b84b] sm:max-w-xs"
                href={whatsappLink}
                rel="noreferrer"
                target="_blank"
              >
                <span>Próxima vaga</span>
                <span>14:30</span>
              </a>
            </div>
            <div className="relative">
              <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#f2c95a]/20 blur-3xl" />
              <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-6">
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                    Experiência premium
                  </p>
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    Detalhes que fazem a diferença.
                  </h2>
                  <p className="text-sm text-white/70">
                    Produtos importados, técnicas modernas e o cuidado que você merece em
                    cada visita.
                  </p>
                  <div className="grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      Atendimento individualizado
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      Ambiente climatizado
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      Produtos premium
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      Barbeer &amp; Grooming
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0f0f0f] py-16" id="servicos">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f2c95a] sm:text-sm">
                Serviços
              </p>
              <h2 className="text-2xl font-semibold sm:text-4xl">
                Escolha o cuidado ideal para você.
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Corte clássico",
                  description: "Modelagem alinhada com seu estilo e consultoria rápida.",
                },
                {
                  title: "Barba premium",
                  description: "Hidratação, alinhamento e acabamento com toalha quente.",
                },
                {
                  title: "Combo Europa",
                  description: "Corte, barba e finalização completa com cuidado de pele.",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#111111] p-6"
                >
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-white/70">{service.description}</p>
                  <a
                    className="mt-auto inline-flex items-center justify-center rounded-full border border-[#f2c95a] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f2c95a] transition hover:bg-[#f2c95a] hover:text-black"
                    href={whatsappLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Agendar pelo WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16" id="ambiente">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f2c95a] sm:text-sm">
                  Ambiente
                </p>
                <h2 className="text-2xl font-semibold sm:text-4xl">
                  Um espaço pensado para o seu conforto.
                </h2>
                <p className="text-sm text-white/70 sm:text-base">
                  Lounge exclusivo, bebidas selecionadas e atendimento personalizado em
                  cada detalhe. Chegue, relaxe e aproveite a experiência Europa.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Lounge climatizado com música ambiente",
                  "Cadeiras premium e higienização completa",
                  "Wi-Fi rápido para trabalho ou lazer",
                  "Bebidas e café disponíveis durante a visita",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[#111111] p-5 text-sm text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0f0f0f] py-16" id="contato">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f2c95a] sm:text-sm">
                  Contato
                </p>
                <h2 className="text-2xl font-semibold sm:text-4xl">
                  Consulte horários exclusivos e atendimento personalizado.
                </h2>
                <p className="text-sm text-white/70 sm:text-base">
                  Nossa equipe responde rapidamente no WhatsApp para confirmar horários,
                  tirar dúvidas e garantir a melhor experiência.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      Atendimento
                    </p>
                    <p className="text-lg font-semibold">(34) 99289-2310</p>
                  </div>
                  <div className="grid gap-2 text-sm text-white/70">
                    <p>Segunda a sexta: 09h às 20h</p>
                    <p>Sábados: 09h às 18h</p>
                  </div>
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
          </div>
        </section>
      </main>
    </div>
  );
}
