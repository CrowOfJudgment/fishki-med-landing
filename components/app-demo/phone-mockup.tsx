export default function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate mx-auto h-[654px] w-[330px] max-w-full overflow-hidden rounded-[2.75rem] border-[3px] border-[#002838] bg-[#002838] p-[3px] shadow-[0_32px_80px_rgba(0,40,56,0.28)]">
      <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#002838]" />
      <div className="ios-phone-screen relative isolate h-full overflow-hidden rounded-[2.4rem] bg-[#F1F5F3] [clip-path:inset(0_round_2.4rem)]">
        <div className="flex h-9 items-center justify-between px-6 pt-2 text-[9px] font-bold text-[#002838]">
          <span>9:41</span>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="currentColor">
              <rect x="1" y="8" width="2.2" height="3" rx=".6" />
              <rect x="5" y="6" width="2.2" height="5" rx=".6" />
              <rect x="9" y="3.5" width="2.2" height="7.5" rx=".6" />
              <rect x="13" y="1" width="2.2" height="10" rx=".6" />
            </svg>
            <svg viewBox="0 0 18 13" className="h-2.5 w-3.5" fill="none">
              <path d="M2 4.5a10.5 10.5 0 0 1 14 0M4.7 7.2a6.6 6.6 0 0 1 8.6 0M7.3 9.8a2.6 2.6 0 0 1 3.4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <circle cx="9" cy="11.2" r="1" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 25 12" className="h-2.5 w-5" fill="none">
              <rect x=".8" y=".8" width="20" height="10.4" rx="3" stroke="currentColor" strokeWidth="1.3" />
              <rect x="2.7" y="2.7" width="15.8" height="6.6" rx="1.7" fill="currentColor" />
              <path d="M22.2 4.1c1 .3 1.6 1 1.6 1.9s-.6 1.6-1.6 1.9V4.1Z" fill="currentColor" />
            </svg>
          </span>
        </div>
        <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
