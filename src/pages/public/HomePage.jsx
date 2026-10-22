import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { classesBouton } from '../../components/common/Button.jsx';
import Section, { CtaBand, SectionHeading } from '../../components/marketing/Section.jsx';
import Hero from '../../components/home/Hero.jsx';
import Constat from '../../components/home/Constat.jsx';
import Parcours from '../../components/home/Parcours.jsx';
import Fonctionnalites from '../../components/home/Fonctionnalites.jsx';
import WebMobile from '../../components/home/WebMobile.jsx';
import PourQui from '../../components/home/PourQui.jsx';
import Avantages from '../../components/home/Avantages.jsx';
import Faq from '../../components/home/Faq.jsx';
import { REFERENCES } from '../../content/site.js';

/**
 * Page d'accueil. Chaque section a sa propre composition (éditoriale,
 * asymétrique, explorateur, bande pleine, colonnes typographiques…) pour
 * éviter l'enchaînement de grilles de cartes identiques.
 */
export default function HomePage() {
  useDocumentMeta({
    title: 'Gérez vos relations commerciales B2B',
    description: 'Pro2Link centralise vos fournisseurs, bons de commande, factures et paiements dans une seule plateforme pensée pour les professionnels au Sénégal.',
  });

  return (
    <>
      <Hero />
      <Constat />
      <Parcours />
      <Fonctionnalites />
      <WebMobile />
      <PourQui />
      <Avantages />
      {REFERENCES.length ? <References /> : null}
      <Faq />
      <CtaBand
        titre="Simplifiez dès aujourd’hui la gestion de vos échanges commerciaux."
        texte="Créez l’espace de votre entreprise, ajoutez vos partenaires et envoyez votre premier bon de commande."
      >
        <Link to="/inscription" className={classesBouton({ variante: 'primaire', taille: 'lg' })}>
          Commencer <ArrowRight className="fleche size-4" aria-hidden />
        </Link>
        <Link to="/connexion" className={classesBouton({ variante: 'neutre', taille: 'lg' })}>
          Se connecter
        </Link>
      </CtaBand>
    </>
  );
}

/** Références clients : affichée seulement lorsque `REFERENCES` est renseigné (aucune n'est inventée). */
function References() {
  return (
    <Section fond="papier" labelledBy="titre-references" filet>
      <SectionHeading id="titre-references" surtitre="Références" titre="Ils travaillent avec Pro2Link." />
      <ul className="mt-10 flex flex-wrap items-center gap-12">
        {REFERENCES.map((r) => (
          <li key={r.nom}><img src={r.logo} alt={r.nom} loading="lazy" decoding="async" className="h-9 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" /></li>
        ))}
      </ul>
    </Section>
  );
}
