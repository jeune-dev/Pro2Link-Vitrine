import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KeyRound, LogOut, ShieldCheck } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import * as authService from '../../services/authService.js';
import Button from '../../components/common/Button.jsx';
import ErrorAlert from '../../components/common/ErrorAlert.jsx';
import Notice from '../../components/common/Notice.jsx';
import { PageSpinner } from '../../components/common/Spinner.jsx';
import { Field, Input, PasswordInput } from '../../components/forms/Field.jsx';
import { codeTotp } from '../../components/forms/validation.js';
import ChangePasswordForm from '../../components/forms/ChangePasswordForm.jsx';
import { config } from '../../utils/config.js';

/**
 * Connexion des comptes ENTREPRISE (acheteurs, fournisseurs). Le back-office
 * des administrateurs Pro2Link est une application distincte (VITE_ADMIN_URL) :
 * un super admin qui se connecte ici est déconnecté et invité à s'y rendre.
 */
export default function LoginPage() {
  useDocumentMeta({ title: 'Connexion', description: 'Connectez-vous à votre espace Pro2Link.', noindex: true });
  const { statut, user, etape, estSuperAdmin, ouvrirSession, sessionExpiree, deconnecter } = useAuth();
  const [mfaToken, setMfaToken] = useState(null);
  const [administrateur, setAdministrateur] = useState(false);
  const navigate = useNavigate();

  // Session ouverte : orientation selon le rôle renvoyé par l'API.
  useEffect(() => {
    if (statut !== 'connecte' || !user) return;
    if (estSuperAdmin) {
      setAdministrateur(true);
      deconnecter();
      return;
    }
    if (!etape) navigate('/espace-entreprise', { replace: true });
  }, [statut, user, etape, estSuperAdmin, navigate, deconnecter]);

  if (statut === 'chargement') return <PageSpinner label="Vérification de la session…" />;

  if (mfaToken) {
    return (
      <EtapeMfa
        mfaToken={mfaToken}
        onAnnuler={() => setMfaToken(null)}
        onSucces={(data) => { setMfaToken(null); ouvrirSession(data); }}
      />
    );
  }

  if (statut === 'connecte' && etape === 'mot_de_passe') {
    return (
      <Cadre titre="Choisissez votre mot de passe" sousTitre="Votre compte utilise un mot de passe provisoire. Définissez votre mot de passe personnel pour continuer." icone={KeyRound}>
        <ChangePasswordForm apresSucces="session" />
        <BoutonAutreCompte onClick={deconnecter} />
      </Cadre>
    );
  }

  if (statut === 'connecte') return <PageSpinner label="Redirection…" />;

  return (
    <EtapeIdentifiants
      administrateur={administrateur}
      onNouvelEssai={() => setAdministrateur(false)}
      sessionExpiree={sessionExpiree}
      onMfa={setMfaToken}
      onSession={ouvrirSession}
    />
  );
}

function Cadre({ titre, sousTitre, icone: Icone, children }) {
  return (
    <div>
      {Icone ? (
        <span className="flex size-11 items-center justify-center rounded-champ bg-primaire-teinte text-primaire"><Icone className="size-5" aria-hidden /></span>
      ) : null}
      <h1 className="mt-5 text-grand-titre font-semibold tracking-tight text-texte">{titre}</h1>
      {sousTitre ? <p className="mt-2 text-petit text-texte-secondaire">{sousTitre}</p> : null}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function BoutonAutreCompte({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="mt-6 inline-flex items-center gap-2 text-petit font-medium text-texte-secondaire hover:text-texte">
      <LogOut className="size-4" aria-hidden /> Se connecter avec un autre compte
    </button>
  );
}

const schemaIdentifiants = z.object({
  identifiant: z.string().trim().min(1, 'Saisissez votre e-mail ou votre téléphone.').max(254),
  password: z.string().min(1, 'Saisissez votre mot de passe.').max(128),
});

function EtapeIdentifiants({ administrateur, onNouvelEssai, sessionExpiree, onMfa, onSession }) {
  const [erreur, setErreur] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schemaIdentifiants) });

  async function soumettre(valeurs) {
    setErreur(null);
    onNouvelEssai();
    try {
      const data = await authService.connexion(valeurs);
      if (data?.mfa_requis) onMfa(data.mfa_token);
      else onSession(data);
    } catch (e) {
      setErreur(e.status === 429 && e.retryAfter
        ? { ...e, message: `${e.message} (réessayez dans ${Math.ceil(e.retryAfter / 60)} min)` }
        : e);
    }
  }

  return (
    <Cadre titre="Connexion" sousTitre="Accédez à l’espace Pro2Link de votre entreprise.">
      {administrateur ? (
        <Notice titre="Compte administrateur Pro2Link" className="mb-6">
          Ce compte se connecte au back-office de la plateforme, et non depuis le site. Votre session a été fermée ici.
          {config.adminUrl ? <> <a href={config.adminUrl} className="font-semibold text-primaire hover:underline">Ouvrir le back-office</a></> : null}
        </Notice>
      ) : null}
      {sessionExpiree ? <Notice className="mb-6" titre="Session expirée">Pour votre sécurité, veuillez vous reconnecter.</Notice> : null}
      <form onSubmit={handleSubmit(soumettre)} className="space-y-5" noValidate>
        <Field label="E-mail ou téléphone" erreur={errors.identifiant?.message} obligatoire>
          {(p) => <Input {...p} autoComplete="username" inputMode="email" autoFocus {...register('identifiant')} />}
        </Field>
        <Field label="Mot de passe" erreur={errors.password?.message} obligatoire>
          {(p) => <PasswordInput {...p} autoComplete="current-password" {...register('password')} />}
        </Field>
        <div className="flex justify-end">
          <Link to="/mot-de-passe-oublie" className="text-petit font-medium text-primaire hover:underline">Mot de passe oublié ?</Link>
        </div>
        <ErrorAlert erreur={erreur} />
        <Button type="submit" pleineLargeur taille="lg" chargement={isSubmitting}>Se connecter</Button>
      </form>
      <p className="mt-8 text-center text-petit text-texte-secondaire">
        Pas encore de compte ? <Link to="/inscription" className="font-semibold text-primaire hover:underline">Créer l’espace de mon entreprise</Link>
      </p>
    </Cadre>
  );
}

const schemaCode = z.object({ code: codeTotp });
const schemaSecours = z.object({ code_secours: z.string().trim().min(4, 'Saisissez un code de secours.').max(20) });

function EtapeMfa({ mfaToken, onAnnuler, onSucces }) {
  const [secours, setSecours] = useState(false);
  return (
    <Cadre
      titre="Vérification en deux étapes"
      sousTitre={secours ? 'Saisissez l’un de vos codes de secours (chacun n’est utilisable qu’une fois).' : 'Saisissez le code à 6 chiffres affiché dans votre application d’authentification.'}
      icone={ShieldCheck}
    >
      {/* Remonté à chaque bascule : un formulaire et un schéma par mode. */}
      <FormulaireMfa key={secours ? 'secours' : 'code'} secours={secours} mfaToken={mfaToken} onSucces={onSucces} />
      <div className="mt-6 flex flex-wrap justify-between gap-3 text-petit">
        <button type="button" className="font-medium text-primaire hover:underline" onClick={() => setSecours((s) => !s)}>
          {secours ? 'Utiliser un code de l’application' : 'Utiliser un code de secours'}
        </button>
        <button type="button" className="font-medium text-texte-secondaire hover:text-texte" onClick={onAnnuler}>Retour</button>
      </div>
    </Cadre>
  );
}

function FormulaireMfa({ secours, mfaToken, onSucces }) {
  const [erreur, setErreur] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(secours ? schemaSecours : schemaCode),
  });

  async function soumettre(v) {
    setErreur(null);
    try {
      const data = await authService.verifierMfa({ mfa_token: mfaToken, ...v });
      onSucces(data);
    } catch (e) {
      if (e.code === 'JETON_MFA_INVALIDE') {
        setErreur({ ...e, message: 'Le délai de vérification (5 minutes) est dépassé. Reconnectez-vous.' });
      } else setErreur(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(soumettre)} className="space-y-5" noValidate>
        {secours ? (
          <Field label="Code de secours" erreur={errors.code_secours?.message} obligatoire>
            {(p) => <Input {...p} autoComplete="one-time-code" autoFocus {...register('code_secours')} />}
          </Field>
        ) : (
          <Field label="Code de vérification" erreur={errors.code?.message} obligatoire>
            {(p) => (
              <Input
                {...p}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                autoFocus
                className="text-center text-sous-titre tracking-[0.5em] chiffres"
                {...register('code')}
              />
            )}
          </Field>
        )}
        <ErrorAlert erreur={erreur} />
        <Button type="submit" pleineLargeur taille="lg" chargement={isSubmitting}>Vérifier</Button>
    </form>
  );
}
