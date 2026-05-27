"use client";

import { useDialKit } from "dialkit";

/**
 * Liquid letter — faithful port of https://liquid-letter.vercel.app/
 *
 * The metallic iridescence is a mix-blend-difference between two layers that
 * share one gradient (`--letter-gradient`) but slide it in opposite directions:
 *   • the container paints the gradient as its own background (the "backdrop"
 *     that difference blends against), sliding top→bottom over 4s;
 *   • a blurred copy of the gradient is masked to the glyph and slides
 *     bottom→top, so the two never line up and the colour keeps shifting.
 * Static hue-rotate / invert / contrast filters set the palette; a blurred
 * white stroke adds the highlight edge and an feTurbulence layer adds grain.
 * Every parameter below is exposed through the "Liquid letter" dial.
 */
const GRADIENT =
  "linear-gradient(to top, #fff 0%, #67aeff 20%, #144bff 40%, #203ed6 60%, #fff 100%)";

export default function LiquidLetter() {
  const v = useDialKit("Liquid letter", {
    letter: { type: "text", default: "yawp" },
    width: [300, 100, 1200, 10],
    height: [125, 80, 800, 10],
    BG: { type: "color", default: "#4a74f1" },
    Y_offset: [0, -200, 200, 1],
    fontSize: [75, 10, 400, 1],
    maskPad: [15, 0, 200, 1],
    fontWeight: [500, 100, 900, 100],
    borderRadius: [100, 0, 400, 1],
    hueRotate_01: [540, 0, 720, 1],
    hueRotate_02: [260, 0, 720, 1],
    noise: [0.2, 0, 1, 0.01],
    blur_01: [6, 0, 40, 0.1],
    blur_02: [2.1, 0, 40, 0.1],
    innerShadow: [15, 0, 100, 1],
    innerShadowSpread: [7.5, 0, 100, 1],
    innerShadowColor: { type: "color", default: "#f4ee43" },
  });

  const W = v.width;
  const H = v.height;
  const cx = W / 2;
  const cy = H / 2 + v.Y_offset;
  const pad = v.maskPad;
  const font = "var(--font-geist-sans), 'GeneralSans', system-ui, sans-serif";

  // shared region for the user-space filters/mask so the blur isn't clipped
  const region = { x: -pad, y: -pad, width: W + pad * 2, height: H + pad * 2 };

  const Glyph = (
    props: React.SVGProps<SVGTextElement> & { children?: React.ReactNode }
  ) => (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={font}
      fontSize={v.fontSize}
      fontWeight={v.fontWeight}
      {...props}
    >
      {v.letter}
    </text>
  );

  const fill = { position: "absolute" as const, inset: 0, width: "100%", height: "100%" };

  return (
    <div
      style={{
        width: W,
        height: H,
        borderRadius: v.borderRadius,
        background: v.BG,
        boxShadow: `${v.innerShadowColor} 0px 0px ${v.innerShadow}px ${v.innerShadowSpread}px inset`,
        filter: `hue-rotate(${v.hueRotate_01}deg) invert(1)`,
        backdropFilter: "blur(1px)",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* gradient-slide keyframes (counter-running) */}
      <style>{`
        @keyframes ll-grad-down { 0% { background-position: 50% -100%; } 100% { background-position: 50% 100%; } }
        @keyframes ll-grad-up   { 0% { background-position: 50% 100%; } 100% { background-position: 50% -100%; } }
      `}</style>

      <div
        style={{
          width: W,
          height: H,
          position: "relative",
          // the gradient backdrop that `difference` blends against
          background: GRADIENT,
          backgroundSize: "200% 200%",
          animation: "ll-grad-down 4s linear infinite",
          mixBlendMode: "difference",
          filter: `hue-rotate(${v.hueRotate_02}deg) contrast(1.2) saturate(1) invert(1)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* defs: blurred-glyph mask + grain filter */}
        <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="ll-mask-blur" filterUnits="userSpaceOnUse" {...region}>
              <feGaussianBlur stdDeviation={v.blur_01} />
            </filter>
            <filter id="ll-stroke-blur" filterUnits="userSpaceOnUse" {...region}>
              <feGaussianBlur stdDeviation={v.blur_02} />
            </filter>
            <filter id="ll-noise" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={2.7}
                numOctaves={3}
                seed={9}
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
              <feComponentTransfer in="mono">
                <feFuncA type="linear" slope={v.noise} />
              </feComponentTransfer>
            </filter>
            <mask
              id="ll-glyph"
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
              {...region}
            >
              <Glyph fill="#fff" filter="url(#ll-mask-blur)" />
            </mask>
          </defs>
        </svg>

        {/* liquid body: the same gradient, masked to the glyph, blurred soft,
            sliding the opposite direction to the backdrop */}
        <div
          style={{
            ...fill,
            zIndex: 2,
            background: GRADIENT,
            backgroundSize: "200% 200%",
            animation: "ll-grad-up 4s linear infinite",
            WebkitMaskImage: "url(#ll-glyph)",
            maskImage: "url(#ll-glyph)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            maskPosition: "50%",
            filter: "blur(40px)",
          }}
        />

        {/* inner rim light */}
        <div
          style={{
            ...fill,
            background: "rgba(73, 73, 235, 0.05)",
            boxShadow: "#ffffff 0px 0px 20px 2px inset",
          }}
        />

        {/* crisp highlight: blurred white stroke of the glyph */}
        <svg style={fill} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <Glyph
            fill="transparent"
            stroke="#fff"
            strokeWidth={3}
            filter="url(#ll-stroke-blur)"
          />
        </svg>

        {/* grain */}
        <svg style={fill} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <rect width="100%" height="100%" filter="url(#ll-noise)" />
        </svg>
      </div>
    </div>
  );
}
