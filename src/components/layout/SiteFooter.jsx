import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { FONCTIONNALITES, NAVIGATION } from '../../content/site.js';
import { config } from '../../utils/config.js';

/** Pied de page. Les coordonnées ne s'affichent que si elles sont configurées (.env). */
export default function SiteFooter() {
  const contact = config.contactEmail || config.contactPhone;
  return (
    <footer className="bande-sombre">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo sombre />
          <p className="max-w-xs text-petit text-[var(--site-bande-texte-2)]">
            La plateforme B2B qui réunit acheteurs et fournisseurs, du bon de commande jusqu’au paiement.
          </p>
        </div>

        <nav aria-label="Navigation du pied de page">
          <h2 className="text-legende font-bold uppercase tracking-[0.14em] text-[var(--site-accent-clair)]">Navigation</h2>
          <ul className="mt-4 space-y-2.5 text-petit">
            {NAVIGATION.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-[var(--site-bande-texte-2)] hover:text-white">{n.label}</Link></li>
            ))}
            <li><Link to="/connexion" className="text-[var(--site-bande-texte-2)] hover:text-white">Se connecter</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-legende font-bold uppercase tracking-[0.14em] text-[var(--site-accent-clair)]">Fonctionnalités</h2>
          <ul className="mt-4 space-y-2.5 text-petit">
            {FONCTIONNALITES.slice(0, 6).map((f) => (
              <li key={f.id}><Link to={`/fonctionnalites#${f.id}`} className="text-[var(--site-bande-texte-2)] hover:text-white">{f.titre}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          {contact ? (
            <>
              <h2 className="text-legende font-bold uppercase tracking-[0.14em] text-[var(--site-accent-clair)]">Contact</h2>
              <ul className="mt-4 space-y-2.5 text-petit">
                {config.contactEmail ? (
                  <li><a href={`mailto:${config.contactEmail}`} className="inline-flex items-center gap-2 text-[var(--site-bande-texte-2)] hover:text-white"><Mail className="size-4" aria-hidden />{config.contactEmail}</a></li>
                ) : null}
                {config.contactPhone ? (
                  <li><a href={`tel:${config.contactPhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-[var(--site-bande-texte-2)] hover:text-white"><Phone className="size-4" aria-hidden />{config.contactPhone}</a></li>
                ) : null}
              </ul>
            </>
          ) : null}
          <h2 className={`text-legende font-bold uppercase tracking-[0.14em] text-[var(--site-accent-clair)] ${contact ? 'mt-8' : ''}`}>Informations légales</h2>
          <ul className="mt-4 space-y-2.5 text-petit">
            <li><Link to="/mentions-legales" className="text-[var(--site-bande-texte-2)] hover:text-white">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="text-[var(--site-bande-texte-2)] hover:text-white">Politique de confidentialité</Link></li>
            <li><Link to="/conditions-utilisation" className="text-[var(--site-bande-texte-2)] hover:text-white">Conditions d’utilisation</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-legende text-[var(--site-bande-texte-2)] sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Pro2Link. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
