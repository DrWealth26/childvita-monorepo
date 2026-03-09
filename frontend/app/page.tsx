"use client";

import { useState } from "react";
import { ethers } from "ethers";
import TransactionTable from "../components/TransactionTable";
import {
  getProvider,
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "../lib/blockchain";

export default function Home() {
  const [grants, setGrants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadGrants() {
    setLoading(true);
    try {
      const provider = getProvider();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const data = [];
      // Loading simulation for 20 test transactions as per the prototype spec [cite: 62, 64]
      for (let i = 1; i <= 20; i++) {
        const g = await contract.getGrant(i);
        data.push({
          id: i,
          childId: g.childId.toString(),
          caregiver: g.caregiver,
          amount: ethers.utils.formatEther(g.amount),
          verified: g.attendanceVerified,
          paid: g.paid,
        });
      }
      setGrants(data);
    } catch (err) {
      console.error("Error loading grants:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <header className="space-y-6 text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-medium tracking-wider uppercase">
            Now Live on Testnet
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            ChildVita OS
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed">
            The world’s first AI-native blockchain operating system for 
            <span className="text-white"> lifelong child financial inclusion.</span> 
            Turning every vulnerable child’s phone into a permanent, intelligent safety net. 
          </p>

          {/* Core Action: The Deployment Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={loadGrants}
              disabled={loading}
              className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Syncing OS Kernel...
                  </span>
                ) : (
                  <>
                    Deploy Guardian Network
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
            
            <a href="#docs" className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl transition-colors">
              Read Specification
            </a>
          </div>
        </header>

        {/* Impact Dashboard Section */}
        <section className="mt-20 border border-zinc-800 bg-zinc-900/30 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-8 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Live Guardian Ledger</h2>
              <p className="text-sm text-zinc-500">Real-time ZK-accountability for attendance-based micro-grant</p>
            </div>
            {grants.length > 0 && (
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Active Trials</p>
                  <p className="text-lg font-mono text-emerald-400">20 / 1,000</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Status</p>
                  <p className="text-lg font-mono text-emerald-400">Verified</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 md:p-8">
            {grants.length > 0 ? (
              <TransactionTable grants={grants} />
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="inline-block p-4 rounded-full bg-zinc-800/50">
                  <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-zinc-500 italic">Blockchain nodes idle. Click deploy to synchronize the ChildVita ledger.</p>
              </div>
            )}
          </div>
        </section>

        {/* Mission Footnote */}
        <footer className="mt-16 text-center text-zinc-600 text-sm">
          <p>Built as an open-source Digital Public Good under MIT License</p>
        </footer>
      </div>
    </main>
  );
}