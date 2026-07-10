import Link from "next/link";

const navigation = [
  { label: "Journey", href: "/#journey" },
  { label: "Publications", href: "/#publications" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-[41rem] justify-end px-6 py-7 text-[15px]">
      <nav aria-label="Primary navigation">
        <ul className="flex flex-wrap justify-end gap-x-5 gap-y-1 text-muted">
          {navigation.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
