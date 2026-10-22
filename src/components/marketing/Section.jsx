/** Section de la vitrine avec en-tête cohérent (sur-titre, titre, introduction). */
export function SectionHeading({ surtitre, titre, intro, centre = true, id }) {
  return (
    <div className={`max-w-2xl ${centre ? 'mx-auto text-center' : ''}`}>
      {surtitre ? <p className="text-petit font-semibold uppercase tracking-[0.12em] text-secondaire-survol">{surtitre}</p> : null}
      <h2 id={id} className="mt-3 text-[28px] font-semibold leading-tight tracking-tight text-texte sm:text-[34px]">{titre}</h2>
      {intro ? <p className="mt-4 text-corps leading-relaxed text-texte-secondaire sm:text-sous-titre">{intro}</p> : null}
    </div>
  );
}

export default function Section({ id, children, fond = 'surface', className = '', labelledBy }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${fond === 'alt' ? 'bg-fond' : 'bg-surface'} py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Bandeau d'appel à l'action final. */
export function CtaBand({ titre, texte, children }) {
  return (
    <section className="bg-surface px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[24px] bg-primaire px-6 py-14 text-center sm:px-12 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border-[28px] border-white/5" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full border-[28px] border-secondaire/20" />
        <h2 className="relative mx-auto max-w-2xl text-[26px] font-semibold leading-tight text-sur-primaire sm:text-[32px]">{titre}</h2>
        {texte ? <p className="relative mx-auto mt-4 max-w-xl text-corps text-sur-primaire/85">{texte}</p> : null}
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">{children}</div>
      </div>
    </section>
  );
}
