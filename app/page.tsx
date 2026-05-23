import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F1F1F0] flex items-center justify-center px-6">
      <Image
        src="/yawp.svg"
        alt="yawp"
        width={2000}
        height={800}
        priority
        className="w-full max-w-[90vw] h-auto"
      />
    </main>
  );
}
