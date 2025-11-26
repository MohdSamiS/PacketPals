import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Terminal } from "lucide-react";
import { supabase } from "../services/db";

interface Packet {
  id: string;
  slug: string;
  number: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  read_time_minutes: number;
  published_at: string;
}

const PacketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [packet, setPacket] = useState<Packet | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadPacket = async () => {
      if (!id) return;

      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase
        .from("packets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading packet:", error);
        setErrorMsg(error.message);
        setPacket(null);
      } else {
        setPacket(data as Packet);
      }

      setLoading(false);
    };

    loadPacket();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-slate-400">
        Loading packet…
      </div>
    );
  }

  if (errorMsg || !packet) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          to="/packets"
          className="text-sm text-cyan-300 hover:text-cyan-200 flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Packets
        </Link>
        <h1 className="text-2xl font-semibold text-slate-100 mb-2">
          Packet not found
        </h1>
        {errorMsg && (
          <p className="text-sm text-rose-400">Database error: {errorMsg}</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        to="/packets"
        className="text-sm text-cyan-300 hover:text-cyan-200 flex items-center gap-2 mb-4"
      >
        <ArrowLeft size={16} />
        Back to Packets
      </Link>

      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
        <Terminal size={14} className="text-cyan-300" />
        <span>Packet #{packet.number}</span>
        <span className="text-slate-600">·</span>
        <span>{packet.category}</span>
        <span className="text-slate-600">·</span>
        <span className="flex items-center gap-1">
          <Clock size={14} /> {packet.read_time_minutes} min
        </span>
      </div>

      <h1 className="text-3xl font-bold text-slate-100 mb-3">
        {packet.title}
      </h1>

      <p className="text-sm text-slate-400 mb-6">by {packet.author}</p>

      <article className="prose prose-invert prose-sm max-w-none">
        {packet.content
          .split("\n\n")
          .map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
      </article>
    </div>
  );
};

export default PacketDetail;
