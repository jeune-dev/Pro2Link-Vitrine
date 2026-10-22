import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { FONCTIONNALITES, NAVIGATION } from '../../content/site.js';
import { config } from '../../utils/config.js';

const LEGAL = [
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/confidentialite', label: 'Confidentialité' },
  { to: '/conditions-utilisation', label: 'Conditions d’utilisation' },
];

function Colonne({ titre, children }) {
  return (
    <div>
      <h2 className="mono text-legende text-texte-discret">{titre}</h2>
      <ul className="mt-4 space-y-3 text-petit">{children}</ul>
    </div>
  );
}

const lien = 'lien-souligne text-texte-secondaire hover:text-[var(--site-encre)]';

/** Pied de page. Les coordonnées ne s'affichent que si elles sont configurées (.env). */
export default function SiteFooter() {
  return (
    <footer className="fond-papier border-t border-[var(--site-filet)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.3fr_2fr] lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-petit leading-relaxed text-texte-secondaire">
            Fournisseurs, bons de commande, livraisons, factures et paiements entre entreprises, au même endroit.
          </p>
          <p className="mono mt-5 text-legende text-texte-discret">Web · Android · iOS</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <Colonne titre="Pro2Link">
            {NAVIGATION.map((n) => <li key={n.to}><Link to={n.to} className={lien}>{n.label}</Link></li>)}
          </Colonne>
          <Colonne titre="Fonctionnalités">
            {FONCTIONNALITES.slice(0, 5).map((f) => (
              <li key={f.id}><Link to={`/fonctionnalites#${f.id}`} className={lien}>{f.titre}</Link></li>
            ))}
          </Colonne>
          <Colonne titre="Votre espace">
            <li><Link to="/inscription" className={lien}>Créer un compte</Link></li>
            <li><Link to="/connexion" className={lien}>Se connecter</Link></li>
            <li><Link to="/mot-de-passe-oublie" className={lien}>Mot de passe oublié</Link></li>
            {config.contactEmail ? <li><a href={`mailto:${config.contactEmail}`} className={lien}>{config.contactEmail}</a></li> : null}
            {config.contactPhone ? <li><a href={`tel:${config.contactPhone.replace(/\s/g, '')}`} className={lien}>{config.contactPhone}</a></li> : null}
          </Colonne>
        </div>
      </div>

      <div className="border-t border-[var(--site-filet)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-legende text-texte-secondaire sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Pro2Link</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((l) => <li key={l.to}><Link to={l.to} className={lien}>{l.label}</Link></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
