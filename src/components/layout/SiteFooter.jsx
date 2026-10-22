import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { FONCTIONNALITES, NAVIGATION } from '../../content/site.js';
import { config } from '../../utils/config.js';

/** Pied de page. Les coordonnées ne s'affichent que si elles sont configurées (.env). */
export default function SiteFooter() {
  const contact = config.contactEmail || config.contactPhone;
  return (
    <footer className="border-t border-bordure bg-fond">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-petit text-texte-secondaire">
            La plateforme B2B qui réunit acheteurs et fournisseurs, du bon de commande jusqu’au paiement.
          </p>
        </div>

        <nav aria-label="Navigation du pied de page">
          <h2 className="text-petit font-semibold text-texte">Navigation</h2>
          <ul className="mt-4 space-y-2.5 text-petit">
            {NAVIGATION.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-texte-secondaire hover:text-primaire">{n.label}</Link></li>
            ))}
            <li><Link to="/connexion" className="text-texte-secondaire hover:text-primaire">Se connecter</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-petit font-semibold text-texte">Fonctionnalités</h2>
          <ul className="mt-4 space-y-2.5 text-petit">
            {FONCTIONNALITES.slice(0, 6).map((f) => (
              <li key={f.id}><Link to={`/fonctionnalites#${f.id}`} className="text-texte-secondaire hover:text-primaire">{f.titre}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          {contact ? (
            <>
              <h2 className="text-petit font-semibold text-texte">Contact</h2>
              <ul className="mt-4 space-y-2.5 text-petit">
                {config.contactEmail ? (
                  <li><a href={`mailto:${config.contactEmail}`} className="inline-flex items-center gap-2 text-texte-secondaire hover:text-primaire"><Mail className="size-4" aria-hidden />{config.contactEmail}</a></li>
                ) : null}
                {config.contactPhone ? (
                  <li><a href={`tel:${config.contactPhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-texte-secondaire hover:text-primaire"><Phone className="size-4" aria-hidden />{config.contactPhone}</a></li>
                ) : null}
              </ul>
            </>
          ) : null}
          <h2 className={`text-petit font-semibold text-texte ${contact ? 'mt-8' : ''}`}>Informations légales</h2>
          <ul className="mt-4 space-y-2.5 text-petit">
            <li><Link to="/mentions-legales" className="text-texte-secondaire hover:text-primaire">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="text-texte-secondaire hover:text-primaire">Politique de confidentialité</Link></li>
            <li><Link to="/conditions-utilisation" className="text-texte-secondaire hover:text-primaire">Conditions d’utilisation</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bordure">
        <p className="mx-auto max-w-7xl px-4 py-6 text-legende text-texte-secondaire sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Pro2Link. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
