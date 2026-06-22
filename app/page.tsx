export default function Home() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6"
      style={{ background: "#F3F3F3" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/yawp.svg"
        alt="yawp"
        className="h-auto w-[360px] max-w-[80vw]"
      />
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
