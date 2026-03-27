import { ExternalLink, Users, MousePointerClick, TrendingUp } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Welcome back! Here's an overview of your profile performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Views" value="24.5k" trend="+12%" icon={<Users className="w-5 h-5 text-indigo-600" />} />
        <StatCard title="Link Clicks" value="1,204" trend="+5.4%" icon={<MousePointerClick className="w-5 h-5 text-emerald-600" />} />
        <StatCard title="CTR" value="4.91%" trend="+1.2%" icon={<TrendingUp className="w-5 h-5 text-blue-600" />} />
        <StatCard title="Active Links" value="12" icon={<ExternalLink className="w-5 h-5 text-pink-600" />} />
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Activity Overview</h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-100 rounded-lg text-neutral-400 bg-neutral-50 font-medium">
          [ Chart Placeholder - Will implement with Recharts ]
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon }: { title: string; value: string; trend?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-neutral-500">{title}</span>
        <div className="p-2 bg-neutral-50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-neutral-900">{value}</span>
        {trend && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>}
      </div>
    </div>
  );
}
