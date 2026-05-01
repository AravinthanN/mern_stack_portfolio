type SectionTitleProps = {
  children: string;
  light?: boolean;
};

export default function SectionTitle({ children, light = false }: SectionTitleProps) {
  return (
    <h2 className={`font-[family-name:var(--font-sora)] text-2xl font-semibold ${light ? "text-primary" : "text-secondary"}`}>
      {children}
    </h2>
  );
}
