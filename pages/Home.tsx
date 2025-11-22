import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Cloud, Server, Terminal, Clock } from 'lucide-react';
import { PACKETS, TRANSMISSIONS, SOCIAL_LINKS } from '../services/mockData';

const Home: React.FC = () => {
  const latestPackets = PACKETS.slice(0, 2);
  const latestTransmission = TRANSMISSIONS[0];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/90 to-brand-dark"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
            <span className="text-xs font-mono text-brand-accent uppercase tracking-wider">System Online</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Decoding the Layers of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-cloud to-brand-net">
              Networking, Cloud & Security
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-brand-muted max-w-2xl mb-10 mx-auto md:mx-0 leading-relaxed">
            Packet Pals is a platform delivering deep technical insights, real-world case studies, and practical tools for IT professionals and learners who demand clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link 
              to="/packets" 
              className="px-8 py-3 bg-brand-accent text-brand-dark font-bold rounded hover:bg-cyan-400 transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Packets</span>
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/tools" 
              className="px-8 py-3 bg-slate-800 text-white font-medium rounded border border-slate-700 hover:border-brand-accent hover:bg-slate-750 transition-all flex items-center justify-center"
            >
              Browse Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-brand-dark border border-slate-800 hover:border-brand-net/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-net/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-net/20 transition-colors">
                <Server className="text-brand-net" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Networking</h3>
              <p className="text-brand-muted text-sm">Protocols, routing, switching, and architecture designed for the modern reliable web.</p>
            </div>
            <div className="p-6 rounded-xl bg-brand-dark border border-slate-800 hover:border-brand-cloud/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-cloud/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-cloud/20 transition-colors">
                <Cloud className="text-brand-cloud" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cloud Computing</h3>
              <p className="text-brand-muted text-sm">Serverless, containers, and orchestration patterns for scalable infrastructure.</p>
            </div>
            <div className="p-6 rounded-xl bg-brand-dark border border-slate-800 hover:border-brand-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-accent/20 transition-colors">
                <Shield className="text-brand-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cybersecurity</h3>
              <p className="text-brand-muted text-sm">Threat analysis, defense strategies, and zero-trust implementation guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Content Split */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Latest Packets (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Terminal className="text-brand-accent" />
                <span>Latest Packets</span>
              </h2>
              <Link to="/packets" className="text-sm text-brand-accent hover:underline">View All</Link>
            </div>

            <div className="space-y-6">
              {latestPackets.map((packet) => (
                <div key={packet.id} className="group block relative bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-brand-accent/40 transition-all hover:shadow-lg hover:shadow-brand-accent/5">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 rounded bg-slate-800 text-xs font-mono text-brand-accent border border-slate-700">
                      Packet #{packet.number}
                    </span>
                    <span className="text-xs text-brand-muted font-mono">{packet.date}</span>
                  </div>
                  <Link to={`/packets/${packet.id}`}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{packet.title}</h3>
                  </Link>
                  <p className="text-brand-muted mb-4 line-clamp-2">{packet.excerpt}</p>
                  <div className="flex items-center space-x-4 text-xs font-mono text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{packet.readTime} read</span>
                    </span>
                    <span className="text-brand-cloud">{packet.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transmissions Feed Highlight (1/3 width) */}
          <div className="lg:col-span-1">
             <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Server className="text-brand-net" />
                <span>Transmissions</span>
              </h2>
              <Link to="/transmissions" className="text-sm text-brand-net hover:underline">Feed</Link>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <div className="relative border-l border-slate-700 pl-6 py-2">
                <div className="mb-1">
                  <span className="absolute -left-1.5 top-3 w-3 h-3 bg-brand-net rounded-full border-2 border-brand-dark"></span>
                  <span className="text-xs font-mono text-brand-net block mb-1">Transmission #{latestTransmission.number}</span>
                  <h4 className="text-white font-medium hover:text-brand-net transition-colors cursor-pointer">{latestTransmission.title}</h4>
                  <p className="text-sm text-brand-muted mt-2">{latestTransmission.description}</p>
                  <div className="mt-4 pt-4 border-t border-slate-800">
                     <p className="text-xs text-slate-500">Live Update • {latestTransmission.date}</p>
                  </div>
                </div>
              </div>
              <Link to="/transmissions" className="block mt-6 text-center w-full py-2 bg-slate-800 text-sm text-white rounded hover:bg-slate-700 transition-colors">
                View System Timeline
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Connect Band */}
      <section className="w-full bg-gradient-to-r from-slate-900 to-brand-dark border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white">Follow the Network</h3>
            <p className="text-sm text-brand-muted">Connect with Packet Pals across the grid.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-brand-muted hover:text-white hover:border-brand-accent hover:bg-slate-700 transition-all duration-300"
                aria-label={social.name}
              >
                 <svg 
                   viewBox={social.viewBox || "0 0 24 24"} 
                   className="w-5 h-5 fill-current"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path d={social.iconPath} />
                 </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;