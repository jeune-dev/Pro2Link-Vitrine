import { useId, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import Section, { LienFleche, SectionHeading } from '../marketing/Section.jsx';
import { FONCTIONNALITES } from '../../content/site.js';
import { DETAILS_FONCTIONNALITES } from '../../content/details.js';

/**
 * Fonctionnalités en « explorateur » : liste à gauche, détail à droite
 * (onglets verticaux accessibles au clavier). Sur mobile, la liste devient
 * un index compact où chaque fonctionnalité reste lisible sans interaction.
 */
export default function Fonctionnalites() {
  const [actif, setActif] = useState(0);
  const base = useId();
  const onglets = useRef([]);

  function clavier(e) {
    const dernier = FONCTIONNALITES.length - 1;
    let suivant = null;
    if (e.key === 'ArrowDown') suivant = actif === dernier ? 0 : actif + 1;
    if (e.key === 'ArrowUp') suivant = actif === 0 ? dernier : actif - 1;
    if (e.key === 'Home') suivant = 0;
    if (e.key === 'End') suivant = dernier;
    if (suivant !== null) {
      e.preventDefault();
      setActif(suivant);
      onglets.current[suivant]?.focus();
    }
  }

  const f = FONCTIONNALITES[actif];
  const d = DETAILS_FONCTIONNALITES[f.id];

  return (
    <Section id="fonctionnalites" fond="papier" labelledBy="titre-fonctionnalites" filet>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          id="titre-fonctionnalites"
          numero="03"
          surtitre="Fonctionnalités"
          titre="Tout le cycle commercial, du catalogue au paiement."
        />
        <LienFleche to="/fonctionnalites" className="shrink-0">Toutes les fonctionnalités</LienFleche>
      </div>

      {/* Grand écran : onglets verticaux + panneau de détail */}
      <div className="mt-14 hidden overflow-hidden rounded-carte border border-[var(--site-filet)] bg-surface lg:grid lg:grid-cols-[22rem_1fr]" data-revele>
        <div role="tablist" aria-orientation="vertical" aria-label="Fonctionnalités" className="border-r border-[var(--site-filet)] py-2" onKeyDown={clavier}>
          {FONCTIONNALITES.map(({ id, titre, icone: Icone }, i) => {
            const sel = i === actif;
            return (
              <button
                key={id}
                ref={(el) => { onglets.current[i] = el; }}
                type="button"
                role="tab"
                id={`${base}-onglet-${i}`}
                aria-selected={sel}
                aria-controls={`${base}-panneau`}
                tabIndex={sel ? 0 : -1}
                onClick={() => setActif(i)}
                className={`relative flex w-full items-center gap-3 px-6 py-3 text-left text-[15px] transition-colors ${
                  sel ? 'bg-primaire-teinte/60 font-semibold text-[var(--site-encre)]' : 'text-texte-secondaire hover:bg-surface-alt hover:text-[var(--site-encre)]'
                }`}
              >
                <span aria-hidden className={`absolute inset-y-2 left-0 w-0.5 rounded-r bg-primaire transition-opacity ${sel ? 'opacity-100' : 'opacity-0'}`} />
                <Icone className={`size-[18px] shrink-0 ${sel ? 'text-primaire' : 'text-texte-discret'}`} aria-hidden />
                {titre}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`${base}-panneau`} aria-labelledby={`${base}-onglet-${actif}`} className="flex flex-col p-10 xl:p-12">
          <div key={f.id} className="entree flex flex-1 flex-col">
            <p className="mono text-[12.5px] text-texte-discret">{String(actif + 1).padStart(2, '0')} / {String(FONCTIONNALITES.length).padStart(2, '0')}</p>
            <h3 className="titre-affiche mt-4 text-[30px]">{f.titre}</h3>
            <p className="texte-equilibre mt-4 max-w-xl text-[17px] leading-relaxed text-texte-secondaire">{f.texte}</p>
            <ul className="mt-8 space-y-3">
              {d.points.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] text-[var(--site-encre)]">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--site-detail)]" strokeWidth={2.5} aria-hidden />{p}
                </li>
              ))}
            </ul>
            <div className="mt-10 border-l-2 border-[var(--site-detail)] pl-5">
              <p className="mono text-[11.5px] text-texte-discret">Exemple d’utilisation</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--site-encre)]">{d.exemple}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile et tablette : index compact, tout est lisible */}
      <ol className="mt-12 border-t border-[var(--site-filet)] lg:hidden">
        {FONCTIONNALITES.map(({ id, titre, texte, icone: Icone }, i) => (
          <li key={id} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-[var(--site-filet)] py-5" data-revele>
            <Icone className="mt-0.5 size-5 text-primaire" aria-hidden />
            <div>
              <h3 className="font-semibold text-[var(--site-encre)]">
                <span className="mono mr-2 text-[12px] font-normal text-texte-discret">{String(i + 1).padStart(2, '0')}</span>{titre}
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-texte-secondaire">{texte}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
