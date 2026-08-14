interface GuidanceListProps {
  title: string;
  items: string[];
}

export const GuidanceList = ({ title, items }: GuidanceListProps) => {
  return (
    <section className="space-y-4">
      <h3 className="text-3xl font-serif italic">{title}</h3>
      <div className="lined-paper hand-drawn-border p-8">
        <ul className="space-y-4 text-lg text-olive/80">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-terracotta" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
};
