import { Link, Outlet, ScrollRestoration } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Logo from '../components/common/Logo.jsx';

/** Mise en page des écrans d'authentification : panneau de marque + formulaire. */
export default function AuthLayout() {
  return (
    <div className="grid min-h-screen bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <a href="#contenu" className="lien-evitement">Aller au contenu</a>
      <aside className="relative hidden overflow-hidden bg-primaire px-12 py-12 text-sur-primaire lg:flex lg:flex-col">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full border-[48px] border-white/5" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 size-[420px] rounded-full border-[48px] border-secondaire/20" />
        <Link to="/" className="relative inline-flex w-fit items-center gap-2.5 rounded-champ" aria-label="Pro2Link — accueil">
          <span className="inline-flex items-center gap-2.5 rounded-champ bg-white/95 px-3 py-2"><Logo /></span>
        </Link>
        <div className="relative mt-auto max-w-md">
          <h2 className="text-[30px] font-semibold leading-tight">Vos échanges commerciaux, réunis au même endroit.</h2>
          <ul className="mt-8 space-y-3 text-sur-primaire/90">
            {['Bons de commande validés par les deux parties', 'Livraisons, factures et paiements suivis', 'Web et mobile, mêmes données'].map((t) => (
              <li key={t} className="flex items-center gap-3"><CheckCircle2 className="size-5 text-secondaire" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>
        <p className="relative mt-12 text-legende text-sur-primaire/70">© {new Date().getFullYear()} Pro2Link</p>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-5 lg:hidden">
          <Link to="/" aria-label="Pro2Link — accueil"><Logo /></Link>
        </header>
        <main id="contenu" className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-[440px]"><Outlet /></div>
        </main>
        <footer className="flex flex-wrap justify-center gap-x-5 gap-y-1 px-6 py-5 text-legende text-texte-secondaire">
          <Link to="/" className="hover:text-primaire">Accueil</Link>
          <Link to="/confidentialite" className="hover:text-primaire">Confidentialité</Link>
          <Link to="/conditions-utilisation" className="hover:text-primaire">Conditions d’utilisation</Link>
        </footer>
      </div>
      <ScrollRestoration />
    </div>
  );
}
