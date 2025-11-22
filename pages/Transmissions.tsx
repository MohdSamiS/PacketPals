import React from 'react';
import { Activity, ShieldAlert, Info, Zap } from 'lucide-react';
import { TRANSMISSIONS } from '../services/mockData';

const Transmissions: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center space-x-3">
          <Activity className="text-brand-net" size={32} />
          <span>Transmissions</span>
        </h1>
        <p className="text-slate-600 dark:text-brand-muted">System updates, security alerts, and industry news feed.</p>
      </div>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-0 space-y-12">
        {TRANSMISSIONS.map((transmission, index) => (
          <div key={transmission.id} className="relative pl-8 md:pl-12 group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-slate-50 dark:border-brand-dark transition-colors duration-300 z-10 ${
              transmission.type === 'Security Alert' ? 'bg-red-500 group-hover:bg-red-400' :
              transmission.type === 'Platform Update' ? 'bg-brand-net group-hover:bg-emerald-400' :
              'bg-brand-cloud group-hover:bg-blue-400'
            }`}></div>

            {/* Content Card */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-sm dark:shadow-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm text-slate-500">#{transmission.number}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{transmission.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-brand-muted mt-2 md:mt-0 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block">
                  {transmission.date}
                </span>
              </div>

              <div className="mb-4">
                 <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                   transmission.type === 'Security Alert' ? 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 bg-red-100 dark:bg-red-900/20' :
                   transmission.type === 'Platform Update' ? 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 bg-emerald-100 dark:bg-emerald-900/20' :
                   'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 bg-blue-100 dark:bg-blue-900/20'
                 }`}>
                   {transmission.type}
                 </span>
              </div>

              <p className="text-slate-600 dark:text-brand-muted">
                {transmission.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center space-x-2 text-xs text-slate-500">
                {transmission.type === 'Security Alert' && <ShieldAlert size={14} className="text-red-500"/>}
                {transmission.type === 'Platform Update' && <Zap size={14} className="text-emerald-500"/>}
                {transmission.type === 'Industry News' && <Info size={14} className="text-blue-500"/>}
                <span>Logged to system</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
         <button className="px-6 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-brand-muted rounded hover:text-slate-900 dark:hover:text-white hover:border-brand-accent dark:hover:border-brand-accent transition-colors text-sm">
            Load Archived Transmissions
         </button>
      </div>
    </div>
  );
};

export default Transmissions;