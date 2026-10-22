import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, KeyRound } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { motDePasseOublie, reinitialiserMotDePasse } from '../../services/authService.js';
import Button, { ButtonLink } from '../../components/common/Button.jsx';
import ErrorAlert from '../../components/common/ErrorAlert.jsx';
import Notice from '../../components/common/Notice.jsx';
import { Field, Input, PasswordInput } from '../../components/forms/Field.jsx';
import { MOT_DE_PASSE_REGLE, codeTotp, motDePasseFort } from '../../components/forms/validation.js';

/**
 * Mot de passe oublié (comptes entreprise) : code à 6 chiffres envoyé par l'API.
 * Désactivé pour un super admin (réponse neutre) : un autre super admin
 * réinitialise son accès depuis le back-office.
 */
const schemaDemande = z.object({ identifiant: z.string().trim().min(1, 'Saisissez votre e-mail ou votre téléphone.').max(254) });
const schemaReinit = z.object({
  code: codeTotp,
  password: motDePasseFort,
  password_confirmation: z.string(),
}).refine((v) => v.password === v.password_confirmation, { path: ['password_confirmation'], message: 'La confirmation ne correspond pas.' });

export default function ForgotPasswordPage() {
  useDocumentMeta({ title: 'Mot de passe oublié', noindex: true });
  const [identifiant, setIdentifiant] = useState(null);
  const [messageEnvoi, setMessageEnvoi] = useState('');
  const [termine, setTermine] = useState(null);
  const [erreur, setErreur] = useState(null);

  const demande = useForm({ resolver: zodResolver(schemaDemande) });
  const reinit = useForm({ resolver: zodResolver(schemaReinit) });

  async function envoyer({ identifiant: id }) {
    setErreur(null);
    try {
      const { message } = await motDePasseOublie(id.trim());
      setMessageEnvoi(message);
      setIdentifiant(id.trim());
    } catch (e) {
      setErreur(e);
    }
  }

  async function reinitialiser(v) {
    setErreur(null);
    try {
      const { message } = await reinitialiserMotDePasse({ identifiant, ...v });
      setTermine(message);
    } catch (e) {
      setErreur(e);
    }
  }

  if (termine) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-succes-fond text-succes"><CheckCircle2 className="size-6" aria-hidden /></span>
        <h1 className="mt-5 text-grand-titre font-semibold text-texte">Mot de passe modifié</h1>
        <p className="mt-2 text-petit text-texte-secondaire">{termine}</p>
        <ButtonLink to="/connexion" className="mt-8" taille="lg" pleineLargeur>Se connecter</ButtonLink>
      </div>
    );
  }

  return (
    <div>
      <span className="flex size-11 items-center justify-center rounded-champ bg-primaire-teinte text-primaire"><KeyRound className="size-5" aria-hidden /></span>
      <h1 className="mt-5 text-grand-titre font-semibold tracking-tight text-texte">Mot de passe oublié</h1>

      {!identifiant ? (
        <>
          <p className="mt-2 text-petit text-texte-secondaire">Indiquez l’e-mail ou le téléphone de votre compte : vous recevrez un code de réinitialisation.</p>
          <form onSubmit={demande.handleSubmit(envoyer)} className="mt-8 space-y-5" noValidate>
            <Field label="E-mail ou téléphone" erreur={demande.formState.errors.identifiant?.message} obligatoire>
              {(p) => <Input {...p} autoComplete="username" autoFocus {...demande.register('identifiant')} />}
            </Field>
            <ErrorAlert erreur={erreur} />
            <Button type="submit" pleineLargeur taille="lg" chargement={demande.formState.isSubmitting}>Recevoir un code</Button>
          </form>
        </>
      ) : (
        <>
          <Notice className="mt-4">{messageEnvoi}</Notice>
          <form onSubmit={reinit.handleSubmit(reinitialiser)} className="mt-6 space-y-5" noValidate>
            <Field label="Code reçu (6 chiffres)" erreur={reinit.formState.errors.code?.message} obligatoire>
              {(p) => <Input {...p} inputMode="numeric" autoComplete="one-time-code" maxLength={6} className="text-center tracking-[0.4em] chiffres" {...reinit.register('code')} />}
            </Field>
            <Field label="Nouveau mot de passe" erreur={reinit.formState.errors.password?.message} aide={MOT_DE_PASSE_REGLE} obligatoire>
              {(p) => <PasswordInput {...p} autoComplete="new-password" {...reinit.register('password')} />}
            </Field>
            <Field label="Confirmer le mot de passe" erreur={reinit.formState.errors.password_confirmation?.message} obligatoire>
              {(p) => <PasswordInput {...p} autoComplete="new-password" {...reinit.register('password_confirmation')} />}
            </Field>
            <ErrorAlert erreur={erreur} />
            <Button type="submit" pleineLargeur taille="lg" chargement={reinit.formState.isSubmitting}>Réinitialiser le mot de passe</Button>
          </form>
          <button type="button" className="mt-4 text-petit font-medium text-primaire hover:underline" onClick={() => { setIdentifiant(null); setErreur(null); }}>
            Changer d’identifiant ou renvoyer un code
          </button>
        </>
      )}

      <p className="mt-8 text-legende text-texte-secondaire">
        Administrateur Pro2Link ? La réinitialisation par code est désactivée pour votre compte : demandez à un autre super administrateur de rétablir votre accès.
      </p>
      <p className="mt-4 text-center text-petit"><Link to="/connexion" className="font-semibold text-primaire hover:underline">Retour à la connexion</Link></p>
    </div>
  );
}
