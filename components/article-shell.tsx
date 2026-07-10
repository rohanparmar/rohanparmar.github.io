import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface ArticleShellProps {
  eyebrow: string;
  title: string;
  deck: string;
  meta: string;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
}

export function ArticleShell({
  eyebrow,
  title,
  deck,
  meta,
  backHref = "/",
  backLabel = "Back home",
  children,
}: ArticleShellProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-[72rem] px-5 pb-24 sm:px-8 lg:px-10">
        <article>
          <header className="border-t border-rule pb-16 pt-6 sm:pb-24">
            <div className="grid gap-10 lg:grid-cols-[8rem_minmax(0,46rem)] lg:gap-8">
              <p className="eyebrow">{eyebrow}</p>
              <div>
                <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-balance">
                  {title}
                </h1>
                <p className="mt-7 max-w-[55ch] text-[20px] leading-[1.45] text-muted sm:text-[23px]">
                  {deck}
                </p>
                <p className="mt-7 font-sans text-[12px] uppercase tracking-[0.12em] text-muted">
                  {meta}
                </p>
              </div>
            </div>
          </header>

          <div className="article-grid">{children}</div>

          <div className="mt-20 border-t border-rule pt-6 font-sans text-[14px]">
            <Link href={backHref}>← {backLabel}</Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
