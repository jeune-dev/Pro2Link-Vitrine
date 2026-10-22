import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useReferentiels } from '../../contexts/ReferentielsContext.jsx';
import { inscription } from '../../services/authService.js';
import Button from '../../components/common/Button.jsx';
import ErrorAlert from '../../components/common/ErrorAlert.jsx';
import { Field, Input, OptionsReferentiel, PasswordInput, Select } from '../../components/forms/Field.jsx';
import { MOT_DE_PASSE_REGLE, email, motDePasseFort, telephoneFacultatif, videVersNull } from '../../components/forms/validation.js';

/**
 * Inscription d'une entreprise : POST /auth/inscription (compte + entreprise).
 * Champs EXACTEMENT ceux du schéma Joi de l'API (les autres seraient retirés).
 * Aucune réussite n'est simulée : seule une réponse 201 ouvre la session.
 */
const schema = z.object({
  first_name: z.string().trim().min(1, 'Le prénom est obligatoire.').max(80),
  last_name: z.string().trim().min(1, 'Le nom est obligatoire.').max(80),
  email,
  phone: telephoneFacultatif,
  job_title: z.string().trim().max(100).optional(),
  company_name: z.string().trim().min(2, 'Le nom de l’entreprise contient au moins 2 caractères.').max(150),
  company_type: z.string().min(1, 'Choisissez le type de compte.'),
  sector: z.string().optional(),
  legal_name: z.string().trim().max(200).optional(),
  ninea: z.string().trim().max(30).refine((v) => !v || /^[A-Za-z0-9 ]{5,30}$/.test(v), 'NINEA : 5 à 30 caractères (lettres, chiffres).').optional(),
  rccm: z.string().trim().max(60).refine((v) => !v || /^[A-Za-z0-9 ./-]{5,60}$/.test(v), 'RCCM : 5 à 60 caractères (lettres, chiffres, / . -).').optional(),
  address: z.string().trim().max(255).optional(),
  city: z.string().trim().max(100).optional(),
  company_phone: telephoneFacultatif,
  company_email: z.string().trim().max(254).refine((v) => !v || z.string().email().safeParse(v).success, 'Adresse e-mail invalide.').optional(),
  website: z.string().trim().max(255).refine((v) => !v || /^https?:\/\/.+\..+/.test(v), 'Adresse web complète attendue (https://…).').optional(),
  password: motDePasseFort,
  password_confirmation: z.string(),
}).refine((v) => v.password === v.password_confirmation, { path: ['password_confirmation'], message: 'La confirmation ne correspond pas.' });

const ETAPES = [
  { titre: 'Vous', champs: ['first_name', 'last_name', 'email', 'phone', 'job_title'] },
  { titre: 'Entreprise', champs: ['company_name', 'company_type', 'sector', 'legal_name', 'ninea', 'rccm'] },
  { titre: 'Coordonnées et accès', champs: ['address', 'city', 'company_phone', 'company_email', 'website', 'password', 'password_confirmation'] },
];

function versCorpsApi(v, invitation) {
  const n = videVersNull;
  const company = {
    name: v.company_name.trim(),
    type: v.company_type,
    sector: n(v.sector),
    legal_name: n(v.legal_name),
    ninea: n(v.ninea?.toUpperCase()),
    rccm: n(v.rccm?.toUpperCase()),
    address: n(v.address),
    city: n(v.city),
    country: 'SN',
    phone: n(v.company_phone),
    email: n(v.company_email),
    website: n(v.website),
  };
  return {
    first_name: v.first_name.trim(),
    last_name: v.last_name.trim(),
    email: v.email.trim(),
    ...(v.phone ? { phone: v.phone.trim() } : {}),
    job_title: n(v.job_title),
    password: v.password,
    password_confirmation: v.password_confirmation,
    company: Object.fromEntries(Object.entries(company).filter(([, val]) => val !== null)),
    ...(invitation ? { invitation_token: invitation } : {}),
  };
}

export default function RegisterPage() {
  useDocumentMeta({
    title: 'Créer le compte de votre entreprise',
    description: 'Créez l’espace Pro2Link de votre entreprise : acheteur, fournisseur ou les deux.',
  });
  const { options } = useReferentiels();
  const { ouvrirSession } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const invitation = params.get('invitation')?.slice(0, 200) || null;
  const [etape, setEtape] = useState(0);
  const [erreur, setErreur] = useState(null);

  const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { company_type: '', sector: '' },
  });

  async function suivant() {
    if (await trigger(ETAPES[etape].champs)) setEtape((e) => e + 1);
  }

  async function soumettre(v) {
    setErreur(null);
    try {
      const { data } = await inscription(versCorpsApi(v, invitation));
      ouvrirSession(data);
      navigate('/espace-entreprise', { replace: true, state: { nouvelleEntreprise: data?.company?.name } });
    } catch (e) {
      setErreur(e);
      // Erreur serveur sur un champ d'une étape précédente : y revenir.
      if (e.code === 'EMAIL_UTILISE') setEtape(0);
    }
  }

  const err = (nom) => errors[nom]?.message;

  return (
    <div>
      <h1 className="text-grand-titre font-semibold tracking-tight text-texte">Créer l’espace de votre entreprise</h1>
      <p className="mt-2 text-petit text-texte-secondaire">Quelques informations suffisent pour commencer. Vous pourrez compléter votre profil ensuite.</p>

      <ol className="mt-8 grid grid-cols-3 gap-2" aria-label="Étapes de l’inscription">
        {ETAPES.map((e, i) => (
          <li key={e.titre} aria-current={i === etape ? 'step' : undefined}>
            <span className={`block h-1.5 rounded-full ${i <= etape ? 'bg-primaire' : 'bg-bordure'}`} />
            <span className={`mt-2 flex items-center gap-1 text-legende font-medium ${i === etape ? 'text-primaire' : 'text-texte-secondaire'}`}>
              {i < etape ? <Check className="size-3.5" aria-hidden /> : null}{i + 1}. {e.titre}
            </span>
          </li>
        ))}
      </ol>

      <form
        onSubmit={etape < ETAPES.length - 1 ? (e) => { e.preventDefault(); suivant(); } : handleSubmit(soumettre)}
        className="mt-8 space-y-5"
        noValidate
      >
        {etape === 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Prénom" erreur={err('first_name')} obligatoire>{(p) => <Input {...p} autoComplete="given-name" {...register('first_name')} />}</Field>
              <Field label="Nom" erreur={err('last_name')} obligatoire>{(p) => <Input {...p} autoComplete="family-name" {...register('last_name')} />}</Field>
            </div>
            <Field label="E-mail professionnel" erreur={err('email')} obligatoire>{(p) => <Input {...p} type="email" autoComplete="email" {...register('email')} />}</Field>
            <Field label="Téléphone" erreur={err('phone')} aide="Ex. 77 123 45 67 ou +221771234567">{(p) => <Input {...p} type="tel" autoComplete="tel" {...register('phone')} />}</Field>
            <Field label="Fonction" erreur={err('job_title')}>{(p) => <Input {...p} autoComplete="organization-title" placeholder="Ex. Directrice des achats" {...register('job_title')} />}</Field>
          </>
        ) : null}

        {etape === 1 ? (
          <>
            <Field label="Nom de l’entreprise" erreur={err('company_name')} obligatoire>{(p) => <Input {...p} autoComplete="organization" {...register('company_name')} />}</Field>
            <Field label="Type de compte" erreur={err('company_type')} obligatoire aide="Acheteur, fournisseur, ou les deux.">
              {(p) => (
                <Select {...p} {...register('company_type')}>
                  <OptionsReferentiel options={options('type_entreprise')} vide="Choisir…" />
                </Select>
              )}
            </Field>
            <Field label="Secteur d’activité" erreur={err('sector')}>
              {(p) => (
                <Select {...p} {...register('sector')}>
                  <OptionsReferentiel options={options('secteur_activite')} vide="Non précisé" />
                </Select>
              )}
            </Field>
            <Field label="Raison sociale" erreur={err('legal_name')}>{(p) => <Input {...p} {...register('legal_name')} />}</Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="NINEA" erreur={err('ninea')}>{(p) => <Input {...p} {...register('ninea')} />}</Field>
              <Field label="RCCM" erreur={err('rccm')}>{(p) => <Input {...p} {...register('rccm')} />}</Field>
            </div>
          </>
        ) : null}

        {etape === 2 ? (
          <>
            <Field label="Adresse" erreur={err('address')}>{(p) => <Input {...p} autoComplete="street-address" {...register('address')} />}</Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Ville" erreur={err('city')}>{(p) => <Input {...p} autoComplete="address-level2" {...register('city')} />}</Field>
              <Field label="Téléphone de l’entreprise" erreur={err('company_phone')}>{(p) => <Input {...p} type="tel" {...register('company_phone')} />}</Field>
            </div>
            <Field label="E-mail de l’entreprise" erreur={err('company_email')}>{(p) => <Input {...p} type="email" {...register('company_email')} />}</Field>
            <Field label="Site web" erreur={err('website')}>{(p) => <Input {...p} type="url" placeholder="https://" {...register('website')} />}</Field>
            <Field label="Mot de passe" erreur={err('password')} aide={MOT_DE_PASSE_REGLE} obligatoire>{(p) => <PasswordInput {...p} autoComplete="new-password" {...register('password')} />}</Field>
            <Field label="Confirmer le mot de passe" erreur={err('password_confirmation')} obligatoire>{(p) => <PasswordInput {...p} autoComplete="new-password" {...register('password_confirmation')} />}</Field>
            <p className="text-legende text-texte-secondaire">
              En créant un compte, vous acceptez les <Link to="/conditions-utilisation" className="font-medium text-primaire hover:underline">conditions d’utilisation</Link> et
              la <Link to="/confidentialite" className="font-medium text-primaire hover:underline">politique de confidentialité</Link> de Pro2Link.
            </p>
          </>
        ) : null}

        <ErrorAlert erreur={erreur} titre="L’inscription n’a pas abouti" />

        <div className="flex gap-3 pt-2">
          {etape > 0 ? (
            <Button variante="neutre" icone={ArrowLeft} onClick={() => setEtape((e) => e - 1)} disabled={isSubmitting}>Précédent</Button>
          ) : null}
          {etape < ETAPES.length - 1 ? (
            <Button className="ml-auto" onClick={suivant}>Continuer <ArrowRight className="size-4" aria-hidden /></Button>
          ) : (
            <Button type="submit" className="ml-auto" chargement={isSubmitting}>Créer mon compte</Button>
          )}
        </div>
      </form>

      <p className="mt-8 text-center text-petit text-texte-secondaire">
        Déjà inscrit ? <Link to="/connexion" className="font-semibold text-primaire hover:underline">Se connecter</Link>
      </p>
    </div>
  );
}
