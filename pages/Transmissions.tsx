import React, { useEffect, useState } from "react";
import { Activity, ShieldAlert, Info, Zap } from "lucide-react";
import { supabase } from "../services/db";

interface Transmission {
  id: string;
  number: number;
  title: string;
  date: string;
  type: string;         // 'Security Alert' | 'Platform Update' | 'Industry News'
  description: string;
}

const Transmissions: React.FC = () => {
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransmissions = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("transmissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading transmissions:", error);
        setTransmissions([]);
      } else {
        setTransmissions((data || []) as Transmission[]);
      }

      setLoading(false);
    };

    loadTransmissions();
  }, []);

  const getTypeClasses = (type: string) => {
    if (type === "Security Alert") {
      return "text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 bg-red-100 dark:bg-red-900/20";
    }
    if (type === "Platform Update") {
      return "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 bg-emerald-100 dark:bg-emerald-900/20";
    }
    // Industry News or anything else
    return "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 bg-blue-100 dark:bg-blue-900/20";
  };

  const getDotClasses = (type: string) => {
    if (type === "Security Alert") {
      return "bg-red-500 group-hover:bg-red-400";
    }
    if (type === "Platform Update") {
      return "bg-emerald-500 group-hover:bg-emerald-400";
    }
    return "bg-blue-500 group-hover:bg-blue-400";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-100 mb-2 flex items-center justify-center space-x-3">
          <Activity className="text-emerald-400" size={32} />
          <span>Transmissions</span>
        </h1>
        <p className="text-slate-400">
          System updates, security alerts, and industry news feed.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-slate-400">Loading transmissions…</p>
      ) : transmissions.length === 0 ? (
        <p className="text-center text-slate-500">
          No transmissions logged yet. Add rows in the <code>transmissions</code> table.
        </p>
      ) : (
        <>
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-0 space-y-12">
            {transmissions.map((transmission) => (
              <div
                key={transmission.id}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-slate-50 dark:border-slate-950 transition-colors duration-300 z-10 ${getDotClasses(
                    transmission.type
                  )}`}
                ></div>

                {/* Content Card */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 hover:border-slate-500 transition-all shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm text-slate-500">
                        #{transmission.number}
                      </span>
                      <h3 className="text-xl font-bold text-slate-100">
                        {transmission.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-slate-500 mt-2 md:mt-0 bg-slate-900 px-2 py-1 rounded inline-block border border-slate-700">
                      {transmission.date}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getTypeClasses(
                        transmission.type
                      )}`}
                    >
                      {transmission.type}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm">
                    {transmission.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center space-x-2 text-xs text-slate-500">
                    {transmission.type === "Security Alert" && (
                      <ShieldAlert size={14} className="text-red-500" />
                    )}
                    {transmission.type === "Platform Update" && (
                      <Zap size={14} className="text-emerald-500" />
                    )}
                    {transmission.type === "Industry News" && (
                      <Info size={14} className="text-blue-500" />
                    )}
                    <span>Logged to system</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-6 py-2 border border-slate-700 text-slate-400 rounded hover:text-slate-100 hover:border-cyan-400 transition-colors text-sm">
              Load Archived Transmissions
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Transmissions;
