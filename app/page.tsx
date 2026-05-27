import LiquidLetter from "@/components/liquid-letter";
// Roadmap tabs are parked for now — re-add <Roadmap /> below the description
// to bring them back. Component lives in components/roadmap.tsx.
// import Roadmap from "@/components/roadmap";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-6 pt-[8vh]"
      style={{ background: "#F3F3F3" }}
    >
      <div className="flex w-[300px] flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <LiquidLetter />
          <p className="w-[130px] text-right text-[11px] text-muted-foreground">
            A surface to think on, a canvas to build from.
          </p>
        </div>
        <p className="mt-8 text-left text-[12px] leading-relaxed text-muted-foreground">
          yawp is an{" "}
          <a
            href="https://github.com/wwwwaaaaddddeeee/yawp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-foreground"
          >
            open source
          </a>{" "}
          infinite canvas workspace for project brainstorming and ideation –
          gather inspiration, take notes, sketch, and think out loud.
        </p>
      </div>
      <footer className="mt-auto py-4 text-[10px] text-muted-foreground">
        by @
        <a
          href="https://www.wa-de.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-foreground"
        >
          wa-de
        </a>
      </footer>
    </main>
  );
}
