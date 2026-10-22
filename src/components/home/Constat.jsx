import { ArrowRight } from 'lucide-react';
import Section, { SectionHeading } from '../marketing/Section.jsx';
import { AVANT_APRES, PROBLEMES } from '../../content/site.js';

/**
 * Le constat, en mise en page éditoriale : une affirmation à gauche, la liste
 * numérotée des difficultés à droite (filets, pas de cartes), puis le parcours
 * unique que propose Pro2Link.
 */
export default function Constat() {
  return (
    <Section fond="papier" labelledBy="titre-constat" filet>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          id="titre-constat"
          numero="01"
          surtitre="Le constat"
          titre="Les commandes passent encore par WhatsApp, les appels, Excel et le papier."
          intro="Chaque outil garde une partie de l’information. Personne n’a la vue complète : ni l’acheteur, ni le fournisseur."
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <ol className="border-t border-[var(--site-filet)]">
          {PROBLEMES.map(({ titre, texte }, i) => (
            <li
              key={titre}
              data-revele
              style={{ '--rang': i }}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-[var(--site-filet)] py-6 sm:grid-cols-[3rem_14rem_1fr] sm:gap-x-6"
            >
              <span className="mono pt-0.5 text-[13px] text-texte-discret">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-semibold text-[var(--site-encre)]">{titre}</h3>
              <p className="col-start-2 mt-1 text-[15px] leading-relaxed text-texte-secondaire sm:col-start-3 sm:mt-0">{texte}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 border-t border-[var(--site-filet)] pt-8" data-revele>
        <p className="repere"><b>→</b>Avec Pro2Link, un seul parcours</p>
        <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3 text-[15px]">
          {AVANT_APRES.apres.map((etape, i) => (
            <li key={etape} className="flex items-center gap-2">
              <span className="font-medium text-[var(--site-encre)]">{etape}</span>
              {i < AVANT_APRES.apres.length - 1 ? <ArrowRight className="size-3.5 text-texte-discret" aria-hidden /> : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
