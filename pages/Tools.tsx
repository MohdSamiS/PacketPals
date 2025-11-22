import React, { useState, useEffect } from 'react';
import { Wrench, Calculator, Binary, Radar, Globe, Lock, Shield, X, Play, RefreshCw, AlertCircle, Terminal } from 'lucide-react';
import { TOOLS } from '../services/mockData';

// --- Helper Functions ---

const ipToInt = (ip: string) => {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
};

const intToIp = (int: number) => {
  return [24, 16, 8, 0].map(shift => (int >> shift) & 255).join('.');
};

const calculateSubnet = (ip: string, cidr: number) => {
  try {
    const ipInt = ipToInt(ip);
    const mask = ~((1 << (32 - cidr)) - 1);
    const network = ipInt & mask;
    const broadcast = network | (~mask >>> 0);
    const first = network + 1;
    const last = broadcast - 1;
    const hosts = Math.max(0, last - first + 1);

    return {
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      first: intToIp(first),
      last: intToIp(last),
      mask: intToIp(mask),
      hosts: hosts.toLocaleString()
    };
  } catch (e) {
    return null;
  }
};

const maskToCidr = (mask: string) => {
  try {
    const binary = mask.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');
    return binary.indexOf('0');
  } catch (e) {
    return -1;
  }
};

// --- Tool Sub-Components ---

const SubnetCalculatorTool = () => {
  const [ip, setIp] = useState('192.168.1.10');
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (ip && cidr >= 0 && cidr <= 32) {
      const res = calculateSubnet(ip, cidr);
      setResult(res);
    }
  }, [ip, cidr]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded focus:border-brand-accent outline-none font-mono placeholder-slate-400"
            placeholder="e.g. 192.168.1.10"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">CIDR (/{cidr})</label>
          <input
            type="number"
            min="0"
            max="32"
            value={cidr}
            onChange={(e) => setCidr(parseInt(e.target.value) || 0)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded focus:border-brand-accent outline-none font-mono"
          />
        </div>
      </div>

      {result ? (
        <div className="bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 p-4 space-y-3 font-mono text-sm">
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-500 dark:text-brand-muted">Subnet Mask</span>
            <span className="text-slate-900 dark:text-white">{result.mask}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-500 dark:text-brand-muted">Network Address</span>
            <span className="text-brand-net">{result.network}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-500 dark:text-brand-muted">Broadcast Address</span>
            <span className="text-brand-cloud">{result.broadcast}</span>
          </div>
           <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-500 dark:text-brand-muted">Host Range</span>
            <span className="text-slate-900 dark:text-white">{result.first} - {result.last}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-brand-muted">Usable Hosts</span>
            <span className="text-brand-accent">{result.hosts}</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-sm text-red-500 dark:text-red-400 py-4">Invalid IP Address format.</div>
      )}
    </div>
  );
};

const CidrConverterTool = () => {
  const [mode, setMode] = useState<'cidrToMask' | 'maskToCidr'>('cidrToMask');
  const [input, setInput] = useState(mode === 'cidrToMask' ? '24' : '255.255.255.0');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (mode === 'cidrToMask') {
       const cidr = parseInt(input);
       if (!isNaN(cidr) && cidr >= 0 && cidr <= 32) {
         const mask = ~((1 << (32 - cidr)) - 1);
         setOutput(intToIp(mask));
       } else {
         setOutput('Invalid CIDR');
       }
    } else {
      // Very basic validation for mask
      if(input.split('.').length === 4) {
        const cidr = maskToCidr(input);
        if (cidr !== -1) setOutput('/' + cidr);
        else setOutput('Invalid Mask');
      } else {
         setOutput('Invalid Format');
      }
    }
  }, [input, mode]);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-slate-200 dark:border-slate-700 pb-4">
        <button
          onClick={() => { setMode('cidrToMask'); setInput('24'); }}
          className={`text-sm font-medium pb-1 transition-colors ${mode === 'cidrToMask' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white'}`}
        >
          CIDR to Mask
        </button>
        <button
           onClick={() => { setMode('maskToCidr'); setInput('255.255.255.0'); }}
           className={`text-sm font-medium pb-1 transition-colors ${mode === 'maskToCidr' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white'}`}
        >
          Mask to CIDR
        </button>
      </div>

      <div>
         <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
           {mode === 'cidrToMask' ? 'CIDR Value (e.g., 24)' : 'Subnet Mask (e.g., 255.255.255.0)'}
         </label>
         <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded focus:border-brand-accent outline-none font-mono placeholder-slate-400"
          />
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded border border-slate-200 dark:border-slate-800 text-center">
        <span className="block text-xs text-slate-500 uppercase mb-2">Result</span>
        <span className="text-3xl font-mono text-brand-accent">{output}</span>
      </div>
    </div>
  )
};

const PortScannerTool = () => {
  const [target, setTarget] = useState('packetpals.com');
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const runScan = () => {
    setScanning(true);
    setLogs([`Starting scan on ${target}...`]);
    setProgress(0);

    const ports = [
      { p: 21, s: 'FTP', open: false },
      { p: 22, s: 'SSH', open: true },
      { p: 80, s: 'HTTP', open: true },
      { p: 443, s: 'HTTPS', open: true },
      { p: 3306, s: 'MySQL', open: false },
      { p: 8080, s: 'HTTP-Proxy', open: true },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current >= ports.length) {
        clearInterval(interval);
        setScanning(false);
        setLogs(prev => [...prev, `Scan complete. Found ${ports.filter(x=>x.open).length} open ports.`]);
        setProgress(100);
        return;
      }

      const port = ports[current];
      // Simulate scan logic
      const status = port.open ? 'OPEN' : 'CLOSED';
      
      setLogs(prev => [...prev, `Checking port ${port.p} (${port.s})... ${status}`]);
      setProgress(Math.round(((current + 1) / ports.length) * 100));
      current++;
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Hostname or IP"
            className="flex-grow bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded focus:border-brand-accent outline-none font-mono placeholder-slate-400"
          />
        <button 
          onClick={runScan}
          disabled={scanning}
          className="bg-brand-accent text-brand-dark font-bold px-6 py-2 rounded hover:bg-cyan-400 disabled:opacity-50 flex items-center justify-center space-x-2 transition-colors"
        >
          {scanning ? <RefreshCw className="animate-spin" size={18}/> : <Play size={18}/>}
          <span>Start Scan</span>
        </button>
      </div>

      {/* Terminal Output */}
      <div className="bg-slate-950 dark:bg-black rounded-lg border border-slate-800 p-4 font-mono text-sm h-64 overflow-y-auto flex flex-col relative shadow-inner">
        <div className="flex-grow">
            {logs.length === 0 ? (
            <span className="text-slate-500 italic">Ready to scan...</span>
            ) : (
            logs.map((log, i) => {
                const isGreen = log.includes('OPEN');
                const isRed = log.includes('CLOSED');
                return (
                <div key={i} className="mb-1">
                    <span className="text-slate-600 dark:text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    <span className={isGreen ? 'text-brand-net' : isRed ? 'text-red-400' : 'text-slate-300'}>
                    {log}
                    </span>
                </div>
                )
            })
            )}
        </div>
        
        {scanning && (
          <div className="mt-2 w-full bg-slate-800 h-1 rounded overflow-hidden absolute bottom-0 left-0 right-0">
            <div className="bg-brand-accent h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
      <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2">
        <AlertCircle size={12} />
        <span>Simulation Mode: No actual packets are sent from your browser.</span>
      </p>
    </div>
  );
}

const DnsLookupTool = () => {
  const [domain, setDomain] = useState('google.com');
  const [type, setType] = useState('A');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const performLookup = async () => {
    setLoading(true);
    setError('');
    setData(null);
    
    try {
      // Using Google DNS-over-HTTPS API
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
      const result = await response.json();
      if (result.Status !== 0) {
         setError(`DNS Error Code: ${result.Status} (NXDOMAIN or ServFail)`);
      } else {
         setData(result);
      }
    } catch (err) {
      setError('Failed to fetch DNS data. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row gap-4">
         <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-grow bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded focus:border-brand-accent outline-none font-mono placeholder-slate-400"
            placeholder="example.com"
          />
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded focus:border-brand-accent outline-none"
          >
            <option value="A">A (IPv4)</option>
            <option value="AAAA">AAAA (IPv6)</option>
            <option value="MX">MX (Mail)</option>
            <option value="TXT">TXT (Text)</option>
            <option value="NS">NS (Nameserver)</option>
            <option value="CNAME">CNAME</option>
          </select>
          <button 
            onClick={performLookup}
            disabled={loading}
            className="bg-brand-cloud text-white font-bold px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center space-x-2 transition-colors"
          >
             {loading ? <RefreshCw className="animate-spin" size={18}/> : <Globe size={18}/>}
             <span>Lookup</span>
          </button>
       </div>

       {error && (
         <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-4 rounded flex items-center space-x-2">
           <AlertCircle size={18} />
           <span>{error}</span>
         </div>
       )}

       {data && (
         <div className="bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 overflow-hidden">
           <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
             <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Answer Section</span>
             <span className="text-xs font-mono text-brand-accent">Recursion Available: {data.RA ? 'Yes' : 'No'}</span>
           </div>
           {data.Answer ? (
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-200/50 dark:bg-slate-800/50">
                    <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">TTL</th>
                    <th className="px-4 py-2">Data</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {data.Answer.map((record: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-100 dark:hover:bg-slate-800/30 font-mono">
                        <td className="px-4 py-2 text-slate-600 dark:text-brand-muted truncate max-w-[120px]" title={record.name}>{record.name}</td>
                        <td className="px-4 py-2 text-slate-900 dark:text-white">{type} ({record.type})</td>
                        <td className="px-4 py-2 text-slate-600 dark:text-brand-muted">{record.TTL}</td>
                        <td className="px-4 py-2 text-brand-net break-all">{record.data}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
             </div>
           ) : (
             <div className="p-4 text-slate-500 dark:text-brand-muted text-center">No answer records returned from authority.</div>
           )}
         </div>
       )}
    </div>
  );
};

const Tools: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator size={24} className="text-brand-net"/>;
      case 'Binary': return <Binary size={24} className="text-brand-cloud"/>;
      case 'Radar': return <Radar size={24} className="text-red-400"/>;
      case 'Globe': return <Globe size={24} className="text-brand-accent"/>;
      case 'Lock': return <Lock size={24} className="text-yellow-500 dark:text-yellow-400"/>;
      case 'Shield': return <Shield size={24} className="text-purple-500 dark:text-purple-400"/>;
      default: return <Wrench size={24} />;
    }
  };

  const renderToolContent = () => {
      switch(activeToolId) {
          case 'tool-1': return <SubnetCalculatorTool />;
          case 'tool-2': return <CidrConverterTool />;
          case 'tool-3': return <PortScannerTool />;
          case 'tool-4': return <DnsLookupTool />;
          default: return <div className="text-center py-8 text-brand-muted">Interface module not found.</div>;
      }
  };

  const activeToolDef = TOOLS.find(t => t.id === activeToolId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-3">
          <Wrench className="text-brand-accent" size={32} />
          <span>Tools Dashboard</span>
        </h1>
        <p className="text-slate-600 dark:text-brand-muted">Practical utilities for network diagnostics and security assessment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <div key={tool.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col hover:border-brand-accent/40 transition-all group shadow-sm dark:shadow-none">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                {getIcon(tool.icon)}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                tool.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900' :
                tool.status === 'Beta' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900' :
                'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}>
                {tool.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h3>
            <p className="text-sm text-slate-600 dark:text-brand-muted mb-6 flex-grow">{tool.description}</p>
            
            <button 
              onClick={() => setActiveToolId(tool.id)}
              disabled={tool.status === 'Coming Soon'}
              className={`w-full py-2 rounded font-medium text-sm transition-colors ${
                tool.status === 'Coming Soon' 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-brand-accent hover:text-brand-dark'
              }`}
            >
              {tool.status === 'Coming Soon' ? 'In Development' : 'Launch Tool'}
            </button>
          </div>
        ))}
      </div>

      {/* Tool Modal */}
      {activeToolId && activeToolDef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 dark:bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-brand-surface border border-slate-200 dark:border-slate-700 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                {getIcon(activeToolDef.icon)}
                <span>{activeToolDef.name}</span>
              </h3>
              <button onClick={() => setActiveToolId(null)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
               <div className="text-center mb-6">
                 <p className="text-slate-500 dark:text-brand-muted text-sm">
                   Running instance: <span className="text-brand-accent font-mono">v2.4.1-stable</span>
                 </p>
               </div>

               <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700/50">
                  {renderToolContent()}
               </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-end">
               <button onClick={() => setActiveToolId(null)} className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded text-sm border border-slate-200 dark:border-slate-700 transition-colors">
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