export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#F3F3F3" }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-[320px] h-auto"
        aria-label="yawp psychedelic pill"
      >
        <source src="/video/yawp-psych-pill.webm" type="video/webm" />
        <source src="/video/yawp-psych-pill.mp4" type="video/mp4" />
      </video>
    </main>
  );
}
