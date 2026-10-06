export default function MarketingLoading() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center py-16 animate-in fade-in duration-150 select-none">
      <div className="relative flex items-center justify-center mb-3">
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-[#2E68FB] animate-spin" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#2E68FB] animate-pulse" />
      </div>
      <span className="text-[11px] font-bold tracking-wider text-[#2E68FB] uppercase">
        Loading...
      </span>
    </div>
  );
}
