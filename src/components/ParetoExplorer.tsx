import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
  paretoCandidates: Array<{
    name: string;
    predicted_lifespan_h: number;
    predicted_conductivity_mS_cm: number;
    bp_c: number;
    dn: number;
    in_dataset: boolean;
    status: string;
    note: string;
  }>;
};

export function ParetoExplorer({ paretoCandidates }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-line/70 bg-white/85 p-4">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.26em] text-copper">nsga-ii style view</p>
          <p className="display-face text-2xl text-ink">Candidate solvent frontier</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <XAxis type="number" dataKey="predicted_conductivity_mS_cm" name="Conductivity" unit=" mS/cm" stroke="#6d7483" />
              <YAxis type="number" dataKey="predicted_lifespan_h" name="Lifespan" unit=" h" stroke="#6d7483" />
              <Tooltip cursor={{ strokeDasharray: '4 4' }} />
              <Scatter data={paretoCandidates} fill="#0f6e78" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {paretoCandidates.slice(0, 4).map((candidate) => (
          <article key={candidate.name} className="rounded-[1.75rem] border border-line/70 bg-shell p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-copper">{candidate.status}</p>
                <h3 className="display-face mt-2 text-3xl text-ink">{candidate.name}</h3>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs ${candidate.in_dataset ? 'border-teal/20 bg-teal/10 text-teal' : 'border-copper/20 bg-copper/10 text-copper'}`}>
                {candidate.in_dataset ? 'in dataset' : 'extrapolative'}
              </span>
            </div>
            <p className="mt-4 text-fog">{candidate.note}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-line/70 bg-white/80 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-fog">lifespan</p>
                <p className="display-face mt-2 text-2xl text-ink">{candidate.predicted_lifespan_h} h</p>
              </div>
              <div className="rounded-2xl border border-line/70 bg-white/80 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-fog">conductivity</p>
                <p className="display-face mt-2 text-2xl text-ink">{candidate.predicted_conductivity_mS_cm} mS/cm</p>
              </div>
              <div className="rounded-2xl border border-line/70 bg-white/80 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-fog">boiling point</p>
                <p className="display-face mt-2 text-2xl text-ink">{candidate.bp_c} °C</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
