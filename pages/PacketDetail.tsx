import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { PACKETS, SOCIAL_LINKS } from '../services/mockData';
import { Category } from '../types';

const PacketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const packet = PACKETS.find(p => p.id === id);

  if (!packet) {
    return <Navigate to="/packets" replace />;
  }

  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.NETWORKING: return 'text-brand-net';
      case Category.CLOUD: return 'text-brand-cloud';
      case Category.CYBERSECURITY: return 'text-brand-accent';
      default: return 'text-white';
    }
  };

  // Filter for priority social links for the author profile section
  const authorSocials = SOCIAL_LINKS.filter(link => 
    ['LinkedIn', 'X (Twitter)', 'Reddit'].includes(link.name)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/packets" className="inline-flex items-center space-x-2 text-brand-muted hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} />
        <span>Back to Packets</span>
      </Link>

      <header className="mb-12 border-b border-slate-800 pb-8">
        <div className="flex items-center space-x-4 mb-4 text-sm font-mono">
          <span className="px-3 py-1 bg-slate-800 rounded border border-slate-700 text-white">
            Packet #{packet.number}
          </span>
          <span className={`uppercase font-bold tracking-wider ${getCategoryColor(packet.category)}`}>
            {packet.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          {packet.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-sm text-brand-muted">
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span className="font-bold text-white">{packet.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{packet.readTime} read</span>
            </div>
            <div className="px-2 py-1 bg-slate-900 rounded text-slate-500">
              {packet.date}
            </div>
          </div>

          {/* Author Socials */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase mr-1">Connect:</span>
            {authorSocials.map(social => (
              <a 
                key={social.name} 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-accent transition-colors"
                title={social.name}
              >
                <svg 
                  viewBox={social.viewBox || "0 0 24 24"} 
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={social.iconPath} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </header>

      <article 
        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-brand-accent prose-code:text-brand-accent prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700"
        dangerouslySetInnerHTML={{ __html: packet.content }} 
      />

      <div className="mt-12 pt-8 border-t border-slate-800">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center space-x-2">
          <Tag size={16} />
          <span>Keywords</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {packet.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-slate-800 text-brand-muted text-sm rounded-full border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PacketDetail;