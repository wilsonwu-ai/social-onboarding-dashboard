import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSubmissionById } from '../services/submissions';
import type { Submission } from '../data/mockSubmissions';
import {
  ArrowLeft,
  Building2,
  Instagram,
  Facebook,
  Sparkles,
  Star,
  Palette,
  Link as LinkIcon,
  Users,
  MessageCircle,
  BookOpen,
  Key,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Loader2,
} from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const XHSIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  in_review: { label: 'In Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-700', icon: CheckCircle },
};

const typographyLabels: Record<string, string> = {
  modern: 'Modern & Clean (Poppins)',
  elegant: 'Elegant & Sophisticated (Playfair Display)',
  bold: 'Bold & Dynamic (Montserrat)',
  classic: 'Classic & Timeless (Lora)',
};

const colorPaletteLabels: Record<string, string> = {
  vibrant: 'Vibrant Energy',
  earthy: 'Earthy Warmth',
  ocean: 'Ocean Breeze',
  midnight: 'Midnight Luxe',
  sunset: 'Golden Sunset',
  custom: 'Custom Colors',
};

export default function SubmissionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmission() {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getSubmissionById(id);
        setSubmission(data);
      } catch (err) {
        console.error('Error fetching submission:', err);
        setError('Failed to load submission.');
      } finally {
        setLoading(false);
      }
    }

    fetchSubmission();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-3 animate-spin" />
          <p className="text-muted-foreground">Loading submission...</p>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Submission Not Found</h2>
          <p className="text-muted-foreground mb-4">{error || "The submission you're looking for doesn't exist."}</p>
          <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[submission.status];
  const StatusIcon = status.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img
                src="/social-onboarding-dashboard/snappy-logo.png"
                alt="Snappy Logo"
                className="w-10 h-10 rounded-xl"
              />
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>

            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="w-4 h-4" />
              {status.label}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Business Header */}
        <div className="card mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{submission.businessName}</h1>
              <p className="text-muted-foreground mt-1">
                {submission.businessType === 'restaurant'
                  ? `${submission.cuisine || 'Restaurant'}`
                  : submission.otherBusinessType || 'Business'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Submitted on {formatDate(submission.submittedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Section title="Basic Information" icon={Building2}>
              <InfoRow label="Business Name" value={submission.businessName} />
              <InfoRow
                label="Business Type"
                value={
                  submission.businessType === 'restaurant'
                    ? 'Restaurant'
                    : submission.otherBusinessType || 'Other'
                }
              />
              {submission.cuisine && <InfoRow label="Cuisine" value={submission.cuisine} />}
              {submission.website && (
                <InfoRow
                  label="Website"
                  value={
                    <a
                      href={submission.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {submission.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  }
                />
              )}
            </Section>

            {/* Social Media */}
            <Section title="Social Media" icon={Instagram}>
              <InfoRow
                label="Has Existing Social"
                value={submission.hasExistingSocial ? 'Yes' : 'No'}
              />
              {submission.hasExistingSocial && submission.existingSocialAccounts && (
                <div className="mt-3 space-y-2">
                  {submission.existingSocialAccounts.map((account, idx) => (
                    <div key={idx} className="p-3 bg-muted rounded-lg flex items-center gap-3">
                      {account.platform === 'instagram' && <Instagram className="w-5 h-5 text-pink-500" />}
                      {account.platform === 'facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                      {account.platform === 'tiktok' && <TikTokIcon className="w-5 h-5" />}
                      {account.platform === 'xhs' && <XHSIcon className="w-5 h-5 text-red-500" />}
                      <div>
                        <p className="font-medium text-sm">{account.username}</p>
                        <a
                          href={account.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          {account.link}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!submission.hasExistingSocial && (
                <>
                  <InfoRow label="Preferred Username" value={submission.preferredUsername || 'N/A'} />
                  {submission.preferredUsernameAlt && (
                    <InfoRow label="Alt Username" value={submission.preferredUsernameAlt} />
                  )}
                  <InfoRow
                    label="Selected Platforms"
                    value={submission.selectedPlatforms?.join(', ') || 'None'}
                  />
                </>
              )}
              {submission.wantsNewSocial !== undefined && (
                <InfoRow label="Wants New Accounts" value={submission.wantsNewSocial ? 'Yes' : 'No'} />
              )}
            </Section>

            {/* Key Offerings */}
            <Section title="Key Offerings" icon={Sparkles}>
              <div className="flex flex-wrap gap-2">
                {submission.keyOfferings.map((offering, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {offering}
                  </span>
                ))}
              </div>
              {submission.customOffering && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Custom offering:</p>
                  <p className="text-sm font-medium">{submission.customOffering}</p>
                </div>
              )}
            </Section>

            {/* USPs */}
            <Section title="Unique Selling Points" icon={Star}>
              <div className="flex flex-wrap gap-2">
                {submission.uniqueSellingPoints.map((usp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {usp}
                  </span>
                ))}
              </div>
              {submission.customUSP && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Custom USP:</p>
                  <p className="text-sm font-medium">{submission.customUSP}</p>
                </div>
              )}
            </Section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Brand Design */}
            <Section title="Brand Design" icon={Palette}>
              <InfoRow
                label="Typography"
                value={typographyLabels[submission.selectedTypography] || submission.selectedTypography}
              />
              <InfoRow
                label="Color Palette"
                value={colorPaletteLabels[submission.selectedColorPalette] || submission.selectedColorPalette}
              />
              {submission.customColors && (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground mb-2">Custom Colors:</p>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-lg border"
                      style={{ backgroundColor: submission.customColors.primary }}
                      title={`Primary: ${submission.customColors.primary}`}
                    />
                    <div
                      className="w-10 h-10 rounded-lg border"
                      style={{ backgroundColor: submission.customColors.secondary }}
                      title={`Secondary: ${submission.customColors.secondary}`}
                    />
                    <div
                      className="w-10 h-10 rounded-lg border"
                      style={{ backgroundColor: submission.customColors.accent }}
                      title={`Accent: ${submission.customColors.accent}`}
                    />
                  </div>
                </div>
              )}
              {submission.inspirationLinks && submission.inspirationLinks.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground mb-2">Inspiration Links:</p>
                  {submission.inspirationLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1 mb-1"
                    >
                      <LinkIcon className="w-3 h-3" />
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </Section>

            {/* Target Audience */}
            <Section title="Target Audience" icon={Users}>
              <div className="flex flex-wrap gap-2">
                {submission.targetAudience.map((audience, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-muted text-foreground rounded-full text-sm"
                  >
                    {audience}
                  </span>
                ))}
              </div>
              {submission.customAudience && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Custom audience:</p>
                  <p className="text-sm font-medium">{submission.customAudience}</p>
                </div>
              )}
            </Section>

            {/* Core Message */}
            <Section title="Core Message" icon={MessageCircle}>
              <p className="text-foreground font-medium italic">"{submission.coreMessage}"</p>
            </Section>

            {/* Business Story */}
            <Section title="Business Story" icon={BookOpen}>
              <p className="text-muted-foreground leading-relaxed">{submission.businessStory}</p>
            </Section>

            {/* Access Preferences */}
            {submission.accessPreference && (
              <Section title="Access Preference" icon={Key}>
                <InfoRow
                  label="Method"
                  value={
                    submission.accessPreference === 'credentials'
                      ? 'Share Login Details'
                      : 'Grant Admin Access (Meta Business Suite)'
                  }
                />
              </Section>
            )}

            {/* Competitors */}
            {submission.localCompetitors && submission.localCompetitors.some(c => c) && (
              <Section title="Local Competitors" icon={Building}>
                <ul className="space-y-1">
                  {submission.localCompetitors
                    .filter(c => c)
                    .map((competitor, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        • {competitor}
                      </li>
                    ))}
                </ul>
              </Section>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="card mt-6">
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">Mark as In Review</button>
            <button className="btn-secondary">Approve</button>
            <button className="px-6 py-3 border-2 border-border rounded-xl font-semibold text-foreground hover:bg-muted transition-all">
              Export Details
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-foreground text-sm font-medium text-right">{value}</span>
    </div>
  );
}
