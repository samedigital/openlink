"use client";

import { useState, useEffect } from "react";
import { Plus, GripVertical, Trash2, LayoutGrid, List, Loader2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LinkCard from "@/components/LinkCard";

type LinkItem = {
  id: string;
  title: string | null;
  url: string | null;
  iconName: string | null;
  variant: string;
};

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetch("/api/links")
      .then((r) => r.json())
      .then((data) => {
        setLinks(data);
        setLoading(false);
      });
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((i) => i.id === active.id);
    const newIndex = links.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex);
    setLinks(reordered);

    await fetch("/api/links/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((l) => l.id) }),
    });
  };

  const addLink = async (variant: string) => {
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "", url: "", iconName: "default", variant }),
    });
    const newLink = await res.json();
    setLinks((prev) => [newLink, ...prev]);
  };

  const removeLink = async (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/links/${id}`, { method: "DELETE" });
  };

  const updateLink = async (id: string, field: string, value: string) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
    await fetch(`/api/links/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
  };

  return (
    <div className="animate-in fade-in duration-500 flex flex-col lg:flex-row gap-8">
      {/* Left side: Links Editor */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Manage Links</h1>
          <p className="text-sm text-neutral-500 mt-1">Add, edit, and reorder your links.</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => addLink("list")}
            className="flex-1 py-4 border-2 border-dashed border-indigo-200 rounded-xl bg-indigo-50 hover:bg-indigo-100/50 text-indigo-600 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={20} />
            Add Link
          </button>
          <button
            onClick={() => addLink("bento_parent")}
            className="flex-1 py-4 border-2 border-dashed border-purple-200 rounded-xl bg-purple-50 hover:bg-purple-100/50 text-purple-600 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={20} />
            Add Bento Grid
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-neutral-400">
            <Loader2 className="animate-spin mr-2" size={20} />
            Loading links...
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="space-y-4 pt-2">
              <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                {links.map((link) => (
                  <SortableLinkItem
                    key={link.id}
                    link={link}
                    onRemove={() => removeLink(link.id)}
                    onUpdate={(f, v) => updateLink(link.id, f, v)}
                  />
                ))}
              </SortableContext>
              {links.length === 0 && (
                <div className="text-center py-12 text-neutral-400 border-2 border-dashed border-neutral-200 rounded-xl">
                  No links yet. Add your first one above!
                </div>
              )}
            </div>
          </DndContext>
        )}
      </div>

      {/* Right side: Mobile Live Preview */}
      <div className="hidden lg:block w-[340px] shrink-0">
        <div className="sticky top-24 flex justify-center">
          <div className="w-[300px] h-[600px] border-[8px] border-neutral-900 rounded-[3rem] overflow-hidden shadow-2xl relative bg-gradient-to-br from-indigo-950 via-purple-900 to-black">
            <div className="absolute top-0 inset-x-0 h-6 bg-neutral-900 rounded-b-3xl w-32 mx-auto z-20"></div>
            <div className="absolute inset-0 overflow-y-auto no-scrollbar pt-14 px-4 pb-8">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 p-1">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=OpenLink" className="w-full h-full rounded-full bg-white object-cover" />
                </div>
                <h1 className="text-lg font-bold tracking-tight text-white">My Profile</h1>
              </div>

              <div className="w-full flex flex-col gap-3 mt-6 pb-6">
                {links.filter((l) => l.variant !== "bento_parent").map((link) =>
                  link.title || link.url ? (
                    <LinkCard
                      key={link.id}
                      title={link.title || "Untitled Link"}
                      url={link.url || "#"}
                      iconName={link.iconName as any}
                      variant={link.variant as any}
                    />
                  ) : null
                )}

                {links.some((l) => l.variant === "bento_parent") && (
                  <div className="w-full mt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <LinkCard title="Twitter" url="#" iconName="twitter" variant="bento" />
                      <LinkCard title="YouTube" url="#" iconName="youtube" variant="bento" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortableLinkItem({
  link,
  onRemove,
  onUpdate,
}: {
  link: LinkItem;
  onRemove: () => void;
  onUpdate: (f: string, v: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const isBento = link.variant === "bento_parent";

  return (
    <div ref={setNodeRef} style={style} className="bg-white border text-neutral-900 border-neutral-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <button {...attributes} {...listeners} className="mt-1 text-neutral-400 hover:text-neutral-600 cursor-grab active:cursor-grabbing outline-none">
          <GripVertical size={20} />
        </button>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isBento ? (
                <LayoutGrid size={18} className="text-indigo-600" />
              ) : (
                <List size={18} className="text-emerald-600" />
              )}
              <span className="font-semibold text-sm">{isBento ? "Bento Grid" : "Link"}</span>
            </div>
            <button
              onClick={onRemove}
              className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {isBento ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-xs text-neutral-500 font-medium">Twitter</div>
              <div className="h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-xs text-neutral-500 font-medium">YouTube</div>
              <button className="h-12 border-2 border-dashed border-neutral-200 hover:bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-400 transition-colors">
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={link.title ?? ""}
                onChange={(e) => onUpdate("title", e.target.value)}
                className="w-full text-sm font-medium border-none p-0 focus:ring-0 placeholder-neutral-400 outline-none"
                placeholder="Title"
              />
              <input
                type="text"
                value={link.url ?? ""}
                onChange={(e) => onUpdate("url", e.target.value)}
                className="w-full text-sm text-neutral-500 border-none p-0 focus:ring-0 placeholder-neutral-400 outline-none"
                placeholder="https://"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
