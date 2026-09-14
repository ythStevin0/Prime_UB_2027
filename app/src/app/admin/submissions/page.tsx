"use client";

import { useState, useEffect } from "react";
import { Download, Search, FileText } from "lucide-react";
import { competitionsData } from "@/frontend/data/competitions";
import { eventsData } from "@/frontend/data/events";

// Build unified list
const allActivities = [
  ...competitionsData.map(c => ({ id: c.id, title: c.title, category: 'Competition' })),
  ...eventsData.map(e => ({ id: e.id, title: `${e.title}${e.titleHighlight ? ' ' + e.titleHighlight : ''}`, category: 'Event' })),
];

type Submission = {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  status: string;
  submittedAt: string;
  registrationId: string;
  teamName: string | null;
  userName: string;
  userEmail: string;
  competitionId: string;
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch("/api/admin/submissions");
        const data = await res.json();
        if (data.success) {
          setSubmissions(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((sub) => {
    const activity = allActivities.find(a => a.id === sub.competitionId);
    const title = activity?.title || sub.competitionId;
    return (
      sub.teamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 
          className="text-4xl font-mono font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-3"
          style={{ textShadow: '2px 0px 0px rgba(220, 38, 38, 0.6), -2px 0px 0px rgba(6, 182, 212, 0.6)' }}
        >
          <span className="w-5 h-5 bg-cyan-500" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          Submissions
        </h1>
        <p 
          className="text-gray-400 mt-2 font-mono text-sm tracking-widest uppercase"
          style={{ textShadow: '1px 0px 0px rgba(220, 38, 38, 0.5), -1px 0px 0px rgba(6, 182, 212, 0.5)' }}
        >
          SYSTEM QUERY: COLLECTED WORKS.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search by team, user, or competition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#050505] border border-white/10 rounded-none text-white focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#050505] border border-white/10 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Participant</th>
                <th className="px-6 py-4 font-medium">Competition</th>
                <th className="px-6 py-4 font-medium">File Details</th>
                <th className="px-6 py-4 font-medium">Date Submitted</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center mb-2">
                      <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                    Loading submissions...
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{sub.teamName || sub.userName}</div>
                      <div className="text-xs text-gray-500">{sub.userEmail}</div>
                      {sub.teamName && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-white/10 text-[10px] rounded-none">Team</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-300">
                        {allActivities.find(a => a.id === sub.competitionId)?.title || sub.competitionId}
                      </div>
                      <div className="text-xs text-gray-500">
                        {allActivities.find(a => a.id === sub.competitionId)?.category || 'Activity'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-gray-300 font-medium truncate max-w-50" title={sub.fileName}>
                            {sub.fileName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatFileSize(sub.fileSize)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(sub.submittedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      <div className="text-xs text-gray-500 mt-0.5">
                        {new Date(sub.submittedAt).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={sub.fileUrl}
                        download={sub.fileName}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-none bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all group"
                        title="Download File"
                      >
                        <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
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
