"use client";

import { useEffect, useState } from "react";
import { animate } from "motion";
import { useDialKit } from "dialkit";

/**
 * Liquid letter — recreation of https://liquid-letter.vercel.app/
 *
 * Technique (not a gooey SVG filter): the glyph is used as a CSS mask over an
 * iridescent gradient, blurred into a liquid body, then CSS hue-rotate / invert /
 * contrast / mix-blend-difference produce the metallic colour. A blurred white
 * stroke of the same glyph adds the highlight edge; a turbulence layer adds grain.
 * Every parameter below is exposed through the "Liquid letter" dial.
 */
export default function LiquidLetter() {
  const v = useDialKit("Liquid letter", {
    letter: { type: "text", default: "yawp" },
    width: [500, 100, 1200, 10],
    height: [240, 80, 800, 10],
    BG: { type: "color", default: "#4a74f1" },
    Y_offset: [0, -200, 200, 1],
    fontSize: [150, 10, 400, 1],
    maskPad: [30, 0, 200, 1],
    fontWeight: [500, 100, 900, 100],
    borderRadius: [200, 0, 400, 1],
    hueRotate_01: [540, 0, 720, 1],
    hueRotate_02: [260, 0, 720, 1],
    noise: [0.2, 0, 1, 0.01],
    blur_01: [12, 0, 40, 0.1],
    blur_02: [4.2, 0, 40, 0.1],
    innerShadow: [30, 0, 100, 1],
    innerShadowSpread: [15, 0, 100, 1],
    innerShadowColor: { type: "color", default: "#f4ee43" },
  });

  // Psychedelic hue cycle — sweeps the whole colour wheel over ~9s, added on
  // top of the dial's base hue-rotate values (blue → pink → green rim → …).
  const [hueShift, setHueShift] = useState(0);
  useEffect(() => {
    const controls = animate(0, 360, {
      duration: 9,
      repeat: Infinity,
      ease: "linear",
      onUpdate: setHueShift,
    });
    return () => controls.stop();
  }, []);

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
        filter: `hue-rotate(${v.hueRotate_01 + hueShift}deg) invert(1)`,
        backdropFilter: "blur(1px)",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          position: "relative",
          mixBlendMode: "difference",
          filter: `hue-rotate(${v.hueRotate_02 + hueShift}deg) contrast(1.2) saturate(1) invert(1)`,
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
                baseFrequency={0.9}
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

        {/* liquid body: iridescent gradient masked to the glyph, then blurred soft */}
        <div
          style={{
            ...fill,
            background:
              "linear-gradient(to top, #ffffff 0%, #67aeff 20%, #144bff 40%, #203ed6 60%, #ffffff 100%)",
            WebkitMaskImage: "url(#ll-glyph)",
            maskImage: "url(#ll-glyph)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            filter: "blur(40px)",
          }}
        />

        {/* inner rim light */}
        <div
          style={{
            ...fill,
            borderRadius: v.borderRadius,
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
