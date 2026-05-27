"use client";

import { TreeView, type TreeNode } from "@/components/ui/tree-view";

const treeData: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      {
        id: "1-1",
        label: "Projects",
        children: [
          { id: "1-1-1", label: "Project A.pdf" },
          { id: "1-1-2", label: "Project B.docx" },
          {
            id: "1-1-3",
            label: "Archive",
            children: [
              { id: "1-1-3-1", label: "Old Project.zip" },
              { id: "1-1-3-2", label: "Backup.tar" },
            ],
          },
        ],
      },
      {
        id: "1-2",
        label: "Reports",
        children: [
          { id: "1-2-1", label: "Monthly Report.xlsx" },
          { id: "1-2-2", label: "Annual Report.pdf" },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Downloads",
    children: [
      { id: "2-1", label: "setup.exe" },
      { id: "2-2", label: "image.jpg" },
      { id: "2-3", label: "video.mp4" },
    ],
  },
  {
    id: "3",
    label: "Desktop",
    children: [{ id: "3-1", label: "shortcut.lnk" }],
  },
];

export default function TreePage() {
  return (
    <main className="min-h-svh bg-background py-16 px-6">
      <div className="max-w-xl mx-auto w-full">
        <TreeView
          data={treeData}
          onNodeClick={(node) => console.log("Clicked:", node.label)}
          defaultExpandedIds={["1"]}
        />
      </div>
    </main>
  );
}
