import LinkCard from "@/components/LinkCard";
import { prisma } from "@/lib/prisma";

type BlockRow = {
  id: string;
  variant: string;
  url: string | null;
  title: string | null;
  iconName: string | null;
};

const previewBgMap: Record<string, string> = {
  default: "bg-gradient-to-br from-indigo-950 via-purple-900 to-black",
  light: "bg-neutral-100",
  midnight: "bg-slate-900",
  cyberpunk: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-cyan-500",
  emerald: "bg-gradient-to-t from-[#237A57] to-[#093028]",
  minimal: "bg-white",
};

const textColorMap: Record<string, string> = {
  default: "text-white",
  light: "text-neutral-900",
  midnight: "text-white",
  cyberpunk: "text-neutral-900",
  emerald: "text-white",
  minimal: "text-black",
};

const bioColorMap: Record<string, string> = {
  default: "text-purple-200",
  light: "text-neutral-600",
  midnight: "text-neutral-300",
  cyberpunk: "text-neutral-700",
  emerald: "text-emerald-200",
  minimal: "text-neutral-500",
};

export default async function Home() {
  // Get the first (and only) user for this deployment
  const user = await prisma.user.findFirst({
    include: {
      blocks: {
        where: { isEnabled: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to OpenLink</h1>
          <p className="text-purple-300 mb-6">Sign in to set up your profile.</p>
          <a
            href="/login"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </a>
        </div>
      </main>
    );
  }

  const bg = previewBgMap[user.theme] ?? previewBgMap.default;
  const textColor = textColorMap[user.theme] ?? "text-white";
  const bioColor = bioColorMap[user.theme] ?? "text-purple-200";

  const listLinks = user.blocks.filter((b: BlockRow) => b.variant === "list" && b.url);
  const bentoLinks = user.blocks.filter((b: BlockRow) => b.variant === "bento" && b.url);

  return (
    <main className={`min-h-screen ${bg} ${textColor} flex flex-col items-center py-20 px-4 ${user.fontFamily}`}>
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`w-24 h-24 rounded-full ${user.theme === "minimal" ? "border-2 border-black" : "bg-gradient-to-tr from-pink-500 to-orange-400 p-1"}`}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt="Profile"
                className="w-full h-full rounded-full bg-white object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {user.fullName || `@${user.username}`}
            </h1>
            {user.bio && (
              <p className={`text-sm mt-1 max-w-[280px] ${bioColor}`}>{user.bio}</p>
            )}
          </div>
        </div>

        {/* List Links */}
        {listLinks.length > 0 && (
          <div className="w-full flex flex-col gap-4 mt-4">
            {listLinks.map((block: BlockRow, i: number) => (
              <LinkCard
                key={block.id}
                title={block.title || "Link"}
                url={block.url!}
                iconName={block.iconName as any}
                variant="list"
                theme={user.theme}
                buttonStyle={user.buttonStyle}
                buttonShape={user.buttonShape}
                hoverEffect={user.hoverEffect}
                delay={i * 0.1}
              />
            ))}
          </div>
        )}

        {/* Bento Grid */}
        {bentoLinks.length > 0 && (
          <div className="w-full mt-6">
            <div className="grid grid-cols-2 gap-4">
              {bentoLinks.map((block: BlockRow, i: number) => (
                <LinkCard
                  key={block.id}
                  title={block.title || "Link"}
                  url={block.url!}
                  iconName={block.iconName as any}
                  variant="bento"
                  theme={user.theme}
                  buttonStyle={user.buttonStyle}
                  buttonShape={user.buttonShape}
                  hoverEffect={user.hoverEffect}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
