import Section, { LienFleche, SectionHeading } from '../marketing/Section.jsx';
import { ETAPES } from '../../content/site.js';

const COULEURS_ACTEUR = {
  Acheteur: 'text-primaire',
  Fournisseur: 'text-[var(--site-detail)]',
};

/**
 * Comment ça marche : titre fixe à gauche (sur grand écran), frise verticale
 * des 8 étapes à droite, avec l'acteur responsable de chacune.
 */
export default function Parcours() {
  return (
    <Section id="comment-ca-marche" labelledBy="titre-parcours">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="titre-parcours"
            numero="02"
            surtitre="Comment ça marche"
            titre="Un bon de commande,"
            accent="validé par les deux parties."
            intro="Pro2Link suit le déroulement réel d’un échange entre professionnels : de la sélection du fournisseur jusqu’au paiement."
          />
          <ul className="mt-8 flex gap-6 text-[13px] text-texte-secondaire" aria-label="Légende des acteurs" data-revele>
            <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-primaire" aria-hidden />Acheteur</li>
            <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-[var(--site-detail)]" aria-hidden />Fournisseur</li>
          </ul>
          <LienFleche to="/comment-ca-marche" className="mt-8">Parcours acheteur et fournisseur détaillés</LienFleche>
        </div>

        <ol className="relative">
          <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-[var(--site-filet)]" />
          {ETAPES.map(({ titre, texte, acteur }, i) => {
            const deux = !COULEURS_ACTEUR[acteur];
            return (
              <li key={titre} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-9 last:pb-0" data-revele style={{ '--rang': i % 4 }}>
                <span className="mono relative z-10 flex size-10 items-center justify-center rounded-full border border-[var(--site-filet)] bg-surface text-[13px] font-medium text-[var(--site-encre)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[17px] font-semibold text-[var(--site-encre)]">{titre}</h3>
                    <span className={`text-[13px] font-medium ${deux ? 'text-texte-secondaire' : COULEURS_ACTEUR[acteur]}`}>{acteur}</span>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-texte-secondaire">{texte}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
