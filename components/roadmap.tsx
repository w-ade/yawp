"use client";

import { useState } from "react";
import {
  TabsSubtle,
  TabsSubtleItem,
  TabsSubtlePanel,
} from "@/components/ui/tabs-subtle";

type Phase = "now" | "next" | "later" | "exploring";

const ROADMAP: {
  label: string;
  note: string;
  state: Phase;
  items: { name: string; sub?: string }[];
}[] = [
  {
    label: "Currently",
    note: "working toward v0.1",
    state: "now",
    items: [
      {
        name: "The infinite canvas",
        sub: "tiles you arrange however your head works",
      },
      { name: "Terminal tiles", sub: "agents in the corner, not the spotlight" },
      {
        name: "Notes that live in your vault",
        sub: "reads and writes your real files",
      },
      {
        name: "Your canvas, saved to your files",
        sub: "close it and your work is still just files on disk",
      },
    ],
  },
  {
    label: "Next",
    note: "to finish v0.1",
    state: "next",
    items: [
      { name: "Image & link tiles" },
      { name: "Bucko, properly drawn", sub: "the resident agent gets a face" },
      { name: "The design pass", sub: "make it look like yawp, not a dev tool" },
    ],
  },
  {
    label: "Later",
    note: "after v0.1 ships",
    state: "later",
    items: [
      {
        name: "Mobile workspace view",
        sub: "read and triage on the go — not the full canvas",
      },
      { name: "Sync across devices" },
      { name: "More tile types" },
    ],
  },
  {
    label: "Exploring",
    note: "Ideas",
    state: "exploring",
    items: [
      { name: "Browser tiles" },
      { name: "Agents that suggest, not just respond" },
      { name: "Richer file rendering" },
    ],
  },
];

export default function Roadmap() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="mt-10 w-full text-left">
      <TabsSubtle
        selectedIndex={selected}
        onSelect={setSelected}
        idPrefix="roadmap"
        className="-mx-3"
      >
        {ROADMAP.map((phase, i) => (
          <TabsSubtleItem
            key={phase.label}
            label={phase.label}
            index={i}
            className="px-2.5 py-1"
          />
        ))}
      </TabsSubtle>

      {ROADMAP.map((phase, i) => (
        <TabsSubtlePanel
          key={phase.label}
          index={i}
          selectedIndex={selected}
          idPrefix="roadmap"
          className="mt-5"
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.06em] text-muted-foreground/60">
            {phase.note}
          </p>
          <ul className="space-y-2.5">
            {phase.items.map((item) => (
              <li key={item.name}>
                <span className="text-[12px] text-[#34C759]">{item.name}</span>
                {item.sub && (
                  <span className="block text-[11px] leading-snug text-muted-foreground">
                    {item.sub}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </TabsSubtlePanel>
      ))}
    </div>
  );
}
