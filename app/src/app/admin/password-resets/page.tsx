import { db } from "@/backend/lib/db";
import { passwordResetRequests } from "@/backend/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function AdminPasswordResetsPage() {
  const requests = await db
    .select()
    .from(passwordResetRequests)
    .orderBy(desc(passwordResetRequests.createdAt));

  async function resolveRequest(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    
    await db
      .update(passwordResetRequests)
      .set({ status: "RESOLVED", updatedAt: new Date() })
      .where(eq(passwordResetRequests.id, id));
      
    revalidatePath("/admin/password-resets");
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-cyan-400 tracking-tighter uppercase flex items-center gap-2">
          <span className="w-4 h-4 bg-cyan-500 animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          PASSWORD RESETS
        </h1>
        <p className="text-gray-400 mt-1 font-mono text-sm tracking-wide">SYSTEM QUERY: SECURITY PROTOCOLS</p>
      </div>

      <div className="glass bg-black/40 border border-white/10 border-l-4 border-l-cyan-500/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cyan-950/20 border-b border-cyan-900/50 text-xs font-mono font-medium text-cyan-500/70 tracking-widest uppercase">
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No password reset requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="group hover:bg-cyan-950/20 transition-colors relative">
                    <td className="px-6 py-4 font-mono text-xs text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                      {req.id.split("-")[0]}
                    </td>
                    <td className="px-6 py-4 font-medium text-white group-hover:text-cyan-100 transition-colors">
                      {req.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-[10px] font-mono tracking-widest uppercase border-l-2 ${
                          req.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500 shadow-[inset_2px_0_5px_rgba(234,179,8,0.2)]"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500 shadow-[inset_2px_0_5px_rgba(16,185,129,0.2)]"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {req.createdAt.toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      {req.status === "PENDING" && (
                        <form action={resolveRequest}>
                          <input type="hidden" name="id" value={req.id} />
                          <button
                            type="submit"
                            className="px-3 py-1 bg-cyan-950/50 hover:bg-cyan-600/30 text-cyan-400 hover:text-white text-xs font-mono font-medium border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all uppercase tracking-widest"
                          >
                            Mark Resolved
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
