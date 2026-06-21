# BID Hub - Entrepreneur Platform

A production-grade Next.js application for managing entrepreneurs, trainers, programs, and content in an accelerator program.

## Project Structure

```
/app
  /(entrepreneur)/           # Entrepreneur-facing routes
    /dashboard               # Main dashboard with stats and activity
    /training                # Video training library
    /profile                 # User profile and business details
    /deliverables            # Submit and track deliverables
    /schedule                # Calendar and session booking
    /tools                   # Entrepreneur tools (BMC, financial modeler, etc.)
    /tracker                 # Entrepreneur overview (cohort view)
    layout.tsx               # Sidebar + topbar layout

  /(admin)/                  # Admin console routes
    /                        # Admin dashboard
    /entrepreneurs           # Manage all entrepreneurs
    /trainers                # Manage trainers and assignments
    /programs                # Programs and modules
    /assignments             # Assign entrepreneurs to trainers/programs
    /content                 # Content library management
    /documents               # Generate investment memos, DD reports
    /reporting               # Analytics and reporting
    layout.tsx               # Admin sidebar + topbar layout

  layout.tsx                 # Root layout
  globals.css                # BID brand theme and utilities

/components
  /shared                    # Shared components
    stat-card.tsx            # Stat display card
    badge.tsx                # Badge with BID variants
    avatar-bid.tsx           # Avatar with color schemes
    progress-bar.tsx         # Progress indicator
    modal.tsx                # Dialog/Modal component
    /layout
      sidebar.tsx           # Navigation sidebar
      topbar.tsx             # Top navigation bar

/lib
  /types
    index.ts                 # TypeScript interfaces
  /mock-data
    entrepreneurs.ts         # Entrepreneur mock data
    trainers.ts              # Trainer mock data
    programs.ts              # Programs and cohorts
    deliverables.ts          # Deliverable records
    sessions.ts              # Sessions and calendar events
    documents.ts             # Generated documents
    activities.ts            # Activity feed and notifications
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom BID brand theme
- **UI Components**: shadcn/ui (Radix primitives)
- **Form Handling**: React Hook Form + Zod (validation)
- **Icons**: Lucide React

## Brand Colors

The application uses the BID brand palette:

- **Primary**: `#842751` (BID maroon)
- **Light**: `#f5e8ef` (Light pink)
- **Dark**: `#5c1a38` (Dark maroon)
- **Mid**: `#a8346a` (Medium accent)
- **Accent**: `#e8c5d6` (Soft pink)

Additional semantic colors for success, warning, info, and error states.

## Getting Started

```bash
npm install
npm run dev
```

The application will redirect to `/dashboard` (entrepreneur view).

## What's Mocked vs Real

### Currently Mocked (In-Memory)

| Feature | Status |
|---------|--------|
| Data display | In-memory mock files (`/lib/mock-data/`) |
| Authentication | Simple redirect (no real auth) |
| Forms | Validate + show toast notification |
| File uploads | Toast only (no storage) |
| PDF generation | Toast only (no real generation) |
| Search | Visual only (no filtering) |

### Ready for Backend Integration

The mock data is structured to match what a real Supabase database would return:

1. **Tables needed**:
   - `entrepreneurs`
   - `trainers`
   - `programs`
   - `cohorts`
   - `modules`
   - `deliverables`
   - `sessions`
   - `documents`
   - `activities`
   - `funding_rounds`

2. **Authentication**: Supabase Auth with role-based access (entrepreneur/trainer/admin)

3. **Storage**: Supabase Storage for file uploads (deliverables, documents)

## Production-Ready Checklist

To make this fully production-ready:

1. **Backend Integration**
   - [ ] Create Supabase tables with proper schema
   - [ ] Add RLS (Row Level Security) policies
   - [ ] Connect all CRUD operations to Supabase

2. **Authentication**
   - [ ] Implement Supabase Auth
   - [ ] Add role-based access control
   - [ ] Protect routes with middleware

3. **File Handling**
   - [ ] Set up Supabase Storage buckets
   - [ ] Implement real file upload/download
   - [ ] Add file type validation and size limits

4. **PDF Generation**
   - [ ] Server-side investment memo generation
   - [ ] DD report generation
   - [ ] Progress report generation

5. **Real-time Features**
   - [ ] Supabase Realtime for live updates
   - [ ] Notification system
   - [ ] Activity feed subscriptions

6. **Additional Features**
   - [ ] Email notifications (session confirmations, deadlines)
   - [ ] Full-text search
   - [ ] Export functionality (CSV, PDF)
   - [ ] Mobile responsive improvements

## Routes

### Entrepreneur App
- `/dashboard` - Overview with stats, activity, upcoming events
- `/training` - Video library with progress tracking
- `/profile` - Business details and fundraising history
- `/deliverables` - Upload and track submissions
- `/schedule` - Calendar and session booking
- `/tools` - Interactive tools (BMC, financial modeler, etc.)
- `/tracker` - Cohort overview

### Admin Console
- `/admin` - Platform overview and pending actions
- `/admin/entrepreneurs` - Manage all entrepreneurs
- `/admin/trainers` - Manage trainers and workload
- `/admin/programs` - Programs and modules
- `/admin/assignments` - Assign trainers/programs
- `/admin/content` - Content library management
- `/admin/documents` - Generate documents
- `/admin/reporting` - Analytics and export
