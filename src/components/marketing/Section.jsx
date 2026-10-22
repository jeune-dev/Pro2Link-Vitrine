/**
 * Briques de mise en page de la vitrine : en-tête de section (sur-titre,
 * titre d'affiche avec partie mise en avant, introduction), section claire,
 * alternée ou sombre, et bandeau d'appel à l'action.
 */
export function SectionHeading({ surtitre, titre, accent, intro, centre = true, sombre = false, id, taille = 'md' }) {
  return (
    <div className={`max-w-2xl ${centre ? 'mx-auto text-center' : ''}`}>
      {surtitre ? (
        <p className={`surtitre ${centre ? 'surtitre--centre' : ''} ${sombre ? 'surtitre--sombre' : ''}`}>{surtitre}</p>
      ) : null}
      <h2
        id={id}
        className={`titre-affiche mt-4 ${taille === 'lg' ? 'text-[32px] sm:text-[44px]' : 'text-[30px] sm:text-[40px]'} ${sombre ? 'text-white' : 'text-texte'}`}
      >
        {titre}
        {accent ? (
          <>
            {' '}
            <span className={sombre ? 'text-[var(--site-accent-clair)]' : 'text-[var(--site-accent)]'}>{accent}</span>
          </>
        ) : null}
      </h2>
      {intro ? (
        <p className={`mt-5 text-corps leading-relaxed sm:text-sous-titre ${sombre ? 'text-[var(--site-bande-texte-2)]' : 'text-texte-secondaire'}`}>{intro}</p>
      ) : null}
    </div>
  );
}

const FONDS = { surface: 'bg-surface', alt: 'bg-fond', sombre: 'bande-sombre' };

export default function Section({ id, children, fond = 'surface', className = '', labelledBy }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${FONDS[fond] || FONDS.surface} py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Bandeau d'appel à l'action : carte sombre, texte à gauche, actions à droite. */
export function CtaBand({ titre, texte, children }) {
  return (
    <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
      <div className="bande-sombre relative mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-[28px] px-6 py-12 sm:px-12 sm:py-14 lg:grid-cols-[1.4fr_1fr]">
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 size-80 rounded-full border-[36px] border-white/5" />
        <div className="relative">
          <h2 className="titre-affiche text-[26px] text-white sm:text-[34px]">{titre}</h2>
          {texte ? <p className="mt-4 max-w-xl text-corps text-[var(--site-bande-texte-2)]">{texte}</p> : null}
        </div>
        <div className="relative flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">{children}</div>
      </div>
    </section>
  );
}

/** Liste à puces « coche dans un cercle ». */
export function ListeCoches({ items, sombre = false, Icone }) {
  return (
    <ul className="space-y-5">
      {items.map(({ titre, texte }) => (
        <li key={titre} className="flex gap-4">
          <span
            className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border ${
              sombre ? 'border-white/25 text-[var(--site-accent-clair)]' : 'border-primaire/25 bg-primaire-teinte text-primaire'
            }`}
            aria-hidden
          >
            {Icone ? <Icone className="size-4" strokeWidth={2.5} /> : null}
          </span>
          <div>
            <p className={`font-semibold ${sombre ? 'text-white' : 'text-texte'}`}>{titre}</p>
            {texte ? <p className={`mt-1 text-petit leading-relaxed ${sombre ? 'text-[var(--site-bande-texte-2)]' : 'text-texte-secondaire'}`}>{texte}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
