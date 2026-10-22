import { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Building2, ExternalLink, LogOut, Smartphone } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { config } from '../../utils/config.js';
import { PageSpinner } from '../../components/common/Spinner.jsx';
import Button, { classesBouton } from '../../components/common/Button.jsx';

/**
 * Point d'arrivée d'un compte ENTREPRISE (acheteur / fournisseur) : ce site ne
 * contient que la vitrine Pro2Link. Le compte est redirigé
 * vers l'application des entreprises (VITE_APP_ENTREPRISE_URL) si elle est
 * configurée ; sinon, on explique où retrouver son espace.
 */
export default function EnterpriseSpacePage() {
  useDocumentMeta({ title: 'Votre espace entreprise', noindex: true });
  const { statut, user, estSuperAdmin, deconnecter } = useAuth();
  const { state } = useLocation();
  const url = config.appEntrepriseUrl;

  useEffect(() => {
    if (statut === 'connecte' && !estSuperAdmin && url) window.location.assign(url);
  }, [statut, estSuperAdmin, url]);

  if (statut === 'chargement') return <PageSpinner />;
  if (statut !== 'connecte') return <Navigate to="/connexion" replace />;
  if (estSuperAdmin) return <Navigate to="/connexion" replace />;
  if (url) return <PageSpinner label="Redirection vers votre espace entreprise…" />;

  return (
    <div>
      <span className="flex size-11 items-center justify-center rounded-champ bg-succes-fond text-succes"><Building2 className="size-5" aria-hidden /></span>
      <h1 className="mt-5 text-grand-titre font-semibold tracking-tight text-texte">
        {state?.nouvelleEntreprise ? 'Votre entreprise est créée' : `Bonjour ${user?.first_name || ''}`.trim()}
      </h1>
      <p className="mt-3 text-texte-secondaire">
        {state?.nouvelleEntreprise
          ? `L’espace de « ${state.nouvelleEntreprise} » est prêt. `
          : 'Vous êtes connecté avec un compte entreprise. '}
        La gestion de vos commandes, factures et paiements se fait dans l’application Pro2Link des entreprises.
      </p>
      <div className="mt-8 space-y-3 rounded-carte border border-bordure bg-fond p-5 text-petit text-texte">
        <p className="flex items-center gap-3"><Smartphone className="size-5 text-primaire" aria-hidden />Application mobile Pro2Link (Android et iOS)</p>
        <p className="flex items-center gap-3"><ExternalLink className="size-5 text-primaire" aria-hidden />Application web des entreprises : lien à venir</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className={classesBouton({ variante: 'neutre' })}>Retour au site</Link>
        <Button variante="fantome" icone={LogOut} onClick={deconnecter}>Se déconnecter</Button>
      </div>
    </div>
  );
}
