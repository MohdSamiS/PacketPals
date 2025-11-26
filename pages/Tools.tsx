import React, { useEffect, useState } from "react";
import { supabase } from "../services/db";
import { Link } from "react-router-dom";

interface Tool {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  is_active: boolean;
}

const Tools: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTools = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading tools:", error);
        setTools([]);
      } else {
        console.log("TOOLS FROM DB:", data); // keep for debugging
        setTools((data || []) as Tool[]);
      }

      setLoading(false);
    };

    loadTools();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">
          Tools Dashboard
        </h1>
        <p className="text-slate-400 text-sm">
          Practical utilities for networking, diagnostics, and security work.
        </p>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading tools…</p>
      ) : tools.length === 0 ? (
        <p className="text-slate-500">
          No tools available yet. Add rows to the <code>tools</code> table.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const slugNorm = tool.slug?.trim().toLowerCase();
            const nameNorm = tool.name?.trim().toLowerCase();

            // Treat this tool as implemented if its slug OR name matches
            const isImplemented =
              slugNorm === "ip-subnet-calculator" ||
              nameNorm === "ip subnet calculator";

            return (
              <div
                key={tool.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-400/60 transition-colors"
              >
                <div className="mb-3">
                  <span className="text-xs font-mono text-slate-400">
                    {tool.category}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-slate-100 mb-2">
                  {tool.name}
                </h2>

                <p className="text-sm text-slate-400 mb-6">
                  {tool.description}
                </p>

                {isImplemented ? (
                  <Link
                    to={`/tools/ip-subnet-calculator`}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm rounded bg-cyan-500 text-slate-950 font-medium hover:bg-cyan-400"
                  >
                    Launch Tool
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 text-sm rounded bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700"
                  >
                    Coming soon
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tools;
