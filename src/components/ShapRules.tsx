type Props = {
  shapSummary: Record<string, Array<{ feature: string; importance: number }>>;
};

export function ShapRules({ shapSummary }: Props) {
  const items = shapSummary.lifespan.slice(0, 4);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.feature} className="rounded-3xl border border-line/70 bg-shell p-5">
          <p className="text-xs uppercase tracking-[0.26em] text-copper">{item.feature}</p>
          <p className="display-face mt-3 text-3xl text-ink">{item.importance.toFixed(2)}</p>
        </article>
      ))}
    </div>
  );
}
