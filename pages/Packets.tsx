import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Terminal, Clock } from 'lucide-react';
import { PACKETS } from '../services/mockData';
import { Category } from '../types';

const Packets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPackets = PACKETS.filter((packet) => {
    const matchesSearch = packet.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          packet.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || packet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            <Terminal className="text-brand-accent" size={32} />
            <span>Packets</span>
          </h1>
          <p className="text-brand-muted">Technical deep dives and knowledge transfers.</p>
        </div>

        {/* Controls */}
        <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search packets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-2 rounded w-full sm:w-64 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white pl-10 pr-8 py-2 rounded appearance-none focus:outline-none focus:border-brand-accent cursor-pointer"
            >
              <option value="All">All Categories</option>
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackets.map((packet) => (
          <article key={packet.id} className="flex flex-col bg-brand-surface border border-slate-700 rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all duration-300 group">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                 <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${
                   packet.category === Category.NETWORKING ? 'text-brand-net bg-brand-net/10' :
                   packet.category === Category.CLOUD ? 'text-brand-cloud bg-brand-cloud/10' :
                   'text-brand-accent bg-brand-accent/10'
                 }`}>
                   {packet.category}
                 </span>
                 <span className="text-xs font-mono text-slate-500">#{packet.number}</span>
              </div>
              
              <Link to={`/packets/${packet.id}`}>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                  {packet.title}
                </h2>
              </Link>
              
              <p className="text-brand-muted text-sm mb-6 line-clamp-3">
                {packet.excerpt}
              </p>
            </div>

            <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{packet.author}</span>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{packet.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPackets.length === 0 && (
        <div className="text-center py-20 text-brand-muted">
          <p className="text-lg">No packets found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Packets;