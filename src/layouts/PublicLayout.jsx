import { Outlet, ScrollRestoration } from 'react-router-dom';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import SiteFooter from '../components/layout/SiteFooter.jsx';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <a href="#contenu" className="lien-evitement">Aller au contenu</a>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
