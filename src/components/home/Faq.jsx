import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Section, { SectionHeading } from '../marketing/Section.jsx';
import { FAQ } from '../../content/site.js';
import { config } from '../../utils/config.js';

/** Une question : bouton (aria-expanded) + réponse dont la hauteur s'anime en CSS. */
function Question({ q, r, ouvert, onBasculer }) {
  const id = useId();
  return (
    <div className="border-b border-[var(--site-filet)]">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={ouvert}
          aria-controls={`${id}-r`}
          onClick={onBasculer}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold text-[var(--site-encre)]"
        >
          <span className="lien-souligne">{q}</span>
          <span
            aria-hidden
            className={`flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--site-filet)] transition-[transform,background-color,color] duration-200 ${
              ouvert ? 'rotate-45 border-primaire bg-primaire text-sur-primaire' : 'text-texte-secondaire group-hover:border-primaire group-hover:text-primaire'
            }`}
          >
            <Plus className="size-3.5" strokeWidth={2.5} />
          </span>
        </button>
      </h3>
      <div id={`${id}-r`} role="region" aria-labelledby={`${id}-q`} className="repliable" data-ouvert={ouvert} inert={!ouvert}>
        <div>
          <p className="max-w-2xl pb-6 pr-12 text-[15.5px] leading-relaxed text-texte-secondaire">{r}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [ouvert, setOuvert] = useState(0);
  return (
    <Section id="faq" labelledBy="titre-faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="titre-faq"
            numero="07"
            surtitre="Questions fréquentes"
            titre="Ce qu’on nous demande le plus souvent."
          />
          <p className="mt-6 text-[15px] leading-relaxed text-texte-secondaire" data-revele>
            Vous ne trouvez pas votre réponse ?{' '}
            {config.contactEmail
              ? <>Écrivez-nous à <a href={`mailto:${config.contactEmail}`} className="font-semibold text-primaire lien-souligne">{config.contactEmail}</a>.</>
              : <>Le plus simple est de <Link to="/inscription" className="font-semibold text-primaire lien-souligne">créer l’espace de votre entreprise</Link> et de découvrir la plateforme.</>}
          </p>
        </div>
        <div className="border-t border-[var(--site-filet)]" data-revele>
          {FAQ.map(({ q, r }, i) => (
            <Question key={q} q={q} r={r} ouvert={ouvert === i} onBasculer={() => setOuvert(ouvert === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </Section>
  );
}
