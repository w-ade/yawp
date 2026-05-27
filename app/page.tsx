import LiquidLetter from "@/components/liquid-letter";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-6 pt-[calc(25vh-31px)]"
      style={{ background: "#F3F3F3" }}
    >
      <div className="flex w-[300px] flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <LiquidLetter />
          <p className="w-[130px] text-right text-[11px] text-muted-foreground">
            A surface to think on, a canvas to build from.
          </p>
        </div>
        <p className="mt-[calc(25vh-48px)] text-left text-[12px] leading-relaxed text-muted-foreground">
          yawp is an open source infinite canvas workspace for project
          brainstorming and ideation – gather inspiration, take notes, sketch,
          and think out loud. Build from what you made.
        </p>
      </div>
    </main>
  );
}
