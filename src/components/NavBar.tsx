type Props = {
  activeId: string;
  sections: Array<{ id: string; label: string }>;
  onReferences: () => void;
};

export function NavBar({ activeId, sections, onReferences }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-teal">wis zinc atlas</p>
          <p className="display-face text-lg text-ink">ICEMEE 2026 Microsite</p>
        </div>
        <nav className="hidden items-center gap-2 rounded-full border border-line/70 bg-white/80 px-2 py-1 lg:flex">
          {sections.map((section) => {
            const active = section.id === activeId;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  active ? 'bg-ink text-white' : 'text-fog hover:bg-paper hover:text-ink'
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={onReferences}
          className="rounded-full border border-copper/30 px-4 py-2 text-sm font-semibold text-copper transition hover:bg-copper hover:text-white"
        >
          References
        </button>
      </div>
    </header>
  );
}
