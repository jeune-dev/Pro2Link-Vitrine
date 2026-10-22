import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Plus, Sparkles, X } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { classesBouton } from '../../components/common/Button.jsx';
import { DemoTag } from '../../components/common/Notice.jsx';
import DashboardMockup from '../../components/marketing/DashboardMockup.jsx';
import MobileMockup from '../../components/marketing/MobileMockup.jsx';
import Section, { CtaBand, ListeCoches, SectionHeading } from '../../components/marketing/Section.jsx';
import {
  AVANTAGES, AVANT_APRES, ETAPES, FAQ, FONCTIONNALITES, PROBLEMES, PROFILS, REFERENCES, REPERES, SYNCHRO,
} from '../../content/site.js';
import { config } from '../../utils/config.js';

export default function HomePage() {
  useDocumentMeta({
    title: 'Gérez vos relations commerciales B2B',
    description: 'Pro2Link centralise vos fournisseurs, bons de commande, factures et paiements dans une seule plateforme pensée pour les professionnels au Sénégal.',
  });

  return (
    <>
      <Hero />
      <Problemes />
      <Fonctionnalites />
      <WebEtMobile />
      <CommentCaMarche />
      <Profils />
      <Avantages />
      {REFERENCES.length ? <References /> : null}
      <CtaBand
        titre="Simplifiez dès aujourd’hui la gestion de vos échanges commerciaux."
        texte="Créez l’espace de votre entreprise, ajoutez vos partenaires et envoyez votre premier bon de commande."
      >
        <Link to="/inscription" className={classesBouton({ variante: 'clair', taille: 'lg' })}>
          Commencer <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link to="/connexion" className={classesBouton({ variante: 'contour-clair', taille: 'lg' })}>
          Se connecter
        </Link>
      </CtaBand>
      <Faq />
    </>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-0 size-[620px] rounded-full bg-[var(--site-halo)] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-1/3 top-64 size-[360px] rounded-full bg-primaire-teinte blur-3xl opacity-70" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-8 lg:pt-20">
        <div className="apparition">
          <p className="surtitre">Plateforme B2B — web &amp; mobile</p>
          <h1 className="titre-affiche mt-6 text-[40px] text-texte sm:text-[58px]">
            Gérez vos relations commerciales.{' '}
            <span className="text-[var(--site-accent)]">Simplement.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sous-titre leading-relaxed text-texte-secondaire">
            Pro2Link centralise vos fournisseurs, commandes, factures et paiements dans une seule plateforme pensée pour les professionnels.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/fonctionnalites" className={classesBouton({ variante: 'primaire', taille: 'lg' })}>
              Découvrir Pro2Link <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link to="/connexion" className={classesBouton({ variante: 'neutre', taille: 'lg' })}>
              Accéder à la plateforme
            </Link>
          </div>
          <ul className="mt-8 grid gap-x-6 gap-y-2.5 text-petit text-texte-secondaire sm:grid-cols-2">
            {['Bons de commande validés à deux', 'Factures liées aux commandes', 'Soldes à jour à chaque paiement', 'Web, Android et iOS'].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-[var(--site-accent)]" strokeWidth={2.5} aria-hidden />{t}</li>
            ))}
          </ul>
        </div>
        <div className="apparition relative [animation-delay:120ms]">
          <DashboardMockup />
          <p className="mt-10 flex justify-end"><DemoTag>Aperçu illustratif, données fictives</DemoTag></p>
        </div>
      </div>

      {/* Repères produit (faits du cahier des charges, pas des chiffres commerciaux). */}
      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-feuille border border-bordure bg-bordure shadow-douce lg:grid-cols-4">
          {REPERES.map((r) => (
            <div key={r.libelle} className="bg-surface px-6 py-6 text-center">
              <dt className="sr-only">{r.libelle}</dt>
              <dd>
                <span className="titre-affiche block text-[34px] text-primaire chiffres">{r.valeur}</span>
                <span className="mt-1 block text-petit text-texte-secondaire">{r.libelle}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────────── Problèmes ─────────────────────────── */

function Problemes() {
  return (
    <Section fond="alt" labelledBy="titre-problemes">
      <SectionHeading
        id="titre-problemes"
        surtitre="Le constat"
        titre="Vos échanges commerciaux méritent mieux"
        accent="qu’un fil de discussion."
        intro="Aujourd’hui, les commandes entre entreprises passent par une multitude d’outils. Résultat : des erreurs, des oublis et peu de visibilité."
      />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-feuille border border-bordure bg-bordure sm:grid-cols-2 lg:grid-cols-5">
        {PROBLEMES.map(({ icone: Icone, titre, texte }) => (
          <li key={titre} className="bg-surface p-6">
            <span className="flex size-10 items-center justify-center rounded-champ border border-danger/25 bg-danger-fond text-danger"><Icone className="size-5" aria-hidden /></span>
            <h3 className="mt-5 font-bold text-texte">{titre}</h3>
            <p className="mt-2 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid items-center gap-6 rounded-feuille border border-bordure bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_auto_1.7fr]">
        <div>
          <p className="text-legende font-bold uppercase tracking-[0.14em] text-texte-secondaire">Avant</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {AVANT_APRES.avant.map((o) => (
              <li key={o} className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt px-3 py-1.5 text-petit text-texte-secondaire line-through decoration-danger/60">
                <X className="size-3.5 text-danger" aria-hidden />{o}
              </li>
            ))}
          </ul>
        </div>
        <span className="flex size-10 items-center justify-center rounded-full bg-primaire text-sur-primaire justify-self-center" aria-hidden>
          <ArrowRight className="size-5 rotate-90 lg:rotate-0" />
        </span>
        <div>
          <p className="text-legende font-bold uppercase tracking-[0.14em] text-[var(--site-accent)]">Avec Pro2Link, un seul parcours</p>
          <ol className="mt-3 flex flex-wrap items-center gap-1.5">
            {AVANT_APRES.apres.map((o, i) => (
              <li key={o} className="flex items-center gap-1.5">
                <span className="rounded-full border border-primaire/15 bg-primaire-teinte px-3 py-1.5 text-petit font-semibold text-primaire">{o}</span>
                {i < AVANT_APRES.apres.length - 1 ? <ArrowRight className="size-3.5 text-texte-discret" aria-hidden /> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── Fonctionnalités ───────────────────────── */

function Fonctionnalites() {
  return (
    <Section id="fonctionnalites" labelledBy="titre-fonctionnalites">
      <SectionHeading
        id="titre-fonctionnalites"
        surtitre="Fonctionnalités"
        titre="Tout le cycle commercial,"
        accent="du catalogue au paiement."
        intro="Pro2Link réunit les outils dont acheteurs et fournisseurs ont besoin pour travailler ensemble, sans ressaisie."
      />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-feuille border border-bordure bg-bordure sm:grid-cols-2 lg:grid-cols-5">
        {FONCTIONNALITES.map(({ id, icone: Icone, titre, texte, tags = [] }) => (
          <li key={id} className="group flex flex-col bg-surface p-6 transition-colors hover:bg-primaire-teinte/30">
            <span className="flex size-10 items-center justify-center rounded-champ border border-bordure-forte text-primaire transition-colors group-hover:border-primaire group-hover:bg-primaire group-hover:text-sur-primaire">
              <Icone className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 font-bold text-texte">{titre}</h3>
            <p className="mt-2 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
            {tags.length ? (
              <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-texte-secondaire">{tags.join(' · ')}</p>
            ) : null}
            <Link to={`/fonctionnalites#${id}`} className="mt-auto inline-flex items-center gap-1.5 pt-5 text-petit font-semibold text-primaire hover:gap-2.5 transition-all">
              En savoir plus <ArrowRight className="size-4" aria-hidden /><span className="sr-only"> sur {titre}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ───────────────────── Web et mobile (bande sombre) ───────────────────── */

function WebEtMobile() {
  return (
    <Section fond="sombre" labelledBy="titre-web-mobile" className="overflow-hidden">
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            id="titre-web-mobile"
            centre={false}
            sombre
            surtitre="Web et mobile"
            titre="Au bureau comme sur le terrain."
            accent="Les mêmes données."
            intro="L’application Web pour la gestion complète, l’application mobile pour les opérations essentielles — un fournisseur peut tout gérer depuis son smartphone."
          />
          <div className="mt-10"><ListeCoches items={SYNCHRO} sombre Icone={Check} /></div>
          <Link to="/inscription" className={`${classesBouton({ variante: 'clair', taille: 'lg' })} mt-10`}>
            Créer l’espace de mon entreprise <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="relative sm:pb-48 lg:pb-40">
          <div className="rounded-[22px] border border-white/15 bg-white/5 p-3 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:ml-24">
            <DashboardMockup />
          </div>
          <div className="absolute bottom-0 left-0 hidden sm:block">
            <MobileMockup className="!w-[200px]" />
          </div>
          <p className="mt-6 flex justify-end sm:mt-10"><DemoTag>Maquettes illustratives : noms et montants fictifs</DemoTag></p>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── Comment ça marche ─────────────────────── */

function CommentCaMarche() {
  const rangees = [ETAPES.slice(0, 4), ETAPES.slice(4)];
  return (
    <Section id="comment-ca-marche" labelledBy="titre-parcours">
      <SectionHeading
        id="titre-parcours"
        surtitre="Comment ça marche ?"
        titre="Un bon de commande,"
        accent="validé par les deux parties."
        intro="Pas de panier de marketplace : Pro2Link suit le processus réel des échanges entre professionnels."
      />
      <ol className="mt-16 space-y-12">
        {rangees.map((rangee, r) => (
          <li key={r} className="relative">
            <span aria-hidden className="absolute left-5 right-5 top-5 hidden h-px bg-gradient-to-r from-bordure-forte via-[var(--site-accent)]/40 to-bordure-forte lg:block" />
            <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {rangee.map(({ titre, texte, acteur }, i) => {
                const n = r * 4 + i + 1;
                return (
                  <li key={titre}>
                    <span className="flex size-10 items-center justify-center rounded-full border-2 border-primaire bg-surface text-petit font-bold text-primaire chiffres">
                      {String(n).padStart(2, '0')}
                    </span>
                    <h3 className="mt-5 font-bold text-texte">{titre}</h3>
                    <p className="mt-2 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
                    <p className="mt-3 inline-flex rounded-full bg-secondaire-teinte px-2.5 py-0.5 text-legende font-semibold text-[var(--site-accent)]">{acteur}</p>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
      <div className="mt-16 flex flex-col items-start gap-5 rounded-feuille border border-primaire/15 bg-primaire-teinte/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <p className="flex items-start gap-3 font-semibold text-texte">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-[var(--site-accent)]" aria-hidden />
          Acheteur ou fournisseur, découvrez votre parcours détaillé, du bon de commande jusqu’au paiement.
        </p>
        <Link to="/comment-ca-marche" className={classesBouton({ variante: 'primaire' })}>
          Voir les parcours <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}

/* ───────────────────────────── Profils ───────────────────────────── */

function Profils() {
  return (
    <Section id="entreprises" fond="alt" labelledBy="titre-profils">
      <SectionHeading
        id="titre-profils"
        surtitre="Une plateforme pour votre activité"
        titre="Pensée pour les entreprises"
        accent="qui achètent et vendent entre elles."
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PROFILS.map(({ icone: Icone, titre, texte }) => (
          <li key={titre} className="rounded-feuille border border-bordure bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-elevee">
            <span className="flex size-12 items-center justify-center rounded-full bg-secondaire-teinte text-[var(--site-accent)]"><Icone className="size-6" aria-hidden /></span>
            <h3 className="mt-5 font-bold text-texte">{titre}</h3>
            <p className="mt-2 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─────────────────────────── Avantages ─────────────────────────── */

function Avantages() {
  const [principal, ...autres] = [AVANTAGES[AVANTAGES.length - 1], ...AVANTAGES.slice(0, -1)];
  return (
    <Section labelledBy="titre-avantages">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            id="titre-avantages"
            centre={false}
            surtitre="Pourquoi Pro2Link"
            titre="Moins de temps perdu,"
            accent="plus de visibilité."
            intro="Chaque entreprise sait simplement ce qu’elle a commandé, ce qui est en cours, ce qu’elle a reçu, ce qu’elle doit et ce qu’elle a payé."
          />
          <p className="mt-6 flex items-center gap-3 text-petit font-medium text-texte">
            <principal.icone className="size-5 text-[var(--site-accent)]" aria-hidden />
            {principal.titre} — {principal.texte}
          </p>
          <Link to="/inscription" className={`${classesBouton({ variante: 'primaire', taille: 'lg' })} mt-8`}>
            Commencer <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {autres.map(({ icone: Icone, titre, texte }) => (
            <li key={titre} className="rounded-feuille border border-primaire/15 bg-primaire-teinte/40 p-6 shadow-douce">
              <span className="flex size-10 items-center justify-center rounded-champ bg-primaire text-sur-primaire"><Icone className="size-5" aria-hidden /></span>
              <h3 className="mt-5 font-bold text-texte">{titre}</h3>
              <p className="mt-2 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function References() {
  return (
    <Section fond="alt" labelledBy="titre-references">
      <SectionHeading id="titre-references" surtitre="Ils utilisent Pro2Link" titre="Ils nous font" accent="confiance" />
      <ul className="mt-10 flex flex-wrap items-center justify-center gap-10">
        {REFERENCES.map((r) => (
          <li key={r.nom}><img src={r.logo} alt={r.nom} loading="lazy" className="h-10 w-auto opacity-80" /></li>
        ))}
      </ul>
    </Section>
  );
}

/* ───────────────────────────── FAQ ───────────────────────────── */

function Faq() {
  return (
    <Section id="faq" fond="alt" labelledBy="titre-faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            id="titre-faq"
            centre={false}
            surtitre="Questions fréquentes"
            titre="Les réponses"
            accent="avant de commencer."
            intro="Une autre question ? Créez l’espace de votre entreprise pour découvrir la plateforme."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {config.contactEmail ? (
              <a href={`mailto:${config.contactEmail}`} className={classesBouton({ variante: 'neutre' })}>
                <Mail className="size-4 text-primaire" aria-hidden /> {config.contactEmail}
              </a>
            ) : null}
            <Link to="/inscription" className={classesBouton({ variante: config.contactEmail ? 'fantome' : 'neutre' })}>
              Créer mon espace <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          {FAQ.map(({ q, r }, i) => (
            <details
              key={q}
              open={i === 0}
              className="group rounded-carte border border-bordure bg-surface px-5 transition-colors open:border-primaire/35 open:shadow-douce sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-texte [&::-webkit-details-marker]:hidden">
                {q}
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primaire-teinte text-primaire transition-transform group-open:rotate-45 group-open:bg-primaire group-open:text-sur-primaire" aria-hidden>
                  <Plus className="size-3.5" strokeWidth={2.5} />
                </span>
              </summary>
              <p className="pb-5 text-petit leading-relaxed text-texte-secondaire">{r}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
