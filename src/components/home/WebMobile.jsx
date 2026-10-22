import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { classesBouton } from '../common/Button.jsx';
import DashboardMockup from '../marketing/DashboardMockup.jsx';
import MobileMockup from '../marketing/MobileMockup.jsx';
import Section, { ListeCoches, SectionHeading } from '../marketing/Section.jsx';
import { SYNCHRO } from '../../content/site.js';

/** Bande pleine (la seule section sombre) : Web et mobile, mêmes données. */
export default function WebMobile() {
  return (
    <Section fond="sombre" labelledBy="titre-web-mobile" className="overflow-hidden">
      <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            id="titre-web-mobile"
            sombre
            numero="04"
            surtitre="Web et mobile"
            titre="Au bureau comme sur le terrain."
            intro="L’application Web pour la gestion complète, l’application mobile pour les opérations essentielles : un fournisseur peut tout gérer depuis son smartphone."
          />
          <div className="mt-10"><ListeCoches items={SYNCHRO} sombre Icone={Check} /></div>
          <Link to="/inscription" className={`${classesBouton({ variante: 'clair', taille: 'lg' })} mt-10`}>
            Créer l’espace de mon entreprise <ArrowRight className="fleche size-4" aria-hidden />
          </Link>
        </div>

        <figure className="relative" data-revele>
          <div className="hidden pl-20 sm:block">
            <div className="rounded-feuille border border-white/15 bg-white/[0.06] p-2.5">
              <DashboardMockup />
            </div>
          </div>
          <div className="mx-auto w-fit sm:absolute sm:-bottom-10 sm:left-0">
            <MobileMockup className="!w-[200px]" />
          </div>
          <figcaption className="mono mt-8 text-right text-[11px] text-white/60 sm:mt-14">
            Maquettes illustratives — noms et montants fictifs
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
