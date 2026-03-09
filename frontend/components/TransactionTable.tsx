"use client";

type Grant = {
  id: number;
  childId: string;
  caregiver: string;
  amount: string;
  verified: boolean;
  paid: boolean;
};

export default function TransactionTable({ grants }: { grants: Grant[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/50">
      <table className="w-full text-left border-collapse bg-zinc-950/50 backdrop-blur-md">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/40">
            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Grant ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Child ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Guardian Wallet</th>
            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Amount (ETH)</th>
            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">ZK-Verification</th>
            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800/50">
          {grants.map((g) => (
            <tr key={g.id} className="group hover:bg-emerald-500/[0.02] transition-colors">
              <td className="px-6 py-4 text-sm font-mono text-zinc-400">
                #{g.id.toString().padStart(4, '0')}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" />
                  <span className="text-sm font-medium text-zinc-200">CH-{g.childId}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <code className="text-xs bg-zinc-900 px-2 py-1 rounded text-zinc-500 group-hover:text-emerald-400 transition-colors">
                  {g.caregiver.slice(0, 6)}...{g.caregiver.slice(-4)}
                </code>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-white font-mono">{g.amount}</span>
              </td>
              <td className="px-6 py-4 text-center">
                {g.verified ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Pending
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {g.paid ? (
                  <span className="text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    Settled
                  </span>
                ) : (
                  <span className="text-xs text-emerald-500 flex items-center justify-center gap-1.5 font-medium animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Executing
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}