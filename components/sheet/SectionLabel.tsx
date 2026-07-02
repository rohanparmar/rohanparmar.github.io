// Drawing-sheet section header: quiet mono label over a hairline.
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b border-hairline pb-4">
    <h2 className="font-mono text-xs tracking-label text-graphite">{children}</h2>
  </div>
);

export default SectionLabel;
