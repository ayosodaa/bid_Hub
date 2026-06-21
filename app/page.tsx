import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-app-secondary flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-bid rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                <path d="M3 14L9 4L15 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="4" r="1.8" fill="#fff"/>
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-semibold text-app-primary">BID Hub</h1>
              <p className="text-sm text-app-tertiary">Entrepreneur Platform</p>
            </div>
          </div>
          <p className="text-app-secondary text-sm mt-2">
            Select your access level to continue
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Entrepreneur Access */}
          <Link
            href="/dashboard"
            className="card-bid p-6 hover:border-bid transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-bid-light flex items-center justify-center mb-4 group-hover:bg-bid transition-colors">
              <svg className="w-5 h-5 text-bid group-hover:text-white transition-colors" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-lg font-medium text-app-primary mb-1">Entrepreneur</h2>
            <p className="text-xs text-app-secondary">
              Access your dashboard, training, deliverables, and schedule.
            </p>
          </Link>

          {/* Admin Access */}
          <Link
            href="/admin"
            className="card-bid p-6 hover:border-bid transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-bid-light flex items-center justify-center mb-4 group-hover:bg-bid transition-colors">
              <svg className="w-5 h-5 text-bid group-hover:text-white transition-colors" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
            </div>
            <h2 className="text-lg font-medium text-app-primary mb-1">Admin</h2>
            <p className="text-xs text-app-secondary">
              Manage entrepreneurs, trainers, programs, and reporting.
            </p>
          </Link>
        </div>

        <p className="text-center text-xs text-app-tertiary">
          This is a demo with mock data. No authentication required.
        </p>
      </div>
    </div>
  );
}
