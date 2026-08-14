interface SwatchGroupProps {
  title: string;
  items: ReadonlyArray<{ name: string; hex: string; textClass: string }>;
}

export const SwatchGroup = ({ title, items }: SwatchGroupProps) => {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <h3 className="text-2xl font-serif italic">{title}</h3>
        <p className="text-xs uppercase tracking-[0.18em] text-olive/40">Use sparingly and with warmth</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-4xl border border-olive/10 bg-white shadow-sm">

            <div
              className={`flex h-28 items-end p-4 ${item.textClass}`}
              style={{ backgroundColor: item.hex }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">{item.name}</span>
            </div>
            <div className="space-y-1 p-4">
              <p className="font-serif text-xl">{item.name}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-olive/45">{item.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
};
