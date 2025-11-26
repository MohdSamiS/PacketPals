import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Network, AlertCircle } from "lucide-react";

interface SubnetResult {
  ip: string;
  cidr: number;
  mask: string;
  network: string;
  broadcast: string;
  firstHost: string | null;
  lastHost: string | null;
  totalHosts: number;
  usableHosts: number;
}

function ipToInt(ip: string): number | null {
  const parts = ip.split(".").map((p) => Number(p));
  if (
    parts.length !== 4 ||
    parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)
  ) {
    return null;
  }
  return (
    (parts[0] << 24) +
    (parts[1] << 16) +
    (parts[2] << 8) +
    parts[3]
  ) >>> 0;
}

function intToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

function cidrToMask(cidr: number): number {
  if (cidr === 0) return 0;
  return (0xffffffff << (32 - cidr)) >>> 0;
}

function maskToString(mask: number): string {
  return intToIp(mask);
}

function calculateSubnet(cidrInput: string): SubnetResult | string {
  const parts = cidrInput.trim().split("/");
  if (parts.length !== 2) return "Invalid CIDR format. Use e.g. 192.168.1.10/24";

  const ipStr = parts[0].trim();
  const cidrNum = Number(parts[1]);

  if (Number.isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
    return "CIDR prefix must be between 0 and 32.";
  }

  const ipInt = ipToInt(ipStr);
  if (ipInt === null) {
    return "Invalid IPv4 address.";
  }

  const maskInt = cidrToMask(cidrNum);
  const networkInt = ipInt & maskInt;
  const broadcastInt = networkInt | (~maskInt >>> 0);

  const totalHosts = cidrNum === 32 ? 1 : 2 ** (32 - cidrNum);

  let firstHost: string | null = null;
  let lastHost: string | null = null;
  let usableHosts = 0;

  if (cidrNum >= 31) {
    // /31 and /32 have no traditional host range
    usableHosts = totalHosts;
  } else {
    const first = networkInt + 1;
    const last = broadcastInt - 1;
    if (first <= last) {
      firstHost = intToIp(first >>> 0);
      lastHost = intToIp(last >>> 0);
      usableHosts = totalHosts - 2;
    }
  }

  return {
    ip: ipStr,
    cidr: cidrNum,
    mask: maskToString(maskInt),
    network: intToIp(networkInt >>> 0),
    broadcast: intToIp(broadcastInt >>> 0),
    firstHost,
    lastHost,
    totalHosts,
    usableHosts,
  };
}

const IpSubnetCalculator: React.FC = () => {
  const [input, setInput] = useState("192.168.1.10/24");
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateSubnet(input);
    if (typeof res === "string") {
      setError(res);
      setResult(null);
    } else {
      setError(null);
      setResult(res);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          to="/tools"
          className="text-sm text-cyan-300 hover:text-cyan-200"
        >
          ← Back to Tools
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Network className="text-cyan-400" size={32} />
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">
            IP Subnet Calculator
          </h1>
          <p className="text-sm text-slate-400">
            Inspect IPv4 subnets, network ranges, and usable hosts using CIDR
            notation.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleCalculate}
        className="mt-6 mb-8 flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="192.168.1.10/24"
          className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2 rounded focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-cyan-500 text-slate-950 text-sm font-medium hover:bg-cyan-400"
        >
          Calculate
        </button>
      </form>

      {error && (
        <div className="mb-6 flex items-start gap-2 text-sm text-rose-400 bg-rose-950/40 border border-rose-700/60 px-3 py-2 rounded">
          <AlertCircle size={16} className="mt-[2px]" />
          <span>{error}</span>
        </div>
      )}

      {result && !error && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-slate-800 rounded-xl bg-slate-900 p-4">
            <h2 className="text-sm font-semibold text-slate-100 mb-3">
              Subnet Overview
            </h2>
            <dl className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <dt className="text-slate-400">Input IP</dt>
                <dd className="font-mono">{result.ip}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">CIDR</dt>
                <dd className="font-mono">/{result.cidr}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Subnet Mask</dt>
                <dd className="font-mono">{result.mask}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Total Addresses</dt>
                <dd className="font-mono">{result.totalHosts}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Usable Hosts</dt>
                <dd className="font-mono">{result.usableHosts}</dd>
              </div>
            </dl>
          </div>

          <div className="border border-slate-800 rounded-xl bg-slate-900 p-4">
            <h2 className="text-sm font-semibold text-slate-100 mb-3">
              Address Range
            </h2>
            <dl className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <dt className="text-slate-400">Network Address</dt>
                <dd className="font-mono">{result.network}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Broadcast Address</dt>
                <dd className="font-mono">{result.broadcast}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">First Usable Host</dt>
                <dd className="font-mono">
                  {result.firstHost ?? "N/A (/31 or /32)"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Last Usable Host</dt>
                <dd className="font-mono">
                  {result.lastHost ?? "N/A (/31 or /32)"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default IpSubnetCalculator;
