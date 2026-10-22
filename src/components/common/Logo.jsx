/**
 * Identité textuelle PROVISOIRE de Pro2Link (aucun logo officiel fourni) :
 * deux maillons qui se croisent (acheteur / fournisseur) + nom. À remplacer
 * par le logo définitif dans src/assets lorsqu'il sera disponible.
 */
export function LogoMark({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect width="32" height="32" rx="7" fill="var(--pl-primaire)" />
      <rect x="6.5" y="11" width="11.5" height="10" rx="5" fill="none" stroke="var(--pl-sur-primaire)" strokeWidth="2.2" />
      <rect x="14" y="11" width="11.5" height="10" rx="5" fill="none" stroke="#2DD4BF" strokeWidth="2.2" />
    </svg>
  );
}

export default function Logo({ compact = false, sombre = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      {compact ? <span className="sr-only">Pro2Link</span> : (
        <span className={`text-[18px] font-[650] tracking-[-0.02em] ${sombre ? 'text-white' : 'text-[var(--site-encre)]'}`}>
          Pro<span className={sombre ? 'text-[#2DD4BF]' : 'text-[var(--site-detail)]'}>2</span>Link
        </span>
      )}
    </span>
  );
}
