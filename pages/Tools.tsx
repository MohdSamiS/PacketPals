import React, { useState } from 'react';
import { Wrench, Calculator, Binary, Radar, Globe, Lock, Shield, X } from 'lucide-react';
import { TOOLS } from '../services/mockData';

const Tools: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [cidrInput, setCidrInput] = useState<string>('24');
  const [subnetResult, setSubnetResult] = useState<string>('255.255.255.0');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator size={24} className="text-brand-net"/>;
      case 'Binary': return <Binary size={24} className="text-brand-cloud"/>;
      case 'Radar': return <Radar size={24} className="text-red-400"/>;
      case 'Globe': return <Globe size={24} className="text-brand-accent"/>;
      case 'Lock': return <Lock size={24} className="text-yellow-400"/>;
      case 'Shield': return <Shield size={24} className="text-purple-400"/>;
      default: return <Wrench size={24} />;
    }
  };

  const handleCidrChange = (val: string) => {
    setCidrInput(val);
    // Very basic mock logic for demonstration
    const cidr = parseInt(val);
    if (cidr >= 0 && cidr <= 32) {
        // A real app would have a full bitwise calculation here
        if (cidr === 24) setSubnetResult('255.255.255.0');
        else if (cidr === 16) setSubnetResult('255.255.0.0');
        else if (cidr === 8) setSubnetResult('255.0.0.0');
        else if (cidr === 32) setSubnetResult('255.255.255.255');
        else if (cidr === 0) setSubnetResult('0.0.0.0');
        else setSubnetResult('Calculated Mask...');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
          <Wrench className="text-brand-accent" size={32} />
          <span>Tools Dashboard</span>
        </h1>
        <p className="text-brand-muted">Practical utilities for network diagnostics and security assessment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <div key={tool.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col hover:border-brand-accent/40 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                {getIcon(tool.icon)}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                tool.status === 'Active' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-900' :
                tool.status === 'Beta' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-900' :
                'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {tool.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
            <p className="text-sm text-brand-muted mb-6 flex-grow">{tool.description}</p>
            
            <button 
              onClick={() => setActiveToolId(tool.id)}
              disabled={tool.status === 'Coming Soon'}
              className={`w-full py-2 rounded font-medium text-sm transition-colors ${
                tool.status === 'Coming Soon' 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-slate-800 text-white hover:bg-brand-accent hover:text-brand-dark'
              }`}
            >
              {tool.status === 'Coming Soon' ? 'In Development' : 'Launch Tool'}
            </button>
          </div>
        ))}
      </div>

      {/* Simple Modal for Tool Demo */}
      {activeToolId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-brand-surface border border-slate-700 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Binary size={18} className="text-brand-accent" />
                <span>Tool Interface</span>
              </h3>
              <button onClick={() => setActiveToolId(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
               {/* Placeholder content for any tool */}
               <div className="text-center mb-6">
                 <p className="text-brand-muted text-sm">
                   Running instance: <span className="text-brand-accent font-mono">v2.4.1-stable</span>
                 </p>
               </div>

               {/* Interactive Demo for CIDR Converter */}
               <div className="bg-slate-900 p-6 rounded border border-slate-700">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">CIDR Input (0-32)</label>
                  <div className="flex space-x-4 mb-6">
                    <span className="flex items-center px-3 bg-slate-800 border border-slate-700 rounded-l text-slate-400">/</span>
                    <input 
                      type="number" 
                      value={cidrInput}
                      onChange={(e) => handleCidrChange(e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-r w-full focus:outline-none focus:border-brand-accent"
                      min="0" max="32"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase">Subnet Mask</label>
                    <div className="p-3 bg-black/40 rounded border border-slate-800 font-mono text-brand-net text-lg">
                      {subnetResult}
                    </div>
                  </div>
               </div>
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-700 flex justify-end">
               <button onClick={() => setActiveToolId(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-sm">
                 Close Session
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;