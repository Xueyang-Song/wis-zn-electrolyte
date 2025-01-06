const metrics = [
  ['Formulations', 'working set'],
  ['Papers', 'open tabs'],
  ['Features', 'rough plan'],
];

export default function App() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-12">
      <section className="mx-auto max-w-5xl rounded-[2rem] shell-card p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.35em] text-teal">water-in-salt zinc notes</p>
        <h1 className="display-face mt-4 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
          Machine-learning reading notes for organic co-solvents in aqueous zinc electrolytes
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-fog">
          First pass at turning the paper outline into a site. Still mostly a hero and a visual direction check.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {metrics.map(([label, value]) => (
            <article key={label} className="rounded-3xl border border-line/70 bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-fog">{label}</p>
              <p className="display-face mt-3 text-2xl text-ink">{value}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
