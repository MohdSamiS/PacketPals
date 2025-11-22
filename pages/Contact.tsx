import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Establish Connection</h1>
        <p className="text-slate-600 dark:text-brand-muted">Have a topic suggestion, found a bug in a tool, or want to contribute a Packet?</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-lg dark:shadow-none">
        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-brand-net/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={32} className="text-brand-net" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Transmission Received</h3>
            <p className="text-slate-600 dark:text-brand-muted">We will analyze your message and respond shortly.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 text-brand-accent hover:text-slate-900 dark:hover:text-white text-sm font-medium"
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
              <h3 className="text-slate-900 dark:text-white font-bold mb-6">Channels</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-slate-600 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Mail size={20} />
                  <span>hello@packetpals.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors">
                  <MessageSquare size={20} />
                  <span>@PacketPals_HQ</span>
                </div>
              </div>
              <div className="mt-12">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Office</h4>
                <p className="text-sm text-slate-600 dark:text-brand-muted">
                  127.0.0.1<br/>
                  Localhost, CA 90210
                </p>
              </div>
            </div>
            
            <div className="col-span-2 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Name</label>
                    <input required type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded p-3 text-slate-900 dark:text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none placeholder-slate-400" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Email</label>
                    <input required type="email" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded p-3 text-slate-900 dark:text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none placeholder-slate-400" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Subject</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded p-3 text-slate-900 dark:text-white focus:border-brand-accent outline-none">
                      <option>General Inquiry</option>
                      <option>Report a Bug</option>
                      <option>Submit a Packet</option>
                    </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Message Payload</label>
                  <textarea required rows={5} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded p-3 text-slate-900 dark:text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none placeholder-slate-400" placeholder="Type your message here..."></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-brand-accent text-brand-dark font-bold rounded hover:bg-cyan-400 transition-colors">
                  Transmit Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;