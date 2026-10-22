import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { classesBouton } from '../../components/common/Button.jsx';
import Section, { CtaBand, SectionHeading } from '../../components/marketing/Section.jsx';
import { PARCOURS_ACHETEUR, PARCOURS_FOURNISSEUR, STATUTS_COMMANDE } from '../../content/details.js';

function Parcours({ titre, icone: Icone, etapes, accent }) {
  return (
    <section aria-labelledby={`parcours-${accent}`} className="rounded-feuille border border-bordure bg-surface p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className={`flex size-11 items-center justify-center rounded-champ ${accent === 'acheteur' ? 'bg-primaire-teinte text-primaire' : 'bg-secondaire-teinte text-secondaire-survol'}`}>
          <Icone className="size-5" aria-hidden />
        </span>
        <h2 id={`parcours-${accent}`} className="text-titre font-semibold text-texte">{titre}</h2>
      </div>
      <ol className="mt-8 space-y-0">
        {etapes.map((e, i) => (
          <li key={e.titre} className="relative flex gap-4 pb-7 last:pb-0">
            {i < etapes.length - 1 ? <span aria-hidden className="absolute left-[15px] top-9 h-[calc(100%-36px)] w-px bg-bordure-forte" /> : null}
            <span className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-legende font-semibold chiffres ${accent === 'acheteur' ? 'bg-primaire text-sur-primaire' : 'bg-secondaire text-sur-secondaire'}`}>
              {i + 1}
            </span>
            <div className="pt-1">
              <h3 className="font-semibold text-texte">{e.titre}</h3>
              <p className="mt-1 text-petit leading-relaxed text-texte-secondaire">{e.texte}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function HowItWorksPage() {
  useDocumentMeta({
    title: 'Comment ça marche',
    description: 'Le parcours acheteur et le parcours fournisseur sur Pro2Link : du bon de commande validé à deux jusqu’à la facture et au paiement.',
  });

  return (
    <>
      <header className="border-b border-bordure bg-fond">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            surtitre="Comment ça marche"
            titre="Du bon de commande au paiement,"
            accent="chacun son rôle."
            taille="lg"
            intro="Pro2Link repose sur un processus de bon de commande et de validation entre acheteur et fournisseur — pas sur un panier de marketplace."
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Parcours titre="Parcours acheteur" icone={ShoppingBag} etapes={PARCOURS_ACHETEUR} accent="acheteur" />
        <Parcours titre="Parcours fournisseur" icone={Truck} etapes={PARCOURS_FOURNISSEUR} accent="fournisseur" />
      </div>

      <Section fond="alt" labelledBy="titre-statuts">
        <SectionHeading
          id="titre-statuts"
          surtitre="Statuts d’une commande"
          titre="Une même référence"
          accent="pour les deux parties."
          intro="Le fournisseur met à jour les statuts opérationnels ; l’acheteur confirme la réception. Chaque changement est historisé."
        />
        <ol className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-2">
          {STATUTS_COMMANDE.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-bordure bg-surface px-3.5 py-2 text-petit font-medium text-texte">{s}</span>
              {i < STATUTS_COMMANDE.length - 1 ? <ArrowRight className="size-4 text-texte-discret" aria-hidden /> : null}
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand titre="Simplifiez dès aujourd’hui la gestion de vos échanges commerciaux.">
        <Link to="/inscription" className={classesBouton({ variante: 'clair', taille: 'lg' })}>
          Commencer <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link to="/connexion" className={classesBouton({ variante: 'contour-clair', taille: 'lg' })}>
          Se connecter
        </Link>
      </CtaBand>
    </>
  );
}
