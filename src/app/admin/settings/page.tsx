"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Check } from "lucide-react";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setEmail(data.email ?? "");
        setUsername(data.username ?? "");
        setMetaTitle(data.metaTitle ?? "");
        setMetaDesc(data.metaDesc ?? "");
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, metaTitle, metaDesc }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-neutral-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading settings...
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Settings</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your account and profile preferences.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-neutral-900">Account Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border border-neutral-200 bg-neutral-50 text-neutral-500 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <p className="text-xs text-neutral-500 mt-1">Managed via Supabase Auth.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Username / URL</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                yoursite.com/
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 border border-neutral-200 rounded-r-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-neutral-900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-neutral-900">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Custom Page Title"
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Meta Description</label>
            <textarea
              rows={2}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              placeholder="Description for search engines"
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-neutral-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
