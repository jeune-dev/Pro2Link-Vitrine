import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { classesBouton } from '../common/Button.jsx';

/**
 * Briques de mise en page de la vitrine.
 * - SectionHeading : repère numéroté (référence de document), titre d'affiche,
 *   introduction. La partie `accent` du titre est en bleu de marque.
 * - Section : section claire, « papier » ou bande pleine.
 * - CtaBand : appel à l'action final, sobre, séparé par un filet.
 */
export function SectionHeading({ numero, surtitre, titre, accent, intro, centre = false, sombre = false, id, taille = 'md', className = '' }) {
  return (
    <div className={`max-w-2xl ${centre ? 'mx-auto text-center' : ''} ${className}`} data-revele>
      {surtitre ? (
        <p className={`repere ${sombre ? '!text-white/70 [&>b]:!text-[#2DD4BF]' : ''}`}>
          {numero ? <b>{numero}</b> : null}
          {surtitre}
        </p>
      ) : null}
      <h2
        id={id}
        className={`titre-affiche mt-4 ${taille === 'lg' ? 'text-[34px] sm:text-[46px]' : 'text-[30px] sm:text-[40px]'} ${sombre ? '!text-white' : ''}`}
      >
        {titre}
        {accent ? <> <span className={sombre ? 'text-[#8AB9E8]' : 'text-primaire'}>{accent}</span></> : null}
      </h2>
      {intro ? (
        <p className={`texte-equilibre mt-5 text-[17px] leading-relaxed ${sombre ? 'text-[var(--site-bande-texte-2)]' : 'text-texte-secondaire'}`}>{intro}</p>
      ) : null}
    </div>
  );
}

const FONDS = { surface: 'bg-surface', papier: 'fond-papier', alt: 'fond-papier', sombre: 'bande-pleine' };

export default function Section({ id, children, fond = 'surface', className = '', labelledBy, filet = false }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${FONDS[fond] || FONDS.surface} py-20 sm:py-28 ${filet ? 'border-t border-[var(--site-filet)]' : ''} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Appel à l'action final : titre à gauche, actions à droite, sans carte décorative. */
export function CtaBand({ titre, texte, children }) {
  return (
    <section className="border-t border-[var(--site-filet)] bg-surface">
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.5fr_1fr] lg:px-8" data-revele>
        <div>
          <h2 className="titre-affiche text-[30px] sm:text-[42px]">{titre}</h2>
          {texte ? <p className="texte-equilibre mt-5 max-w-xl text-[17px] leading-relaxed text-texte-secondaire">{texte}</p> : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">{children}</div>
      </div>
    </section>
  );
}

/** Liste à puces « coche dans un cercle » (utilisée sur la bande pleine). */
export function ListeCoches({ items, sombre = false, Icone }) {
  return (
    <ul className="space-y-6">
      {items.map(({ titre, texte }, i) => (
        <li key={titre} className="flex gap-4" data-revele style={{ '--rang': i }}>
          <span
            className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border ${
              sombre ? 'border-white/30 text-[#2DD4BF]' : 'border-primaire/25 bg-primaire-teinte text-primaire'
            }`}
            aria-hidden
          >
            {Icone ? <Icone className="size-3.5" strokeWidth={2.75} /> : null}
          </span>
          <div>
            <p className={`font-semibold ${sombre ? 'text-white' : 'text-[var(--site-encre)]'}`}>{titre}</p>
            {texte ? <p className={`mt-1 text-[15px] leading-relaxed ${sombre ? 'text-[var(--site-bande-texte-2)]' : 'text-texte-secondaire'}`}>{texte}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Lien texte avec flèche (actions secondaires). */
export function LienFleche({ to, children, className = '' }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-1.5 text-[15px] font-semibold text-primaire ${className}`}>
      <span className="lien-souligne">{children}</span> <ArrowRight className="fleche size-4" aria-hidden />
    </Link>
  );
}

export { classesBouton };
