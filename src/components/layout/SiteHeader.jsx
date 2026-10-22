import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { classesBouton } from '../common/Button.jsx';
import { NAVIGATION } from '../../content/site.js';

/**
 * En-tête de la vitrine : collant, hauteur constante (aucun saut au défilement),
 * filet inférieur qui n'apparaît qu'une fois la page défilée. Menu mobile en
 * panneau animé, rendu inerte (clavier et lecteurs d'écran) lorsqu'il est fermé.
 */
export default function SiteHeader() {
  const [defile, setDefile] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const surDefilement = () => setDefile(window.scrollY > 8);
    surDefilement();
    window.addEventListener('scroll', surDefilement, { passive: true });
    return () => window.removeEventListener('scroll', surDefilement);
  }, []);

  useEffect(() => { setMenu(false); }, [pathname, hash]);

  // Ancres (#faq, #entreprises) après une navigation depuis une autre page.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
  }, [pathname, hash]);

  useEffect(() => {
    if (!menu) return undefined;
    const echap = (e) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', echap);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', echap);
      document.body.style.overflow = '';
    };
  }, [menu]);

  const estActif = (to) => (to.includes('#') ? `${pathname}${hash}` === to : pathname === to && !hash);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-surface/95 backdrop-blur-sm transition-[border-color] duration-300 ${
        defile || menu ? 'border-[var(--site-filet)]' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-8 px-5 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 rounded-champ" aria-label="Pro2Link — accueil">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAVIGATION.map((item) => {
              const actif = estActif(item.to);
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    aria-current={actif ? 'page' : undefined}
                    className={() => `rounded-champ px-3 py-2 text-petit font-medium transition-colors ${
                      actif ? 'text-[var(--site-encre)]' : 'text-texte-secondaire hover:bg-surface-alt hover:text-[var(--site-encre)]'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link to="/connexion" className={classesBouton({ variante: 'fantome', className: '!text-[var(--site-encre)]' })}>Se connecter</Link>
          <Link to="/inscription" className={classesBouton({ variante: 'primaire' })}>
            Commencer <ArrowRight className="fleche size-4" aria-hidden />
          </Link>
        </div>

        <button
          type="button"
          className="relative -mr-2 ml-auto flex size-11 items-center justify-center rounded-champ text-[var(--site-encre)] hover:bg-surface-alt lg:hidden"
          aria-expanded={menu}
          aria-controls="menu-mobile"
          aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMenu((m) => !m)}
        >
          {/* Trois traits qui se croisent : transition sans changement d'icône. */}
          <span aria-hidden className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-200 ${menu ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-opacity duration-150 ${menu ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-200 ${menu ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </div>

      <div
        id="menu-mobile"
        inert={!menu}
        className={`fixed inset-x-0 top-[68px] bottom-0 overflow-y-auto bg-surface px-5 pb-10 pt-4 transition-[opacity,transform] duration-200 lg:hidden ${
          menu ? 'opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <nav aria-label="Navigation mobile">
          <ol className="divide-y divide-[var(--site-filet)] border-y border-[var(--site-filet)]">
            {NAVIGATION.map((item, i) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={estActif(item.to) ? 'page' : undefined}
                  className="flex items-baseline gap-4 py-4 text-[20px] font-semibold tracking-tight text-[var(--site-encre)]"
                >
                  <span className="mono w-6 text-legende font-normal text-texte-discret">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-8 grid gap-3">
          <Link to="/inscription" className={classesBouton({ variante: 'primaire', taille: 'lg', pleineLargeur: true })}>
            Créer l’espace de mon entreprise
          </Link>
          <Link to="/connexion" className={classesBouton({ variante: 'neutre', taille: 'lg', pleineLargeur: true })}>Se connecter</Link>
        </div>
      </div>
    </header>
  );
}
