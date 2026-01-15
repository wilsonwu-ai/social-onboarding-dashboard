import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockSubmissions, type Submission } from '../data/mockSubmissions';
import {
  LogOut,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Building2,
  Calendar,
  ChevronRight,
} from 'lucide-react';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  in_review: { label: 'In Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-700', icon: CheckCircle },
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSubmissions = mockSubmissions.filter((submission) => {
    const matchesSearch =
      submission.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.businessType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockSubmissions.length,
    new: mockSubmissions.filter((s) => s.status === 'new').length,
    inReview: mockSubmissions.filter((s) => s.status === 'in_review').length,
    completed: mockSubmissions.filter((s) => s.status === 'completed' || s.status === 'approved').length,
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

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src="/social-onboarding-dashboard/snappy-logo.png"
                alt="Snappy Logo"
                className="w-10 h-10 rounded-xl"
              />
              <div>
                <h1 className="text-lg font-bold text-foreground">Snappy Dashboard</h1>
                <p className="text-xs text-muted-foreground">Manage submissions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.new}</p>
                <p className="text-sm text-muted-foreground">New</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.inReview}</p>
                <p className="text-sm text-muted-foreground">In Review</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business name..."
                className="input pl-12"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input pl-12 pr-8 appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="card">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Submissions ({filteredSubmissions.length})
          </h2>

          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No submissions found</p>
            </div>
          ) : (
            <div className="space-y-3">
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

function SubmissionRow({
  submission,
  formatDate,
}: {
  submission: Submission;
  formatDate: (date: string) => string;
}) {
  const status = statusConfig[submission.status];
  const StatusIcon = status.icon;

  return (
    <Link
      to={`/submission/${submission.id}`}
      className="block p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {submission.businessName}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-muted-foreground capitalize">
                {submission.businessType === 'restaurant'
                  ? `${submission.cuisine || 'Restaurant'}`
                  : submission.otherBusinessType || 'Business'}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(submission.submittedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </span>
          <Eye className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}
