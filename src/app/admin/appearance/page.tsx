"use client";

import { useState, useEffect } from "react";
import { Check, Loader2, Save } from "lucide-react";
import LinkCard from "@/components/LinkCard";

export default function AppearancePage() {
  const [activeTheme, setActiveTheme] = useState<string>("default");
  const [buttonStyle, setButtonStyle] = useState<string>("glass");
  const [buttonShape, setButtonShape] = useState<string>("rounded-2xl");
  const [fontFamily, setFontFamily] = useState<string>("font-sans");
  const [hoverAnimation, setHoverAnimation] = useState<string>("lift");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/appearance")
      .then((r) => r.json())
      .then((data) => {
        if (data.theme) setActiveTheme(data.theme);
        if (data.buttonStyle) setButtonStyle(data.buttonStyle);
        if (data.buttonShape) setButtonShape(data.buttonShape);
        if (data.hoverEffect) setHoverAnimation(data.hoverEffect);
        if (data.fontFamily) setFontFamily(data.fontFamily);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/appearance", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme: activeTheme,
        buttonStyle,
        buttonShape,
        hoverEffect: hoverAnimation,
        fontFamily,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const previewBgMap: Record<string, string> = {
    default: "bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white",
    light: "bg-neutral-100 text-neutral-900 border border-neutral-200",
    midnight: "bg-slate-900 text-white",
    cyberpunk: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-cyan-500 text-neutral-900",
    emerald: "bg-[#093028] bg-gradient-to-t from-[#237A57] to-[#093028] text-white",
    minimal: "bg-white text-black border border-neutral-100",
  };

  const isLight = activeTheme === "light" || activeTheme === "cyberpunk" || activeTheme === "minimal";
  const previewTitleColor = isLight ? "text-neutral-900" : "text-white";
  const previewBioColor = isLight ? "text-neutral-600" : "text-neutral-300";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-neutral-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading appearance...
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-8 pb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Appearance</h1>
            <p className="text-sm text-neutral-500 mt-1">Customize every aspect of your OpenLink profile.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <Check size={16} />
            ) : (
              <Save size={16} />
            )}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        {/* Themes Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Background Themes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ThemeCard id="default" name="Default Dark" bgClass={previewBgMap.default} active={activeTheme === "default"} onClick={() => setActiveTheme("default")} />
            <ThemeCard id="light" name="Clean Light" bgClass={previewBgMap.light} active={activeTheme === "light"} onClick={() => setActiveTheme("light")} />
            <ThemeCard id="midnight" name="Midnight" bgClass={previewBgMap.midnight} active={activeTheme === "midnight"} onClick={() => setActiveTheme("midnight")} />
            <ThemeCard id="cyberpunk" name="Cyberpunk" bgClass={previewBgMap.cyberpunk} active={activeTheme === "cyberpunk"} onClick={() => setActiveTheme("cyberpunk")} />
            <ThemeCard id="emerald" name="Emerald" bgClass={previewBgMap.emerald} active={activeTheme === "emerald"} onClick={() => setActiveTheme("emerald")} />
            <ThemeCard id="minimal" name="Absolute Minimal" bgClass={previewBgMap.minimal} active={activeTheme === "minimal"} onClick={() => setActiveTheme("minimal")} />
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Typography</h2>
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
            <FontSelector name="Inter" fontClass="font-sans" active={fontFamily === "font-sans"} onClick={() => setFontFamily("font-sans")} />
            <FontSelector name="Grotesk" fontClass="font-[family-name:var(--font-space)]" active={fontFamily === "font-[family-name:var(--font-space)]"} onClick={() => setFontFamily("font-[family-name:var(--font-space)]")} />
            <FontSelector name="Playfair" fontClass="font-[family-name:var(--font-playfair)]" active={fontFamily === "font-[family-name:var(--font-playfair)]"} onClick={() => setFontFamily("font-[family-name:var(--font-playfair)]")} />
            <FontSelector name="Mono" fontClass="font-[family-name:var(--font-roboto-mono)]" active={fontFamily === "font-[family-name:var(--font-roboto-mono)]"} onClick={() => setFontFamily("font-[family-name:var(--font-roboto-mono)]")} />
          </div>
        </div>

        {/* Button Customizations */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Buttons</h2>
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-3">Styles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StyleSelector name="Glassmorphism" active={buttonStyle === "glass"} onClick={() => setButtonStyle("glass")}
                  preview={<div className={`h-10 w-full rounded-md ${isLight ? "bg-white/60 border border-neutral-200" : "bg-neutral-800/80 border border-neutral-600"}`}></div>} />
                <StyleSelector name="Solid Fill" active={buttonStyle === "filled"} onClick={() => setButtonStyle("filled")}
                  preview={<div className={`h-10 w-full rounded-md ${isLight ? "bg-neutral-900" : "bg-neutral-100"}`}></div>} />
                <StyleSelector name="Outline" active={buttonStyle === "outline"} onClick={() => setButtonStyle("outline")}
                  preview={<div className={`h-10 w-full rounded-md border-2 ${isLight ? "border-neutral-900" : "border-neutral-300"} bg-transparent`}></div>} />
                <StyleSelector name="Neubrutalism" active={buttonStyle === "hard-shadow"} onClick={() => setButtonStyle("hard-shadow")}
                  preview={<div className="h-10 w-full rounded-md bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_0px_rgba(23,23,23,1)]"></div>} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-3">Hover Effects</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <TextSelector name="Smooth Lift" active={hoverAnimation === "lift"} onClick={() => setHoverAnimation("lift")} />
                <TextSelector name="Wiggle" active={hoverAnimation === "wiggle"} onClick={() => setHoverAnimation("wiggle")} />
                <TextSelector name="Neon Glow" active={hoverAnimation === "glow"} onClick={() => setHoverAnimation("glow")} />
                <TextSelector name="None" active={hoverAnimation === "none"} onClick={() => setHoverAnimation("none")} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-3">Corner Radius</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <ShapeSelector name="Sharp" shape="rounded-md" active={buttonShape === "rounded-md"} onClick={() => setButtonShape("rounded-md")} />
                <ShapeSelector name="Soft" shape="rounded-2xl" active={buttonShape === "rounded-2xl"} onClick={() => setButtonShape("rounded-2xl")} />
                <ShapeSelector name="Pill" shape="rounded-full" active={buttonShape === "rounded-full"} onClick={() => setButtonShape("rounded-full")} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Mobile Live Preview */}
      <div className="hidden lg:block w-[340px] shrink-0">
        <div className="sticky top-24 flex justify-center">
          <div className={`w-[300px] h-[600px] border-[8px] border-neutral-900 rounded-[3rem] overflow-hidden shadow-2xl relative transition-colors duration-500 ${fontFamily}`}>
            <div className="absolute top-0 inset-x-0 h-6 bg-neutral-900 rounded-b-3xl w-32 mx-auto z-20"></div>
            <div className={`absolute inset-0 overflow-y-auto no-scrollbar pt-14 px-4 pb-8 transition-colors duration-500 ${previewBgMap[activeTheme]}`}>
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`w-20 h-20 rounded-full ${activeTheme === "minimal" ? "border-2 border-black" : "bg-gradient-to-tr from-pink-500 to-orange-400 p-1"}`}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=OpenLink" className="w-full h-full rounded-full bg-white object-cover" />
                </div>
                <div>
                  <h1 className={`text-lg font-bold tracking-tight ${previewTitleColor}`}>My Profile</h1>
                  <p className={`text-xs mt-1 max-w-[220px] mx-auto ${previewBioColor}`}>My links, all in one place.</p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3 mt-8 pb-6">
                <LinkCard title="My Website" url="#" iconName="globe" variant="list" theme={activeTheme} buttonStyle={buttonStyle} buttonShape={buttonShape} hoverEffect={hoverAnimation} delay={0} />
                <LinkCard title="GitHub" url="#" iconName="github" variant="list" theme={activeTheme} buttonStyle={buttonStyle} buttonShape={buttonShape} hoverEffect={hoverAnimation} delay={0.1} />
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <LinkCard title="Twitter" url="#" iconName="twitter" variant="bento" theme={activeTheme} buttonStyle={buttonStyle} buttonShape={buttonShape} hoverEffect={hoverAnimation} delay={0.2} />
                  <LinkCard title="YouTube" url="#" iconName="youtube" variant="bento" theme={activeTheme} buttonStyle={buttonStyle} buttonShape={buttonShape} hoverEffect={hoverAnimation} delay={0.3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeCard({ id, name, bgClass, active, onClick }: { id: string; name: string; bgClass: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group text-neutral-900 w-full outline-none">
      <div className={`w-full aspect-square md:aspect-[4/3] rounded-xl relative overflow-hidden ring-offset-2 transition-all ${active ? "ring-2 ring-indigo-600" : "group-hover:ring-2 group-hover:ring-neutral-300"} ${bgClass}`}>
        {active && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg z-10">
            <Check size={14} strokeWidth={3} />
          </div>
        )}
      </div>
      <span className="text-sm font-medium pt-1 text-center">{name}</span>
    </button>
  );
}

function FontSelector({ name, fontClass, active, onClick }: { name: string; fontClass: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`p-4 rounded-xl border-2 transition-all outline-none flex items-center justify-center ${active ? "border-indigo-600 bg-indigo-50/50 text-indigo-900" : "border-neutral-100 hover:border-neutral-200 bg-neutral-50 text-neutral-700"}`}>
      <span className={`text-lg font-bold ${fontClass}`}>{name}</span>
    </button>
  );
}

function StyleSelector({ name, active, onClick, preview }: { name: string; active: boolean; onClick: () => void; preview: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`p-4 rounded-xl border-2 text-left transition-all outline-none ${active ? "border-indigo-600 bg-indigo-50/50" : "border-neutral-100 hover:border-neutral-200 bg-neutral-50"}`}>
      <div className="mb-4">{preview}</div>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold ${active ? "text-indigo-900" : "text-neutral-700"}`}>{name}</span>
        {active && <Check size={16} className="text-indigo-600" />}
      </div>
    </button>
  );
}

function ShapeSelector({ name, shape, active, onClick }: { name: string; shape: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all outline-none flex items-center justify-between ${active ? "border-indigo-600 bg-indigo-50/50 text-indigo-900" : "border-neutral-100 hover:border-neutral-200 bg-neutral-50 text-neutral-700"}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 bg-neutral-300/50 border border-neutral-400/30 ${shape}`}></div>
        <span className="text-sm font-semibold">{name}</span>
      </div>
    </button>
  );
}

function TextSelector({ name, active, onClick }: { name: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`py-3 px-2 rounded-xl border-2 transition-all outline-none text-center ${active ? "border-indigo-600 bg-indigo-50/50 text-indigo-900" : "border-neutral-100 hover:border-neutral-200 bg-neutral-50 text-neutral-700"}`}>
      <span className="text-sm font-semibold">{name}</span>
    </button>
  );
}
