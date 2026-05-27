import LiquidLetter from "@/components/liquid-letter";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#F3F3F3" }}
    >
      <div className="-translate-y-[25vh]">
        <LiquidLetter />
      </div>
      <p className="fixed left-1/2 top-[calc(25%+48px)] -translate-x-1/2 text-center text-[12px] text-muted-foreground">
        A surface to think on, a canvas to build from.
      </p>
      <p className="fixed left-1/2 top-[calc(50%+16px)] w-[300px] -translate-x-1/2 text-left text-[12px] leading-relaxed text-muted-foreground">
        yawp is an open source infinite canvas workspace for project
        brainstorming and ideation – gather inspiration, take notes, sketch, and
        think out loud. Build from what you made.
      </p>
    </main>
  );
}
