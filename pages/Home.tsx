import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/db";
import { Clock, Terminal } from "lucide-react";

interface PacketSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  read_time_minutes: number;
}

const Home: React.FC = () => {
  const [latestPackets, setLatestPackets] = useState<PacketSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatest = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("packets")
        .select("id, slug, title, category, excerpt, read_time_minutes")
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error loading latest packets:", error);
        setLatestPackets([]);
      } else {
        setLatestPackets((data || []) as PacketSummary[]);
      }

      setLoading(false);
    };

    loadLatest();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Packet Pals –{" "}
            <span className="text-cyan-300">
              Decoding the Layers of Networking, Cloud, and Cybersecurity
            </span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mb-6 max-w-xl">
            A technical platform focused on real packet behavior, cloud-native
            architectures, and practical security models. Built for engineers who
            care about how the system actually behaves in production.
          </p>
          <div className="flex gap-3">
            <Link
              to="/packets"
              className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-medium hover:bg-cyan-400"
            >
              Explore Packets
            </Link>
            <Link
              to="/tools"
              className="px-4 py-2 rounded-lg border border-slate-700 text-sm hover:border-cyan-400"
            >
              Browse Tools
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs font-mono text-slate-200">
          <div className="text-cyan-300 mb-2">// live_traffic.pcap · summary</div>
          <div>[00:00:01.234] TCP 10.0.0.5:443 → 10.0.0.12:52988 [SYN,ACK]</div>
          <div>[00:00:01.235] TLSv1.3 ServerHello · AES_256_GCM_SHA384</div>
          <div>[00:00:01.240] GET /packets/packet-01-tcp-ip</div>
          <div className="text-emerald-300 mt-2">
            ▶ decision: posture="zero-trust" action="allow"
          </div>
        </div>
      </section>

      {/* LATEST PACKETS FROM DB */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Latest Packets</h2>
          <Link
            to="/packets"
            className="text-sm text-cyan-300 hover:text-cyan-200"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Loading latest packets…</p>
        ) : latestPackets.length === 0 ? (
          <p className="text-sm text-slate-400">
            No packets published yet. Add rows in the <code>packets</code> table.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {latestPackets.map((p) => (
              <article
                key={p.id}
                className="border border-slate-800 bg-slate-900 rounded-xl p-4 hover:border-cyan-400/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Terminal size={14} className="text-cyan-300" />
                    {p.category}
                  </span>
                </div>
                <Link to={`/packets/${p.id}`} className="block mb-2">
                  <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 hover:text-cyan-300">
                    {p.title}
                  </h3>
                </Link>
                <p className="text-xs text-slate-400 line-clamp-3 mb-3">
                  {p.excerpt}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {p.read_time_minutes} min
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
