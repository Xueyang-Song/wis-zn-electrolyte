import { useState } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Formulation } from '../types';
import { median, statusTone } from '../utils';

type Props = {
  formulations: Formulation[];
};

const metricMap = {
  lifespan: { key: 'lifespan_h', label: 'Lifespan (h)' },
  conductivity: { key: 'ionic_conductivity_mS_cm', label: 'Ionic conductivity (mS/cm)' },
  ce: { key: 'ce_pct', label: 'CE (%)' },
  esw: { key: 'esw_v', label: 'ESW (V)' },
} as const;

export function DatasetExplorer({ formulations }: Props) {
  const [solvent, setSolvent] = useState('All');
  const [salt, setSalt] = useState('All');
  const [year, setYear] = useState('All');
  const [metric, setMetric] = useState<keyof typeof metricMap>('lifespan');

  const solvents = ['All', ...new Set(formulations.map((row) => row.co_solvent_name))];
  const salts = ['All', ...new Set(formulations.map((row) => row.salt_name))];
  const years = ['All', ...new Set(formulations.map((row) => String(row.year)))];

  const filtered = formulations.filter((row) => {
    const okSolvent = solvent === 'All' || row.co_solvent_name === solvent;
    const okSalt = salt === 'All' || row.salt_name === salt;
    const okYear = year === 'All' || String(row.year) === year;
    return okSolvent && okSalt && okYear;
  });

  const metricKey = metricMap[metric].key;
  const metricValues = filtered.map((row) => Number(row[metricKey]));
  const lifeMedian = median(filtered.map((row) => row.lifespan_h));
  const condMedian = median(filtered.map((row) => row.ionic_conductivity_mS_cm));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        <label className="rounded-3xl border border-line/70 bg-shell p-4">
          <span className="text-xs uppercase tracking-[0.26em] text-fog">co-solvent</span>
          <select className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3" value={solvent} onChange={(event) => setSolvent(event.target.value)}>
            {solvents.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="rounded-3xl border border-line/70 bg-shell p-4">
          <span className="text-xs uppercase tracking-[0.26em] text-fog">salt</span>
          <select className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3" value={salt} onChange={(event) => setSalt(event.target.value)}>
            {salts.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="rounded-3xl border border-line/70 bg-shell p-4">
          <span className="text-xs uppercase tracking-[0.26em] text-fog">year</span>
          <select className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3" value={year} onChange={(event) => setYear(event.target.value)}>
            {years.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <div className="rounded-3xl border border-line/70 bg-shell p-4">
          <span className="text-xs uppercase tracking-[0.26em] text-fog">target metric</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(metricMap).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMetric(key as keyof typeof metricMap)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  metric === key ? 'bg-ink text-white' : 'border border-line bg-white text-fog hover:text-ink'
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-line/70 bg-paper/70 p-5">
          <p className="text-xs uppercase tracking-[0.26em] text-fog">matching rows</p>
          <p className="display-face mt-3 text-4xl text-ink">{filtered.length}</p>
        </article>
        <article className="rounded-3xl border border-line/70 bg-paper/70 p-5">
          <p className="text-xs uppercase tracking-[0.26em] text-fog">median lifespan</p>
          <p className="display-face mt-3 text-4xl text-ink">{lifeMedian.toFixed(0)} h</p>
        </article>
        <article className="rounded-3xl border border-line/70 bg-paper/70 p-5">
          <p className="text-xs uppercase tracking-[0.26em] text-fog">median conductivity</p>
          <p className="display-face mt-3 text-4xl text-ink">{condMedian.toFixed(1)} mS/cm</p>
        </article>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.56fr_0.44fr]">
        <div className="rounded-[1.75rem] border border-line/70 bg-white/85 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-copper">fraction vs. response</p>
              <p className="display-face text-2xl text-ink">{metricMap[metric].label}</p>
            </div>
            <p className="text-sm text-fog">Each point is one formulation.</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                <XAxis type="number" dataKey="co_solvent_fraction_vol_pct" stroke="#6d7483" name="Fraction" unit="%" />
                <YAxis type="number" dataKey={metricKey} stroke="#6d7483" name={metricMap[metric].label} />
                <Tooltip cursor={{ strokeDasharray: '4 4' }} />
                <Scatter data={filtered} fill="#0f6e78" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-line/70 bg-white/85 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-copper">filtered formulations</p>
              <p className="display-face text-2xl text-ink">Rows with provenance</p>
            </div>
            <p className="text-sm text-fog">{metricValues.length} points</p>
          </div>
          <div className="mt-4 max-h-[24rem] overflow-auto">
            <table className="data-table text-sm">
              <thead>
                <tr className="text-fog">
                  <th>Formulation</th>
                  <th>Salt</th>
                  <th>Value</th>
                  <th>Provenance</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 9).map((row) => (
                  <tr key={row.formulation_id}>
                    <td>
                      <p className="font-semibold text-ink">{row.co_solvent_name}</p>
                      <p className="text-fog">{row.reference_key}</p>
                    </td>
                    <td>
                      <p className="text-ink">{row.salt_name}</p>
                      <p className="text-fog">{row.salt_molality} m</p>
                    </td>
                    <td className="text-ink">{Number(row[metricKey]).toFixed(metric === 'lifespan' ? 0 : 2)}</td>
                    <td>
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${statusTone(row.extraction_status)}`}>
                        {row.extraction_status.replaceAll('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
