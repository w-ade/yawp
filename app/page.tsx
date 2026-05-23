import Image from "next/image";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/gradientor_2026_5_23_5_57_30.png')",
      }}
    >
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
