import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { classesBouton } from '../../components/common/Button.jsx';
import { CtaBand, SectionHeading } from '../../components/marketing/Section.jsx';
import { FONCTIONNALITES } from '../../content/site.js';
import { DETAILS_FONCTIONNALITES } from '../../content/details.js';

export default function FeaturesPage() {
  useDocumentMeta({
    title: 'Fonctionnalités',
    description: 'Fournisseurs, catalogue, bons de commande, validation, livraisons, factures, paiements, notifications, historique et permissions : les fonctionnalités de Pro2Link.',
  });

  return (
    <>
      <header className="border-b border-bordure bg-fond">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            surtitre="Fonctionnalités"
            titre="Les outils d’une relation commerciale"
            accent="bien tenue."
            taille="lg"
            intro="Chaque fonctionnalité de Pro2Link répond à une étape concrète des échanges entre acheteurs et fournisseurs."
          />
          <nav aria-label="Sommaire des fonctionnalités" className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
            {FONCTIONNALITES.map((f) => (
              <a key={f.id} href={`#${f.id}`} className="rounded-full border border-bordure bg-surface px-3 py-1.5 text-petit text-texte-secondaire hover:border-primaire/40 hover:text-primaire">
                {f.titre}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
        {FONCTIONNALITES.map(({ id, icone: Icone, titre, texte }, i) => {
          const d = DETAILS_FONCTIONNALITES[id];
          return (
            <section key={id} id={id} aria-labelledby={`titre-${id}`} className="grid gap-8 rounded-feuille border border-bordure bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-champ bg-primaire-teinte text-primaire"><Icone className="size-5" aria-hidden /></span>
                  <span className="text-legende font-semibold uppercase tracking-wider text-texte-discret chiffres">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h2 id={`titre-${id}`} className="mt-5 text-titre font-semibold text-texte">{titre}</h2>
                <p className="mt-3 leading-relaxed text-texte-secondaire">{texte}</p>
              </div>
              <div className="space-y-5">
                <ul className="space-y-3">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-3 text-texte"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-succes" aria-hidden /><span>{p}</span></li>
                  ))}
                </ul>
                <div className="flex gap-3 rounded-carte bg-secondaire-teinte p-4">
                  <Lightbulb className="mt-0.5 size-5 shrink-0 text-secondaire-survol" aria-hidden />
                  <p className="text-petit text-texte"><span className="font-semibold">Exemple d’utilisation : </span>{d.exemple}</p>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand titre="Prêt à centraliser vos échanges commerciaux ?" texte="Découvrez comment une commande circule entre acheteur et fournisseur.">
        <Link to="/comment-ca-marche" className={classesBouton({ variante: 'clair', taille: 'lg' })}>
          Voir comment ça marche <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link to="/inscription" className={classesBouton({ variante: 'contour-clair', taille: 'lg' })}>
          Commencer
        </Link>
      </CtaBand>
    </>
  );
}
