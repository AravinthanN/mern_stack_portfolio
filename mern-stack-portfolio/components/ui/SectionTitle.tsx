type SectionTitleProps = {
  children: string;
  light?: boolean;
};

export default function SectionTitle({ children, light = false }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ef6548] shadow-[0_0_18px_rgba(239,101,72,0.35)]" />
      <h2 className={`font-[family-name:var(--font-sora)] text-xl font-semibold tracking-tight sm:text-2xl ${light ? "text-primary" : "text-secondary"}`}>
        {children}
      </h2>
    </div>
  );
}
