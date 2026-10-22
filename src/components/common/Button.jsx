import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner.jsx';

/**
 * Boutons de la charte : UN seul `primaire` par écran ; `secondaire` (turquoise,
 * texte foncé) pour mettre en avant une création, jamais pour un état.
 */
const VARIANTES = {
  primaire: 'bg-primaire text-sur-primaire hover:bg-primaire-survol border-transparent',
  // Sur la bande pleine bleue du site.
  clair: 'bg-white text-[var(--site-bande)] border-transparent hover:bg-white/90',
  'contour-clair': 'bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10',
  secondaire: 'bg-secondaire text-sur-secondaire hover:bg-secondaire-survol border-transparent',
  contour: 'bg-transparent text-primaire border-primaire hover:bg-primaire-teinte',
  neutre: 'bg-surface text-texte border-bordure-forte hover:bg-surface-alt',
  fantome: 'bg-transparent text-texte-secondaire border-transparent hover:bg-surface-alt hover:text-texte',
  danger: 'bg-danger text-white border-transparent hover:opacity-90',
  'danger-contour': 'bg-transparent text-danger border-danger/60 hover:bg-danger-fond',
};

const TAILLES = {
  sm: 'min-h-8 px-3 text-legende gap-1.5',
  md: 'min-h-10 px-4 text-petit gap-2',
  lg: 'min-h-12 px-6 text-[15px] gap-2.5',
};

export function classesBouton({ variante = 'primaire', taille = 'md', pleineLargeur = false, className = '' } = {}) {
  return [
    'inline-flex items-center justify-center rounded-champ border font-semibold leading-none whitespace-nowrap select-none',
    // Survol (couleur), appui (léger enfoncement), focus clavier visible.
    'transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px',
    'focus-visible:outline-none focus-visible:shadow-[var(--pl-focus)]',
    'disabled:cursor-not-allowed disabled:opacity-55 disabled:active:translate-y-0 aria-disabled:cursor-not-allowed aria-disabled:opacity-55',
    VARIANTES[variante] || VARIANTES.primaire,
    TAILLES[taille] || TAILLES.md,
    pleineLargeur ? 'w-full' : '',
    className,
  ].join(' ');
}

const Button = forwardRef(function Button(
  { variante, taille, pleineLargeur, className, chargement = false, icone: Icone, children, type = 'button', disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || chargement}
      aria-busy={chargement || undefined}
      className={classesBouton({ variante, taille, pleineLargeur, className })}
      {...props}
    >
      {chargement ? <Spinner taille="sm" /> : Icone ? <Icone aria-hidden className="size-4 shrink-0" /> : null}
      {children}
    </button>
  );
});

export default Button;

/** Lien interne présenté comme un bouton. */
export function ButtonLink({ to, variante, taille, pleineLargeur, className, icone: Icone, children, ...props }) {
  return (
    <Link to={to} className={classesBouton({ variante, taille, pleineLargeur, className })} {...props}>
      {Icone ? <Icone aria-hidden className="size-4 shrink-0" /> : null}
      {children}
    </Link>
  );
}
