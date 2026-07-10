import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto min-h-[60vh] max-w-[72rem] px-5 pb-24 pt-20 sm:px-8 lg:px-10"
      >
        <p className="eyebrow">404 · Not found</p>
        <h1 className="mt-6 max-w-[10ch] text-[clamp(3.5rem,10vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em]">
          This path goes nowhere.
        </h1>
        <Link
          className="mt-10 inline-flex min-h-11 items-center font-sans text-[14px] text-accent"
          href="/"
        >
          Return home →
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
