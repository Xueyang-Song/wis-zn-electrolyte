import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
  shapSummary: Record<string, Array<{ feature: string; importance: number }>>;
};

export function ShapRules({ shapSummary }: Props) {
  const [target, setTarget] = useState<'lifespan' | 'conductivity'>('lifespan');
  const rows = shapSummary[target];

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['lifespan', 'conductivity'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTarget(key)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              target === key ? 'bg-ink text-white' : 'border border-line bg-white text-fog hover:text-ink'
            }`}
          >
            {key === 'lifespan' ? 'Lifespan rules' : 'Conductivity rules'}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="rounded-[1.75rem] border border-line/70 bg-white/85 p-4">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.26em] text-copper">shap ranking</p>
            <p className="display-face text-2xl text-ink">Cross-target feature importance</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows} layout="vertical" margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
                <XAxis type="number" stroke="#6d7483" />
                <YAxis type="category" width={120} dataKey="feature" stroke="#6d7483" />
                <Tooltip />
                <Bar dataKey="importance" fill="#a86a3d" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-4">
          <article className="rounded-[1.75rem] border border-line/70 bg-shell p-5">
            <p className="text-xs uppercase tracking-[0.26em] text-copper">Rule 01</p>
            <h3 className="display-face mt-3 text-2xl text-ink">Co-solvent fraction sets the first-order regime</h3>
            <p className="mt-4 text-fog">The strongest global signal is still simple: more co-solvent usually helps lifespan, but conductivity peaks in a moderate fraction window.</p>
          </article>
          <article className="rounded-[1.75rem] border border-line/70 bg-shell p-5">
            <p className="text-xs uppercase tracking-[0.26em] text-copper">Rule 02</p>
            <h3 className="display-face mt-3 text-2xl text-ink">DN × fraction beats donor number alone</h3>
            <p className="mt-4 text-fog">The site keeps the paper’s key interpretation: effective donor concentration matters more than donor number as an isolated descriptor.</p>
          </article>
          <article className="rounded-[1.75rem] border border-line/70 bg-shell p-5">
            <p className="text-xs uppercase tracking-[0.26em] text-copper">Rule 03</p>
            <h3 className="display-face mt-3 text-2xl text-ink">Salt concentration is a strong second lever</h3>
            <p className="mt-4 text-fog">High-concentration WIS conditions stabilize zinc plating, but the conductivity penalty becomes visible as viscosity climbs.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
