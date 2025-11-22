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
      case Category.IOT: return 'text-purple-500';
      default: return 'text-slate-900 dark:text-white';
    }
  };

  // Filter for priority social links for the author profile section
  const authorSocials = SOCIAL_LINKS.filter(link => 
    ['LinkedIn', 'X (Twitter)', 'Reddit'].includes(link.name)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/packets" className="inline-flex items-center space-x-2 text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} />
        <span>Back to Packets</span>
      </Link>

      {/* Hero Image */}
      {packet.image && (
        <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-10 relative border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
            <img src={packet.image} alt={packet.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 z-20">
                <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-mono rounded border border-slate-700">
                  Packet #{packet.number}
                </span>
            </div>
        </div>
      )}

      <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex items-center space-x-4 mb-4 text-sm font-mono">
            {!packet.image && (
             <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white">
                Packet #{packet.number}
            </span>
            )}
          <span className={`uppercase font-bold tracking-wider ${getCategoryColor(packet.category)}`}>
            {packet.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
          {packet.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-brand-muted">
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span className="font-bold text-slate-900 dark:text-white">{packet.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{packet.readTime} read</span>
            </div>
            <div className="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded text-slate-500">
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

      {/* Update prose to support light/dark mode using standard Tailwind prose-invert logic for dark mode */}
      <article 
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-brand-accent prose-code:text-brand-accent prose-pre:bg-slate-800 dark:prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700"
        dangerouslySetInnerHTML={{ __html: packet.content }} 
      />

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center space-x-2">
          <Tag size={16} />
          <span>Keywords</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {packet.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-brand-muted text-sm rounded-full border border-slate-200 dark:border-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PacketDetail;