const nav = ['Context', 'Dataset', 'Models'];
const cards = [
  {
    title: 'Why aqueous zinc',
    body: 'Cheap metal anodes, safer water-based electrolytes, and still a lot of unsolved interface problems.',
  },
  {
    title: 'Why water-in-salt',
    body: 'High salt concentration suppresses water activity, but co-solvents change that balance in complicated ways.',
  },
  {
    title: 'Why a site',
    body: 'The paper is short. The site needs room for the dataset, the charts, and the decision logic.',
  },
];

export default function App() {
  return (
    <main className="min-h-screen px-5 py-8 md:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line/70 bg-white/80 px-5 py-3 text-sm text-fog">
        <span className="font-semibold uppercase tracking-[0.28em] text-teal">wis zinc atlas</span>
        <div className="hidden gap-6 md:flex">
          {nav.map((item) => (
            <a key={item} href="#" className="transition hover:text-ink">
              {item}
            </a>
          ))}
        </div>
      </nav>
      <section className="mx-auto mt-8 max-w-6xl rounded-[2rem] shell-card px-8 py-10 md:px-12 md:py-14">
        <p className="text-xs uppercase tracking-[0.35em] text-copper">icemee 2026 working microsite</p>
        <h1 className="display-face mt-4 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
          Mapping co-solvent choices for water-in-salt zinc-ion battery electrolytes
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-fog">
          The visual direction is getting closer: paper-like, a little dramatic, but still readable like an academic explainer instead of a dashboard.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-[1.75rem] border border-line/70 bg-white/75 p-6">
              <h2 className="display-face text-2xl text-ink">{card.title}</h2>
              <p className="mt-4 text-base leading-7 text-fog">{card.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
