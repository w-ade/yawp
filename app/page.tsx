import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F1F1F0] flex flex-col items-center justify-center gap-8 px-6">
      <Image
        src="/yawp.svg"
        alt="yawp"
        width={2000}
        height={800}
        priority
        className="w-full max-w-[90vw] h-auto"
      />
      <p
        className="text-sm text-[#0156FC] tracking-tight"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", system-ui, sans-serif',
        }}
      >
        A thinking surface.
      </p>
    </main>
  );
}
