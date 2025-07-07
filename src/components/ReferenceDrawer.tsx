import type { ReferenceEntry } from '../types';

type Props = {
  open: boolean;
  onClose: () => void;
  references: ReferenceEntry[];
};

export function ReferenceDrawer({ open, onClose, references }: Props) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/30 transition ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-full max-w-2xl border-l border-line/70 bg-shell shadow-archive transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line/70 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-teal">paper references</p>
            <h2 className="display-face mt-2 text-3xl text-ink">Annotated bibliography</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line px-4 py-2 text-sm text-fog transition hover:text-ink"
          >
            Close
          </button>
        </div>
        <div className="h-[calc(100%-6rem)] overflow-auto px-6 py-6">
          <div className="rounded-[1.5rem] border border-line/70 bg-white/80 p-5">
            <p className="text-sm leading-7 text-fog">
              The site uses the paper reference list for narrative context and keeps the row-level data provenance in the explorer itself. The goal is to make the dataset legible without forcing readers to leave the page.
            </p>
          </div>
          <ol className="mt-6 space-y-4">
            {references.map((reference) => (
              <li key={reference.key} className="rounded-[1.5rem] border border-line/70 bg-white/85 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-copper">{reference.key}</p>
                <p className="mt-3 text-base leading-7 text-ink">{reference.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </>
  );
}
