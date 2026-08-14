export default function Eyebrow({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.25em] text-ink/50 ${className}`}
    >
      <span className="mr-3 text-amber">{index}</span>— {label}
    </p>
  );
}
