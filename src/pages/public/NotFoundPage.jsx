import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { classesBouton } from '../../components/common/Button.jsx';

export default function NotFoundPage() {
  useDocumentMeta({ title: 'Page introuvable', noindex: true });
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-petit font-semibold text-primaire chiffres">404</p>
      <h1 className="mt-3 text-[32px] font-semibold tracking-tight text-texte">Page introuvable</h1>
      <p className="mt-3 text-texte-secondaire">La page que vous cherchez n’existe pas ou a été déplacée.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className={classesBouton({ variante: 'primaire' })}>Retour à l’accueil</Link>
        <Link to="/fonctionnalites" className={classesBouton({ variante: 'neutre' })}>Fonctionnalités</Link>
      </div>
    </div>
  );
}
