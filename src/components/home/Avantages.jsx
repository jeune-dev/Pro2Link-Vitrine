import Section, { SectionHeading } from '../marketing/Section.jsx';
import { AVANTAGES, SIX_QUESTIONS } from '../../content/site.js';

/**
 * Avantages, composition asymétrique : à gauche les bénéfices en liste
 * sobre ; à droite, les six questions auxquelles chaque entreprise doit
 * pouvoir répondre (cahier des charges § 29), en grille de registre.
 */
export default function Avantages() {
  return (
    <Section fond="papier" labelledBy="titre-avantages" filet>
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            id="titre-avantages"
            numero="06"
            surtitre="Pourquoi Pro2Link"
            titre="Moins de temps perdu,"
            accent="plus de visibilité."
          />
          <dl className="mt-10 space-y-6">
            {AVANTAGES.map(({ titre, texte, icone: Icone }, i) => (
              <div key={titre} className="grid grid-cols-[1.75rem_1fr] gap-x-3" data-revele style={{ '--rang': i }}>
                <Icone className="mt-0.5 size-[18px] text-primaire" aria-hidden />
                <div>
                  <dt className="font-semibold text-[var(--site-encre)]">{titre}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-texte-secondaire">{texte}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div data-revele>
          <p className="repere"><b>?</b>Chaque entreprise sait, à tout moment…</p>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-carte border border-[var(--site-filet)] bg-[var(--site-filet)] sm:grid-cols-2">
            {SIX_QUESTIONS.map(({ question, reponse }, i) => (
              <div key={question} className="bg-surface px-6 py-7">
                <p className="mono text-[11.5px] text-texte-discret">{String(i + 1).padStart(2, '0')}</p>
                <dt className="titre-affiche mt-3 text-[22px]">{question}.</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-texte-secondaire">{reponse}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
