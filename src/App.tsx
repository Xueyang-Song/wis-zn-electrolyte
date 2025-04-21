import { useState } from 'react';
import seedData from './data/generated/siteData.json';

export default function App() {
  const [solvent, setSolvent] = useState('All');
  const [salt, setSalt] = useState('All');
  const solvents = ['All', ...new Set(seedData.formulations.map((row) => row.co_solvent_name))];
  const salts = ['All', ...new Set(seedData.formulations.map((row) => row.salt_name))];
  const rows = seedData.formulations.filter((row) => {
    const okSolvent = solvent === 'All' || row.co_solvent_name === solvent;
    const okSalt = salt === 'All' || row.salt_name === salt;
    return okSolvent && okSalt;
  });

  return (
    <main className="min-h-screen px-5 py-8 md:px-10">
      <section className="mx-auto max-w-6xl rounded-[2rem] shell-card px-8 py-10 md:px-12">
        <p className="text-xs uppercase tracking-[0.35em] text-copper">rough filterable explorer</p>
        <h1 className="display-face mt-4 text-4xl font-semibold leading-tight text-ink md:text-6xl">
          Turning the paper notes into a solvent explorer
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-fog">
          This is still the rough app, but it now reads the generated JSON, filters the rows, and starts to feel more like an actual knowledge site.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="rounded-3xl border border-line/70 bg-white/75 p-4">
            <span className="text-xs uppercase tracking-[0.26em] text-fog">co-solvent</span>
            <select className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3" value={solvent} onChange={(event) => setSolvent(event.target.value)}>
              {solvents.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="rounded-3xl border border-line/70 bg-white/75 p-4">
            <span className="text-xs uppercase tracking-[0.26em] text-fog">salt</span>
            <select className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3" value={salt} onChange={(event) => setSalt(event.target.value)}>
              {salts.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-line/70 bg-white/80">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-paper/70 text-left text-fog">
              <tr>
                <th className="px-4 py-3">Solvent</th>
                <th className="px-4 py-3">Salt</th>
                <th className="px-4 py-3">Life (h)</th>
                <th className="px-4 py-3">Cond. (mS/cm)</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 8).map((row) => (
                <tr key={row.formulation_id} className="border-t border-line/60">
                  <td className="px-4 py-3">{row.co_solvent_name}</td>
                  <td className="px-4 py-3">{row.salt_name}</td>
                  <td className="px-4 py-3">{row.lifespan_h}</td>
                  <td className="px-4 py-3">{row.ionic_conductivity_mS_cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
