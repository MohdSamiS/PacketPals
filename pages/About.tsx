import React from 'react';
import { Network, Shield, Code } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">About Packet Pals</h1>
        <p className="text-xl text-brand-muted max-w-2xl mx-auto">
          Bridging the gap between theoretical knowledge and production-grade engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-brand-muted mb-4 leading-relaxed">
            In an industry awash with marketing buzzwords, Packet Pals strives to provide clarity. 
            We dissect complex protocols, analyze cloud architectures, and test security frameworks so you don't have to guess.
          </p>
          <p className="text-brand-muted leading-relaxed">
            Founded by network engineers and security researchers, this platform is a repository of "Packets"—our units of knowledge—designed to be efficient, accurate, and practical.
          </p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-white font-bold mb-4">Core Values</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="mt-1 bg-brand-net/20 p-1 rounded">
                <Network size={16} className="text-brand-net" />
              </div>
              <div>
                <h4 className="text-white font-medium">Technical Depth</h4>
                <p className="text-sm text-slate-500">No fluff. Just the bytes, headers, and logic.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 bg-brand-cloud/20 p-1 rounded">
                <Code size={16} className="text-brand-cloud" />
              </div>
              <div>
                <h4 className="text-white font-medium">Open Knowledge</h4>
                <p className="text-sm text-slate-500">Information should be accessible and verifiable.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 bg-brand-accent/20 p-1 rounded">
                <Shield size={16} className="text-brand-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium">Security First</h4>
                <p className="text-sm text-slate-500">Every architecture discussed considers the threat landscape.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;