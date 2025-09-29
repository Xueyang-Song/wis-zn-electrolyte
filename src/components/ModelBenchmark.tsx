import { useState } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type MetricRow = {
  model: string;
  cv_r2: number;
  cv_band: string;
  lopo_r2: number;
  p_value: number;
  note: string;
};

type Props = {
  modelBenchmarks: Record<string, MetricRow[]>;
};

const labels: Record<string, string> = {
  lifespan: 'Cycle lifespan',
  conductivity: 'Ionic conductivity',
  ce: 'Coulombic efficiency',
  esw: 'Electrochemical stability window',
};

export function ModelBenchmark({ modelBenchmarks }: Props) {
  const [target, setTarget] = useState('lifespan');
  const rows = modelBenchmarks[target] ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.entries(labels).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTarget(key)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              target === key ? 'bg-ink text-white' : 'border border-line bg-white text-fog hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="rounded-[1.75rem] border border-line/70 bg-white/85 p-4">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.26em] text-copper">cross-study benchmarking</p>
            <p className="display-face text-2xl text-ink">{labels[target]}</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows}>
                <XAxis dataKey="model" stroke="#6d7483" />
                <YAxis stroke="#6d7483" />
                <Tooltip />
                <Legend />
                <Bar dataKey="cv_r2" fill="#0f6e78" radius={[12, 12, 0, 0]} name="5-fold CV R²" />
                <Bar dataKey="lopo_r2" fill="#a86a3d" radius={[12, 12, 0, 0]} name="LOPO R²" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-4">
          {rows.map((row) => (
            <article key={row.model} className="rounded-[1.75rem] border border-line/70 bg-white/85 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-fog">{row.model}</p>
                  <p className="display-face mt-2 text-3xl text-ink">R² {row.cv_r2.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl bg-paper px-3 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-fog">LOPO</p>
                  <p className="font-semibold text-ink">{row.lopo_r2.toFixed(3)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-fog">{row.note}</p>
              <div className="mt-4 flex gap-3 text-sm text-fog">
                <span>CV band {row.cv_band}</span>
                <span>p = {row.p_value.toFixed(2)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
