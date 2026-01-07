export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <header className="border-b border-white/10 bg-[#0c0c0c]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a44a] text-[#c9a44a]">
              <span className="text-lg font-semibold">EB</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-white/60">
                Barbearia
              </p>
              <p className="text-xl font-semibold">Europa</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
            <a className="transition hover:text-[#f2c95a]" href="#servicos">
              Serviços
            </a>
            <a className="transition hover:text-[#f2c95a]" href="#estilo">
              Estilo
            </a>
            <a className="transition hover:text-[#f2c95a]" href="#agenda">
              Agenda
            </a>
            <a className="transition hover:text-[#f2c95a]" href="#contato">
              Contato
            </a>
          </nav>
          <button className="rounded-full border border-[#f2c95a] px-5 py-2 text-sm font-semibold text-[#f2c95a] transition hover:bg-[#f2c95a] hover:text-black">
            Agendar agora
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#0c0c0c]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#f2c95a] blur-[120px]" />
            <div className="absolute right-10 top-32 h-72 w-72 rounded-full bg-white/40 blur-[140px]" />
            <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#6f6f6f] blur-[180px]" />
          </div>
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 md:flex-row md:items-center md:gap-16">
            <div className="relative z-10 flex flex-1 flex-col gap-6">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#f2c95a]">
                Barbearia Europa
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                Corte preciso, barba impecável e estilo europeu.
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/70">
                Um espaço premium para homens que valorizam tradição, conforto e
                atendimento impecável. Experimente um ritual completo com
                barbearia clássica, técnicas modernas e produtos exclusivos.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-full bg-[#f2c95a] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#e1b84b]">
                  Reservar horário
                </button>
                <button className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white/80 transition hover:border-[#f2c95a] hover:text-[#f2c95a]">
                  Ver serviços
                </button>
              </div>
              <div className="flex flex-wrap gap-8 pt-4 text-sm text-white/60">
                <div>
                  <p className="text-lg font-semibold text-white">+12 anos</p>
                  <p>de tradição</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">4,9/5</p>
                  <p>avaliações</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">1200+</p>
                  <p>clientes fiéis</p>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex-1">
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#1d1d1d] p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Agenda do dia
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                    10:00 - 19:00
                  </div>
                </div>
                <div className="mt-10 space-y-6">
                  {[
                    "Corte executivo + barba",
                    "Barboterapia completa",
                    "Hidratação premium",
                  ].map((service) => (
                    <div
                      key={service}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-4"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {service}
                        </p>
                        <p className="text-xs text-white/50">Hoje • 45 min</p>
                      </div>
                      <span className="text-xs font-semibold text-[#f2c95a]">
                        Confirmado
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#f2c95a] px-5 py-4 text-sm font-semibold text-black">
                  <span>Próxima vaga</span>
                  <span>14:30</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="bg-[#0f0f0f] py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-4">
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Serviços
              </p>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Experiência completa de barbearia.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Corte & finalização",
                  description:
                    "Consultoria de estilo, corte detalhado e finalização com produtos premium.",
                },
                {
                  title: "Barboterapia",
                  description:
                    "Toalha quente, hidratação, lâmina precisa e massagem relaxante.",
                },
                {
                  title: "Pacote Europa",
                  description:
                    "Corte + barba + cuidados faciais para uma presença marcante.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-white/10 bg-[#111111] p-6"
                >
                  <div className="mb-6 h-12 w-12 rounded-full border border-[#f2c95a] text-[#f2c95a]" />
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {card.description}
                  </p>
                  <button className="mt-6 text-sm font-semibold text-[#f2c95a]">
                    Saiba mais →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="estilo" className="bg-[#0c0c0c] py-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center">
            <div className="flex-1 space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-[#f2c95a]">
                Estilo Europa
              </p>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Comece a semana com estilo e atitude.
              </h2>
              <p className="text-base leading-7 text-white/70">
                Inspirada na estética europeia, nossa barbearia combina texturas
                escuras, iluminação aconchegante e detalhes dourados para criar
                um ambiente sofisticado e masculino.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-4">
                  <p className="text-lg font-semibold text-white">12</p>
                  <p className="text-xs uppercase text-white/50">profissionais</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-4">
                  <p className="text-lg font-semibold text-white">6</p>
                  <p className="text-xs uppercase text-white/50">poltronas VIP</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-4">
                  <p className="text-lg font-semibold text-white">100%</p>
                  <p className="text-xs uppercase text-white/50">conforto</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="rounded-[30px] border border-white/10 bg-gradient-to-b from-[#1b1b1b] to-[#0c0c0c] p-8">
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">
                  Ambiente premium
                </p>
                <h3 className="mt-6 text-2xl font-semibold text-white">
                  Um lounge exclusivo para você relaxar.
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/60">
                  Café espresso, bebidas selecionadas e playlist personalizada
                  enquanto cuidamos do seu visual.
                </p>
                <div className="mt-8 flex flex-col gap-4 text-sm text-white/70">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span>Recepção personalizada</span>
                    <span className="text-[#f2c95a]">Inclusa</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span>Produtos importados</span>
                    <span className="text-[#f2c95a]">Premium</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ambiente climatizado</span>
                    <span className="text-[#f2c95a]">Sempre</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="agenda" className="bg-[#0f0f0f] py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                  Agenda
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  Horários flexíveis para sua rotina.
                </h2>
                <p className="text-base leading-7 text-white/70">
                  Reserve com antecedência ou encaixe-se no mesmo dia. Nossa
                  equipe está pronta para atender você com pontualidade.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Seg - Sex", "Sábado"].map((label) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-[#111111] px-5 py-4"
                    >
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="text-sm text-white/60">09:00 - 20:00</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-[#111111] p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                  Reserva rápida
                </p>
                <h3 className="mt-5 text-2xl font-semibold text-white">
                  Garanta seu horário
                </h3>
                <div className="mt-6 space-y-4 text-sm text-white/70">
                  <div className="flex items-center justify-between">
                    <span>Atendimento express</span>
                    <span className="text-[#f2c95a]">30 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Combo corte + barba</span>
                    <span className="text-[#f2c95a]">60 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pacote premium</span>
                    <span className="text-[#f2c95a]">90 min</span>
                  </div>
                </div>
                <button className="mt-8 w-full rounded-full bg-[#f2c95a] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e1b84b]">
                  Agendar pelo WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="bg-[#0c0c0c] py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-[#151515] via-[#0f0f0f] to-[#151515] p-10 md:p-14">
              <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                    Visite-nos
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                    Barbeiros especialistas prontos para você.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70">
                    Rua Honório de Paiva Abreu, 1260 • Bela Vista • Araxá - MG
                    <br />
                    Telefone: (34) 99973-3449
                  </p>
                </div>
                <div className="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                      Contato
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      atendimento@barbeariaeuropa.com
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                      Instagram
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      @barbeariaeuropa
                    </p>
                  </div>
                  <button className="w-full rounded-full border border-[#f2c95a] px-6 py-3 text-sm font-semibold text-[#f2c95a] transition hover:bg-[#f2c95a] hover:text-black">
                    Solicitar consultoria
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0c0c0c] py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 text-sm text-white/60 md:flex-row">
          <p>© 2024 Barbearia Europa. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a className="transition hover:text-[#f2c95a]" href="#servicos">
              Serviços
            </a>
            <a className="transition hover:text-[#f2c95a]" href="#agenda">
              Agenda
            </a>
            <a className="transition hover:text-[#f2c95a]" href="#contato">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
