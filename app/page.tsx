import YawpBar from "./YawpBar";

export default function Home() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6"
      style={{ background: "var(--page)" }}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/yawp.svg"
        alt="yawp"
        className="wordmark-light h-auto w-[360px] max-w-[80vw]"
      />
      <img
        src="/yawpE9E9E9.svg"
        alt="yawp"
        className="wordmark-dark h-auto w-[360px] max-w-[80vw]"
      />
      {/* eslint-enable @next/next/no-img-element */}
      <YawpBar />
      <footer className="absolute bottom-0 py-4 text-[10px] text-muted-foreground">
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
