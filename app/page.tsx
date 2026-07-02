import TopBar from "@/components/sheet/TopBar";
import Hero from "@/components/sheet/Hero";
import RevisionTable from "@/components/sheet/RevisionTable";
import DetailViews from "@/components/sheet/DetailViews";
import Materials from "@/components/sheet/Materials";
import Notes from "@/components/sheet/Notes";

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-14">
        <TopBar />
        <main>
          <Hero />
          <RevisionTable />
          <DetailViews />
          <Materials />
        </main>
        <Notes />
      </div>
    </>
  );
}
