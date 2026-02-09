import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSubmissions } from '../services/submissions';
import type { Submission } from '../data/mockSubmissions';
import {
  LogOut,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Calendar,
  ChevronRight,
  Loader2,
} from 'lucide-react';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500' },
  in_review: { label: 'In Review', color: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500' },
  approved: { label: 'Approved', color: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500' },
  completed: { label: 'Completed', color: 'bg-gray-50 text-gray-600', dot: 'bg-gray-400' },
};

const filterTabs = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'completed', label: 'Completed' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setLoading(true);
        setError(null);
        const data = await getSubmissions();
        setSubmissions(data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Failed to load submissions. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.businessType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === 'new').length,
    inReview: submissions.filter((s) => s.status === 'in_review').length,
    completed: submissions.filter((s) => s.status === 'completed' || s.status === 'approved').length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-subtle">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border-subtle sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <img
                src="/social-onboarding-dashboard/snappy-logo.png"
                alt="Snappy Logo"
                className="w-8 h-8 rounded-lg"
              />
              <h1 className="text-sm font-semibold text-foreground">Snappy Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                {userInitial}
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">Submissions</h2>
          <p className="text-sm text-muted-foreground mt-1">Review and manage onboarding submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" value={stats.total} dot="bg-gray-400" icon={Users} />
          <StatCard label="New" value={stats.new} dot="bg-blue-500" icon={AlertCircle} />
          <StatCard label="In Review" value={stats.inReview} dot="bg-amber-500" icon={Clock} />
          <StatCard label="Completed" value={stats.completed} dot="bg-emerald-500" icon={CheckCircle} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                  statusFilter === tab.value
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search businesses..."
              className="input pl-9"
            />
          </div>
        </div>

        {/* Submissions List */}
        <div className="card p-0">
          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 text-gray-300 mx-auto mb-3 animate-spin" />
              <p className="text-sm text-muted-foreground">Loading submissions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <AlertCircle className="w-8 h-8 text-danger mx-auto mb-3" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No submissions found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredSubmissions.map((submission) => (
                <SubmissionRow key={submission.id} submission={submission} formatDate={formatDate} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  dot,
  icon: Icon,
}: {
  label: string;
  value: number;
  dot: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        </div>
        <Icon className="w-4 h-4 text-gray-300" />
      </div>
      <p className="text-3xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function SubmissionRow({
  submission,
  formatDate,
}: {
  submission: Submission;
  formatDate: (date: string) => string;
}) {
  const status = statusConfig[submission.status];
  const initials = submission.businessName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link
      to={`/submission/${submission.id}`}
      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-medium text-gray-500">
          {initials}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className="font-medium text-foreground text-sm truncate">
              {submission.businessName}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground capitalize">
              {submission.businessType === 'restaurant'
                ? `${submission.cuisine || 'Restaurant'}`
                : submission.otherBusinessType || 'Business'}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(submission.submittedAt)}
            </span>
          </div>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
    </Link>
  );
}
