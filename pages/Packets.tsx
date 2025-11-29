import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Terminal, Clock } from 'lucide-react';
import { supabase } from '../services/db';
import { Packet, Category } from '../types';

const getCategoryStyle = (cat: string) => {
  const c = cat.toLowerCase();
  if (c === 'networking') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (c === 'cloud') return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
  if (c === 'cybersecurity') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  if (c === 'iot') return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
  return 'text-slate-400 bg-slate-700/20 border-slate-600/40';
};

const Packets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [packets, setPackets] = useState<Packet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackets = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('packets')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error loading packets from Supabase:', error);
        setPackets([]);
      } else {
        setPackets((data || []) as Packet[]);
      }

      setLoading(false);
    };

    loadPackets();
  }, []);

  const filteredPackets = packets.filter((packet) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      packet.title.toLowerCase().includes(term) ||
      packet.excerpt.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategory === 'All' ||
      packet.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-12 text-slate-400">Loading packets…</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2 flex items-center space-x-3">
            <Terminal className="text-cyan-400" size={32} />
            <span>Packets</span>
          </h1>
          <p className="text-slate-400 text-sm">Technical deep dives and real-world knowledge transfers pulled from the Packet Pals database.</p>
        </div>

        <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search packets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-100 pl-10 pr-4 py-2 rounded w-full sm:w-64 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder-slate-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-100 pl-10 pr-8 py-2 rounded appearance-none focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Networking">Networking</option>
              <option value="Cloud">Cloud</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="IoT">IoT</option>
            </select>
          </div>
        </div>
      </div>

      {filteredPackets.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">No packets found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackets.map((packet) => (
            <article key={packet.id} className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-400/60 transition-all duration-300 group h-full">
              {packet.cover_image_url && (
                <div className="h-44 w-full overflow-hidden relative">
                  <img src={packet.cover_image_url} alt={packet.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide border backdrop-blur-md ${getCategoryStyle(packet.category)}`}>{packet.category}</span>
                  </div>
                </div>
              )}

              <div className="p-6 flex-grow flex flex-col">
                {!packet.cover_image_url && (
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide border ${getCategoryStyle(packet.category)}`}>{packet.category}</span>
                    <span className="text-xs font-mono text-slate-500">#{packet.number}</span>
                  </div>
                )}

                <Link to={`/packets/${packet.slug}`} className="block mb-3">
                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">{packet.title}</h2>
                </Link>

                <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">{packet.excerpt}</p>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-4 border-t border-slate-800">
                  <span>{packet.author}</span>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{packet.read_time_minutes} min</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Packets;
