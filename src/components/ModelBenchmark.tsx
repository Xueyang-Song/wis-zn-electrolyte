type Props = {
  modelBenchmarks: Record<string, Array<{ model: string; cv_r2: number; lopo_r2: number; p_value: number; note: string }>>;
};

export function ModelBenchmark({ modelBenchmarks }: Props) {
  const highlights = modelBenchmarks.lifespan.slice(0, 2).concat(modelBenchmarks.conductivity.slice(0, 1));
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map((item) => (
        <article key={`${item.model}-${item.note}`} className="rounded-3xl border border-line/70 bg-shell p-5">
          <p className="text-xs uppercase tracking-[0.26em] text-copper">{item.model}</p>
          <p className="display-face mt-3 text-3xl text-ink">R² {item.cv_r2.toFixed(2)}</p>
          <p className="mt-4 text-fog">{item.note}</p>
        </article>
      ))}
    </div>
  );
}
