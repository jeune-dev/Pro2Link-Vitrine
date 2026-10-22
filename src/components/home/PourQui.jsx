import Section, { SectionHeading } from '../marketing/Section.jsx';
import { PROFILS } from '../../content/site.js';

/** Pour qui : colonnes typographiques séparées par des filets, sans cartes ni pictogrammes. */
export default function PourQui() {
  return (
    <Section id="entreprises" labelledBy="titre-profils">
      <SectionHeading
        id="titre-profils"
        numero="05"
        surtitre="Entreprises concernées"
        titre="Pour celles qui achètent, celles qui vendent, et celles qui font les deux."
      />
      <ul className="mt-14 grid border-t border-[var(--site-filet)] sm:grid-cols-2 lg:grid-cols-5">
        {PROFILS.map(({ titre, texte }, i) => (
          <li
            key={titre}
            data-revele
            style={{ '--rang': i }}
            className="border-b border-[var(--site-filet)] py-7 sm:pr-8 lg:border-b-0 lg:border-l lg:px-6 lg:pt-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <p className="mono text-[12.5px] text-texte-discret">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 text-[17px] font-semibold leading-snug text-[var(--site-encre)]">{titre}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-texte-secondaire">{texte}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
