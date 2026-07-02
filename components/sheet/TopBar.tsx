import { siteMeta } from "@/constants/site";

const links = [
  { href: "#work", label: "WORK" },
  { href: "#builds", label: "BUILDS" },
  { href: "#materials", label: "MATERIALS" },
  { href: "#notes", label: "CONTACT" },
];

const TopBar = () => (
  <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-hairline pb-5 pt-8 sm:pt-10">
    <a href="#top" className="font-mono text-xs tracking-label text-ink">
      <span className="text-cobalt">{siteMeta.drawingNo}</span>
      <span className="mx-2 text-hairline">/</span>
      {siteMeta.name.toUpperCase()}
    </a>
    <nav className="flex gap-5 sm:gap-7">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="font-mono text-[11px] tracking-label text-graphite transition-colors hover:text-cobalt"
        >
          {link.label}
        </a>
      ))}
    </nav>
  </header>
);

export default TopBar;
