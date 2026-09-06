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
        <h1 className="text-3xl font-bold text-white mb-2">Password Resets</h1>
        <p className="text-gray-400">Manage user password reset requests.</p>
      </div>

      <div className="glass bg-black/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
                  <tr key={req.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                      {req.id.split("-")[0]}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {req.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          req.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-green-500/10 text-green-400 border-green-500/20"
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
                            className="px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white text-xs font-medium rounded transition-colors"
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
