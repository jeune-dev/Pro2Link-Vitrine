import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Monitor, Smartphone, X } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { classesBouton } from '../../components/common/Button.jsx';
import { DemoTag } from '../../components/common/Notice.jsx';
import DashboardMockup from '../../components/marketing/DashboardMockup.jsx';
import MobileMockup from '../../components/marketing/MobileMockup.jsx';
import Section, { CtaBand, SectionHeading } from '../../components/marketing/Section.jsx';
import { AVANTAGES, AVANT_APRES, ETAPES, FAQ, FONCTIONNALITES, PROBLEMES, PROFILS, REFERENCES } from '../../content/site.js';

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
      <CommentCaMarche />
      <Profils />
      <Avantages />
      <Apercu />
      {REFERENCES.length ? <References /> : null}
      <Faq />
      <CtaBand
        titre="Simplifiez dès aujourd’hui la gestion de vos échanges commerciaux."
        texte="Créez l’espace de votre entreprise et invitez vos partenaires à travailler avec vous sur Pro2Link."
      >
        <Link to="/inscription" className={classesBouton({ variante: 'secondaire', taille: 'lg' })}>
          Commencer <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link to="/connexion" className={classesBouton({ variante: 'contour', taille: 'lg', className: '!border-sur-primaire/40 !text-sur-primaire hover:!bg-white/10' })}>
          Se connecter
        </Link>
      </CtaBand>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div aria-hidden className="fond-grille pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-primaire-teinte blur-3xl opacity-70" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="apparition">
          <p className="inline-flex items-center gap-2 rounded-full border border-bordure bg-surface px-3 py-1 text-legende font-medium text-texte-secondaire">
            <span className="size-1.5 rounded-full bg-secondaire" aria-hidden />
            Plateforme B2B · Web et mobile · Sénégal
          </p>
          <h1 className="mt-6 text-[38px] font-semibold leading-[1.08] tracking-tight text-texte sm:text-[52px]">
            Gérez vos relations commerciales.{' '}
            <span className="text-primaire">Simplement.</span>
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
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-petit text-texte-secondaire">
            {['Bons de commande validés à deux', 'Factures liées aux commandes', 'Soldes à jour à chaque paiement'].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="size-4 text-succes" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>
        <div className="apparition relative [animation-delay:120ms]">
          <DashboardMockup />
          <p className="mt-10 flex justify-end"><DemoTag>Aperçu illustratif, données fictives</DemoTag></p>
        </div>
      </div>
    </section>
  );
}

function Problemes() {
  return (
    <Section fond="alt" labelledBy="titre-problemes">
      <SectionHeading
        id="titre-problemes"
        surtitre="Le constat"
        titre="Vos échanges commerciaux méritent mieux qu’un fil de discussion."
        intro="Aujourd’hui, les commandes entre entreprises passent par une multitude d’outils. Résultat : des erreurs, des oublis et peu de visibilité."
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PROBLEMES.map(({ icone: Icone, titre, texte }) => (
          <li key={titre} className="rounded-carte border border-bordure bg-surface p-5">
            <span className="flex size-10 items-center justify-center rounded-champ bg-danger-fond text-danger"><Icone className="size-5" aria-hidden /></span>
            <h3 className="mt-4 font-semibold text-texte">{titre}</h3>
            <p className="mt-1.5 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid items-stretch gap-4 rounded-feuille border border-bordure bg-surface p-5 sm:p-8 lg:grid-cols-[1fr_auto_1.6fr]">
        <div>
          <p className="text-petit font-semibold text-texte-secondaire">Avant</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {AVANT_APRES.avant.map((o) => (
              <li key={o} className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt px-3 py-1.5 text-petit text-texte-secondaire">
                <X className="size-3.5 text-danger" aria-hidden />{o}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center text-texte-discret" aria-hidden>
          <ArrowRight className="size-6 rotate-90 lg:rotate-0" />
        </div>
        <div>
          <p className="text-petit font-semibold text-primaire">Avec Pro2Link, un seul parcours</p>
          <ol className="mt-3 flex flex-wrap items-center gap-1.5">
            {AVANT_APRES.apres.map((o, i) => (
              <li key={o} className="flex items-center gap-1.5">
                <span className="rounded-full bg-primaire-teinte px-3 py-1.5 text-petit font-medium text-primaire">{o}</span>
                {i < AVANT_APRES.apres.length - 1 ? <ArrowRight className="size-3.5 text-texte-discret" aria-hidden /> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

function Fonctionnalites() {
  return (
    <Section id="fonctionnalites" labelledBy="titre-fonctionnalites">
      <SectionHeading
        id="titre-fonctionnalites"
        surtitre="Fonctionnalités"
        titre="Tout le cycle commercial, du catalogue au paiement."
        intro="Pro2Link réunit les outils dont acheteurs et fournisseurs ont besoin pour travailler ensemble, sans ressaisie."
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {FONCTIONNALITES.map(({ id, icone: Icone, titre, texte }) => (
          <li key={id} className="group rounded-carte border border-bordure bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primaire/30 hover:shadow-elevee">
            <span className="flex size-10 items-center justify-center rounded-champ bg-primaire-teinte text-primaire transition-colors group-hover:bg-primaire group-hover:text-sur-primaire">
              <Icone className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-semibold text-texte">{titre}</h3>
            <p className="mt-1.5 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <Link to="/fonctionnalites" className="inline-flex items-center gap-1.5 font-semibold text-primaire hover:underline">
          Voir le détail des fonctionnalités <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}

function CommentCaMarche() {
  return (
    <Section id="comment-ca-marche" fond="alt" labelledBy="titre-parcours">
      <SectionHeading
        id="titre-parcours"
        surtitre="Comment ça marche ?"
        titre="Un bon de commande, validé par les deux parties."
        intro="Pas de panier de marketplace : Pro2Link suit le processus réel des échanges entre professionnels."
      />
      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ETAPES.map(({ titre, texte, icone: Icone, acteur }, i) => (
          <li key={titre} className="relative rounded-carte border border-bordure bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="flex size-9 items-center justify-center rounded-full bg-primaire text-petit font-semibold text-sur-primaire chiffres">{i + 1}</span>
              <Icone className="size-5 text-texte-discret" aria-hidden />
            </div>
            <h3 className="mt-4 font-semibold text-texte">{titre}</h3>
            <p className="mt-1.5 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
            <p className="mt-3 text-legende font-medium text-secondaire-survol">{acteur}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 text-center">
        <Link to="/comment-ca-marche" className="inline-flex items-center gap-1.5 font-semibold text-primaire hover:underline">
          Parcours acheteur et parcours fournisseur <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}

function Profils() {
  return (
    <Section id="entreprises" labelledBy="titre-profils">
      <SectionHeading
        id="titre-profils"
        surtitre="Une plateforme pour votre activité"
        titre="Pensée pour toutes les entreprises qui achètent et vendent entre elles."
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PROFILS.map(({ icone: Icone, titre, texte }) => (
          <li key={titre} className="rounded-carte border border-bordure bg-gradient-to-b from-surface to-fond p-6 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondaire-teinte text-secondaire-survol"><Icone className="size-6" aria-hidden /></span>
            <h3 className="mt-4 font-semibold text-texte">{titre}</h3>
            <p className="mt-1.5 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Avantages() {
  return (
    <Section fond="alt" labelledBy="titre-avantages">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          id="titre-avantages"
          centre={false}
          surtitre="Les avantages"
          titre="Moins de temps perdu, plus de visibilité."
          intro="Chaque entreprise sait simplement ce qu’elle a commandé, ce qui est en cours, ce qu’elle a reçu, ce qu’elle doit et ce qu’elle a payé."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {AVANTAGES.map(({ icone: Icone, titre, texte }, i) => (
            <li key={titre} className={`flex gap-4 rounded-carte border border-bordure bg-surface p-5 ${i === AVANTAGES.length - 1 ? 'sm:col-span-2' : ''}`}>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-champ bg-succes-fond text-succes"><Icone className="size-5" aria-hidden /></span>
              <div>
                <h3 className="font-semibold text-texte">{titre}</h3>
                <p className="mt-1 text-petit leading-relaxed text-texte-secondaire">{texte}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Apercu() {
  return (
    <Section labelledBy="titre-apercu" className="overflow-hidden">
      <SectionHeading
        id="titre-apercu"
        surtitre="Web et mobile"
        titre="Au bureau comme sur le terrain."
        intro="L’application Web pour la gestion complète, l’application mobile pour les opérations essentielles. Les mêmes données, synchronisées."
      />
      <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2 text-petit font-semibold text-texte"><Monitor className="size-4 text-primaire" aria-hidden />Application Web</div>
          <DashboardMockup />
        </div>
        <div>
          <div className="mb-4 flex items-center justify-center gap-2 text-petit font-semibold text-texte"><Smartphone className="size-4 text-primaire" aria-hidden />Application mobile (Android et iOS)</div>
          <MobileMockup />
        </div>
      </div>
      <p className="mt-12 text-center"><DemoTag>Maquettes illustratives : noms et montants fictifs</DemoTag></p>
    </Section>
  );
}

function References() {
  return (
    <Section fond="alt" labelledBy="titre-references">
      <SectionHeading id="titre-references" surtitre="Ils utilisent Pro2Link" titre="Ils nous font confiance" />
      <ul className="mt-10 flex flex-wrap items-center justify-center gap-10">
        {REFERENCES.map((r) => (
          <li key={r.nom}><img src={r.logo} alt={r.nom} loading="lazy" className="h-10 w-auto opacity-80" /></li>
        ))}
      </ul>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq" fond="alt" labelledBy="titre-faq">
      <SectionHeading id="titre-faq" surtitre="FAQ" titre="Questions fréquentes" />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-bordure rounded-feuille border border-bordure bg-surface">
        {FAQ.map(({ q, r }) => (
          <details key={q} className="group px-5 py-1 sm:px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-texte [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown className="size-5 shrink-0 text-texte-secondaire transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="pb-5 text-petit leading-relaxed text-texte-secondaire">{r}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
