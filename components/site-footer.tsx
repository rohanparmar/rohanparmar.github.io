import { siteMeta } from "@/constants/site";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="mx-auto flex max-w-[41rem] flex-wrap gap-x-7 gap-y-2 border-t border-rule px-6 py-8 text-[15px]"
    >
      <a href={`mailto:${siteMeta.email}`}>Email</a>
      <a href={siteMeta.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={siteMeta.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
    </footer>
  );
}
