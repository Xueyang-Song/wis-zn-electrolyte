export function formatCompact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  if (value >= 100) {
    return `${Math.round(value)}`;
  }
  return `${value.toFixed(1)}`;
}

export function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) {
    return 0;
  }
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function statusTone(status: string) {
  if (status.includes('direct')) {
    return 'bg-teal/10 text-teal border-teal/20';
  }
  if (status.includes('digitized')) {
    return 'bg-copper/10 text-copper border-copper/20';
  }
  return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
}
