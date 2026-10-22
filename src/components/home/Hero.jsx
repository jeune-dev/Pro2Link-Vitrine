import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { classesBouton } from '../common/Button.jsx';
import BonDeCommande from './BonDeCommande.jsx';

/** Hero : proposition de valeur à gauche, le bon de commande (cœur du produit) à droite. */
export default function Hero() {
  return (
    <section className="bg-surface" aria-labelledby="titre-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-20">
        <div>
          <p className="repere entree"><b>B2B</b>Acheteurs et fournisseurs · Sénégal</p>
          <h1 id="titre-hero" className="titre-affiche entree mt-6 text-[42px] sm:text-[60px] lg:text-[64px]" style={{ '--delai': '60ms' }}>
            Gérez vos relations commerciales. <span className="text-primaire">Simplement.</span>
          </h1>
          <p className="texte-equilibre entree mt-7 max-w-[34rem] text-[18px] leading-relaxed text-texte-secondaire" style={{ '--delai': '120ms' }}>
            Pro2Link centralise vos fournisseurs, commandes, factures et paiements dans une seule plateforme pensée pour les professionnels.
          </p>
          <div className="entree mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ '--delai': '180ms' }}>
            <Link to="/fonctionnalites" className={classesBouton({ variante: 'primaire', taille: 'lg' })}>
              Découvrir Pro2Link <ArrowRight className="fleche size-4" aria-hidden />
            </Link>
            <Link to="/connexion" className={classesBouton({ variante: 'neutre', taille: 'lg' })}>
              Accéder à la plateforme
            </Link>
          </div>
          <p className="entree mt-10 max-w-[34rem] border-t border-[var(--site-filet)] pt-5 text-[14px] leading-relaxed text-texte-secondaire" style={{ '--delai': '240ms' }}>
            Pas de panier : l’acheteur envoie un <span className="font-medium text-[var(--site-encre)]">bon de commande</span>, le fournisseur l’accepte ou propose une modification, et la version validée fait foi pour les deux.
          </p>
        </div>

        <div className="entree lg:pl-4" style={{ '--delai': '200ms' }}>
          <BonDeCommande />
        </div>
      </div>
    </section>
  );
}
