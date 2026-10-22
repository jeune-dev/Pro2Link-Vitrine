import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { classesBouton } from '../common/Button.jsx';
import { NAVIGATION } from '../../content/site.js';

/** En-tête fixe de la vitrine : devient compact au défilement, menu mobile. */
export default function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const surDefilement = () => setCompact(window.scrollY > 12);
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
      className={`sticky top-0 z-40 border-b transition-all duration-200 ${
        compact || menu ? 'border-bordure bg-surface/90 shadow-douce backdrop-blur-md' : 'border-transparent bg-surface'
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center gap-6 px-4 transition-all sm:px-6 lg:px-8 ${compact ? 'h-16' : 'h-20'}`}>
        <Link to="/" className="shrink-0 rounded-champ" aria-label="Pro2Link — accueil">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {NAVIGATION.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={() => `rounded-champ px-3 py-2 text-petit font-medium transition-colors ${
                    estActif(item.to) ? 'text-primaire' : 'text-texte-secondaire hover:text-texte'
                  }`}
                  aria-current={estActif(item.to) ? 'page' : undefined}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link to="/connexion" className={classesBouton({ variante: 'fantome' })}>Se connecter</Link>
          <Link to="/inscription" className={classesBouton({ variante: 'primaire' })}>Commencer</Link>
        </div>

        <button
          type="button"
          className="ml-auto rounded-champ p-2 text-texte lg:hidden"
          aria-expanded={menu}
          aria-controls="menu-mobile"
          aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMenu((m) => !m)}
        >
          {menu ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {menu ? (
        <div id="menu-mobile" className="h-[calc(100dvh-64px)] overflow-y-auto border-t border-bordure bg-surface px-4 pb-8 pt-4 lg:hidden">
          <nav aria-label="Navigation mobile">
            <ul className="space-y-1">
              {NAVIGATION.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="block rounded-champ px-3 py-3 text-corps font-medium text-texte hover:bg-surface-alt">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 grid gap-3">
            <Link to="/inscription" className={classesBouton({ variante: 'primaire', taille: 'lg', pleineLargeur: true })}>Commencer</Link>
            <Link to="/connexion" className={classesBouton({ variante: 'neutre', taille: 'lg', pleineLargeur: true })}>Se connecter</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
