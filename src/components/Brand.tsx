export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand" aria-label="KaamKaaj home">
      <span className="brand-mark" aria-hidden="true">
        <span>K</span>
        <span>K</span>
      </span>
      {!compact && <span className="brand-word">KaamKaaj</span>}
    </span>
  );
}
