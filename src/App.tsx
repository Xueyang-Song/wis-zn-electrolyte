import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const fakeData = [
  { name: 'DMSO', lifespan: 2200, conductivity: 31 },
  { name: 'DMF', lifespan: 1900, conductivity: 35 },
  { name: 'TEP', lifespan: 2050, conductivity: 26 },
  { name: 'EG', lifespan: 1500, conductivity: 11 },
];

export default function App() {
  return (
    <main className="min-h-screen px-5 py-8 md:px-10">
      <section className="mx-auto max-w-6xl rounded-[2rem] shell-card px-8 py-10 md:px-12">
        <p className="text-xs uppercase tracking-[0.35em] text-teal">charts from placeholder values</p>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="display-face text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Early structure for the electrolyte atlas
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-fog">
              Still fake numbers, but now the page can at least hold a chart, a narrative, and a few dataset cards at the same time.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-3xl border border-line/70 bg-white/75 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-fog">working rows</p>
                <p className="display-face mt-3 text-3xl text-ink">24</p>
              </article>
              <article className="rounded-3xl border border-line/70 bg-white/75 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-fog">tracked papers</p>
                <p className="display-face mt-3 text-3xl text-ink">14</p>
              </article>
              <article className="rounded-3xl border border-line/70 bg-white/75 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-fog">feature plan</p>
                <p className="display-face mt-3 text-3xl text-ink">23</p>
              </article>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-line/70 bg-white/80 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-copper">fake solvent ranking</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fakeData}>
                  <XAxis dataKey="name" stroke="#6d7483" />
                  <YAxis stroke="#6d7483" />
                  <Tooltip />
                  <Bar dataKey="lifespan" fill="#0f6e78" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
