import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useState } from 'react';
import siteData from './data/generated/siteData.json';
import { NavBar } from './components/NavBar';
import { SectionFrame } from './components/SectionFrame';
import { DatasetExplorer } from './components/DatasetExplorer';
import { ModelBenchmark } from './components/ModelBenchmark';
import { ShapRules } from './components/ShapRules';
import { ReferenceDrawer } from './components/ReferenceDrawer';
import { useActiveSection } from './hooks/useActiveSection';

const sections = [
  { id: 'hero', label: 'Overview' },
  { id: 'dataset', label: 'Dataset' },
  { id: 'methods', label: 'Method' },
  { id: 'models', label: 'Models' },
  { id: 'shap', label: 'Design rules' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'references', label: 'References' },
];

const pieColors = ['#0f6e78', '#a86a3d', '#506176', '#c3b49e', '#d8cfbf', '#8ba3a6'];

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeId = useActiveSection(sections.map((section) => section.id));
  return (
    <div className="min-h-screen">
      <NavBar activeId={activeId} sections={sections} onReferences={() => setDrawerOpen(true)} />
      <main>
        <section id="hero" className="section-anchor mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
          <div className="grid gap-8 rounded-[2.3rem] shell-card px-8 py-10 md:px-12 lg:grid-cols-[0.62fr_0.38fr] lg:py-14">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-teal">ICEMEE 2026 paper companion</p>
              <h1 className="display-face mt-4 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
                Machine-learning analysis of organic co-solvents for water-in-salt zinc-ion battery electrolytes
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-fog">
                This site turns the short conference manuscript into a navigable research atlas: dataset structure, model behavior, design rules, and solvent recommendations all live in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {siteData.heroMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-full border border-line/70 bg-white/80 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-fog">{metric.label}</p>
                    <p className="display-face mt-1 text-2xl text-ink">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={siteData.meta.paperPath} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal">
                  Download paper PDF
                </a>
                <button type="button" onClick={() => setDrawerOpen(true)} className="rounded-full border border-copper/30 px-5 py-3 text-sm font-semibold text-copper transition hover:bg-copper hover:text-white">
                  Read references here
                </button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <article className="rounded-[1.7rem] border border-line/70 bg-white/85 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-copper">Why this matters</p>
                <p className="mt-4 text-base leading-7 text-fog">{siteData.narrative.whyItMatters}</p>
              </article>
              <article className="rounded-[1.7rem] border border-line/70 bg-white/85 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-copper">WIS framing</p>
                <p className="mt-4 text-base leading-7 text-fog">{siteData.narrative.wisFrame}</p>
              </article>
              <article className="rounded-[1.7rem] border border-line/70 bg-white/85 p-5 md:col-span-2 lg:col-span-1">
                <p className="text-xs uppercase tracking-[0.26em] text-copper">Honest limit</p>
                <p className="mt-4 text-base leading-7 text-fog">{siteData.narrative.honestLimit}</p>
              </article>
            </div>
          </div>
        </section>

        <SectionFrame
          id="dataset"
          index="01"
          eyebrow="Dataset overview"
          title="A cross-study corpus built to compare chemistry, not just single papers"
          body="The site keeps the manuscript's scope but makes the underlying evidence easier to inspect: year coverage, salt distributions, solvent frequency, and row-level provenance stay visible together."
        >
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[0.46fr_0.54fr]">
              <div className="rounded-[1.75rem] border border-line/70 bg-shell p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-copper">By publication year</p>
                <div className="mt-4 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={siteData.yearCounts}>
                      <XAxis dataKey="year" stroke="#6d7483" />
                      <YAxis stroke="#6d7483" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0f6e78" radius={[12, 12, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] border border-line/70 bg-shell p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-copper">Salt split</p>
                  <div className="mt-3 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={siteData.saltCounts} dataKey="count" nameKey="name" innerRadius={48} outerRadius={88} paddingAngle={2}>
                          {siteData.saltCounts.map((entry, index) => (
                            <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-line/70 bg-shell p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-copper">Most frequent co-solvents</p>
                  <div className="mt-4 space-y-3">
                    {siteData.topSolvents.map((row) => (
                      <div key={row.name}>
                        <div className="flex items-center justify-between text-sm text-fog">
                          <span>{row.name}</span>
                          <span>{row.count}</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-paper">
                          <div className="h-full rounded-full bg-copper" style={{ width: `${Math.min(100, row.count * 14)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DatasetExplorer formulations={siteData.formulations} />
          </div>
        </SectionFrame>

        <SectionFrame
          id="methods"
          index="02"
          eyebrow="Feature engineering and methodology"
          title="The modeling pipeline was intentionally simple, but the feature framing was chemistry-aware"
          body="The site mirrors the manuscript: 23 features across molecular descriptors, physicochemical properties, and formulation interactions, plus strict leave-one-paper-out validation for transfer realism."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {siteData.featureGroups.map((group) => (
              <article key={group.group} className="rounded-[1.75rem] border border-line/70 bg-shell p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-copper">{group.count} features</p>
                <h3 className="display-face mt-3 text-2xl text-ink">{group.group}</h3>
                <ul className="mt-4 space-y-2 text-fog">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame
          id="models"
          index="03"
          eyebrow="Model benchmark panel"
          title="Only lifespan and conductivity generalized across papers"
          body="The benchmark view makes the paper's biggest methodological lesson hard to miss: some targets were learnable at useful levels, others were not."
        >
          <ModelBenchmark modelBenchmarks={siteData.modelBenchmarks} />
        </SectionFrame>

        <SectionFrame
          id="shap"
          index="04"
          eyebrow="SHAP-based design rules"
          title="The site turns the SHAP plots into practical formulation heuristics"
          body="Instead of leaving the paper's interpretation trapped in a caption, the microsite surfaces the reusable rules behind the rankings."
        >
          <ShapRules shapSummary={siteData.shapSummary} />
        </SectionFrame>
<SectionFrame
          id="recommendations"
          index="05"
          eyebrow="Practical solvent recommendations"
          title="The site ends where the next experiments should begin"
          body="The goal is not to oversell prediction. It is to narrow the solvent search space to the combinations most worth validating under a common protocol."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {siteData.recommendations.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-line/70 bg-shell p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-copper">Follow-up move</p>
                <h3 className="display-face mt-3 text-2xl text-ink">{item.title}</h3>
                <p className="mt-4 text-fog">{item.body}</p>
              </article>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame
          id="references"
          index="06"
          eyebrow="References and paper download"
          title="The manuscript, bibliography, and source confidence stay in the same reading flow"
          body="The website is meant to feel self-contained: key references stay readable in-page, while the full PDF remains one click away."
        >
          <div className="grid gap-6 lg:grid-cols-[0.54fr_0.46fr]">
            <article className="rounded-[1.75rem] border border-line/70 bg-shell p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-copper">Paper summary</p>
              <h3 className="display-face mt-3 text-3xl text-ink">From conference abstract to navigable knowledge artifact</h3>
              <p className="mt-4 text-lg leading-8 text-fog">This microsite keeps the paper's core claims intact while giving the dataset, feature logic, and solvent recommendations enough space to be genuinely useful.</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href={siteData.meta.paperPath} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal">Open PDF</a>
                <button type="button" onClick={() => setDrawerOpen(true)} className="rounded-full border border-copper/30 px-5 py-3 text-sm font-semibold text-copper transition hover:bg-copper hover:text-white">Open reference drawer</button>
              </div>
            </article>
            <article className="rounded-[1.75rem] border border-line/70 bg-shell p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-copper">Notes on evidence quality</p>
              <ul className="mt-4 space-y-3 text-fog">
                <li>• 108 formulations kept after duplicate removal and scope filtering.</li>
                <li>• 63 open-access source papers represented in the site dataset.</li>
                <li>• Physicochemical gaps were median-imputed during modeling, just like the paper notes.</li>
                <li>• NMP stays visible as a candidate, but remains explicitly outside the in-dataset solvent manifold.</li>
              </ul>
            </article>
          </div>
        </SectionFrame>
      </main>
      <ReferenceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} references={siteData.references} />
    </div>
  );
}
