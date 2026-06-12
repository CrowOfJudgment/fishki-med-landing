export default function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[330px] rounded-[3rem] border-[7px] border-[#002838] bg-[#002838] p-2 shadow-[0_32px_80px_rgba(0,40,56,0.28)]">
      <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#002838]" />
      <div className="relative min-h-[620px] overflow-hidden rounded-[2.35rem] bg-[#F4F7F5]">
        <div className="flex h-9 items-center justify-between px-6 pt-2 text-[9px] font-bold text-[#002838]">
          <span>9:41</span>
          <span className="tracking-widest">● ◔</span>
        </div>
        {children}
      </div>
    </div>
  );
}
