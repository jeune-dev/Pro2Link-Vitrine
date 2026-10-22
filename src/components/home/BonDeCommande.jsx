import { Check } from 'lucide-react';
import { Badge } from '../common/StatusBadge.jsx';
import { tonDe } from '../../theme/statuts.js';

/**
 * Visuel du hero : un bon de commande Pro2Link, rendu en HTML/CSS.
 * Il illustre le cœur du produit — la proposition modifiée par le fournisseur
 * avant validation. EXEMPLE ILLUSTRATIF : entreprises, produits et montants
 * fictifs (signalé sous le visuel).
 */
const LIGNES = [
  { produit: 'Riz parfumé — sac 25 kg', avant: 20, qte: 16, pu: 18500 },
  { produit: 'Huile végétale — bidon 20 L', qte: 6, pu: 24000 },
  { produit: 'Sucre en poudre — sac 50 kg', qte: 4, pu: 27500 },
];

const fcfa = (n) => new Intl.NumberFormat('fr-FR').format(n);
const totalHT = LIGNES.reduce((s, l) => s + l.qte * l.pu, 0);
const tva = Math.round(totalHT * 0.18);

const ETAPES = ['Envoyé', 'Proposition', 'Validé', 'Livré', 'Facturé'];
const ETAPE_COURANTE = 1;

export default function BonDeCommande() {
  return (
    <figure className="relative mx-auto w-full max-w-[540px]" aria-label="Exemple de bon de commande avec une proposition modifiée par le fournisseur">
      {/* Feuille de dessous : le document a un historique de versions. */}
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-carte border border-[var(--site-filet)] bg-[var(--site-papier)]" />

      <div className="relative overflow-hidden rounded-carte border border-[var(--site-filet)] bg-surface shadow-[0_1px_2px_rgb(16_24_40/0.05),0_24px_48px_-28px_rgb(19_41_61/0.35)]">
        {/* En-tête du document */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--site-filet)] px-6 pb-4 pt-5">
          <div>
            <p className="mono text-[11px] tracking-[0.12em] text-texte-discret">BON DE COMMANDE</p>
            <p className="mono mt-1 text-[17px] font-semibold text-[var(--site-encre)]">BC-2026-00142</p>
          </div>
          <div className="pt-0.5 text-right">
            <Badge ton={tonDe('commande', 'proposition_modifiee')}>Proposition modifiée</Badge>
            <p className="mono mt-2 text-[11px] text-texte-discret">Version 2</p>
          </div>
        </div>

        {/* Parties */}
        <dl className="grid grid-cols-2 border-b border-[var(--site-filet)] text-[13px]">
          <div className="border-r border-[var(--site-filet)] px-6 py-3">
            <dt className="text-[11px] text-texte-discret">Acheteur</dt>
            <dd className="mt-0.5 font-medium text-[var(--site-encre)]">Restaurant Le Baobab</dd>
          </div>
          <div className="px-6 py-3">
            <dt className="text-[11px] text-texte-discret">Fournisseur</dt>
            <dd className="mt-0.5 font-medium text-[var(--site-encre)]">Distribution Atlantique</dd>
          </div>
        </dl>

        {/* Lignes */}
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] text-texte-discret">
              <th scope="col" className="px-6 pb-2 pt-3 font-normal">Produit</th>
              <th scope="col" className="px-2 pb-2 pt-3 text-right font-normal">Qté</th>
              <th scope="col" className="hidden px-2 pb-2 pt-3 text-right font-normal sm:table-cell">P.U.</th>
              <th scope="col" className="px-6 pb-2 pt-3 text-right font-normal">Total</th>
            </tr>
          </thead>
          <tbody className="mono">
            {LIGNES.map((l) => (
              <tr key={l.produit} className={`border-t border-[var(--site-filet)] ${l.avant ? 'bg-avertissement-fond/60' : ''}`}>
                <td className="px-6 py-2.5 font-sans text-[var(--site-encre)]">
                  {l.produit}
                  {l.avant ? <span className="mt-0.5 block text-[11px] text-avertissement">Modifié par le fournisseur</span> : null}
                </td>
                <td className="whitespace-nowrap px-2 py-2.5 text-right text-[var(--site-encre)]">
                  {l.avant ? (
                    <>
                      <span className="bc-avant mr-1.5 text-texte-discret">{l.avant}</span>
                      <span className="bc-apres font-semibold">{l.qte}</span>
                    </>
                  ) : l.qte}
                </td>
                <td className="hidden whitespace-nowrap px-2 py-2.5 text-right text-texte-secondaire sm:table-cell">{fcfa(l.pu)}</td>
                <td className="whitespace-nowrap px-6 py-2.5 text-right text-[var(--site-encre)]">{fcfa(l.qte * l.pu)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totaux */}
        <dl className="mono border-t border-[var(--site-filet)] px-6 py-3 text-[12.5px]">
          <div className="flex justify-between py-0.5 text-texte-secondaire"><dt className="font-sans">Total HT</dt><dd>{fcfa(totalHT)}</dd></div>
          <div className="flex justify-between py-0.5 text-texte-secondaire"><dt className="font-sans">TVA 18 %</dt><dd>{fcfa(tva)}</dd></div>
          <div className="mt-1 flex justify-between border-t border-dashed border-[var(--site-filet)] pt-2 text-[15px] font-semibold text-[var(--site-encre)]">
            <dt className="font-sans">Total TTC</dt><dd>{fcfa(totalHT + tva)} FCFA</dd>
          </div>
        </dl>

        {/* Étapes */}
        <ol className="flex items-center gap-1 border-t border-[var(--site-filet)] bg-[var(--site-papier)] px-4 py-3 text-[11px] sm:gap-1.5 sm:px-6">
          {ETAPES.map((e, i) => {
            const faite = i < ETAPE_COURANTE;
            const courante = i === ETAPE_COURANTE;
            return (
              <li key={e} className="flex min-w-0 items-center gap-1 sm:gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-petit px-1.5 py-1 ${
                    faite ? 'text-succes' : courante ? 'bc-etape-active bg-primaire font-semibold text-sur-primaire' : 'text-texte-discret'
                  }`}
                >
                  {faite ? <Check className="size-3" strokeWidth={3} aria-hidden /> : null}
                  {e}
                </span>
                {i < ETAPES.length - 1 ? <span aria-hidden className="h-px w-2 shrink-0 bg-[var(--site-filet)] sm:w-3" /> : null}
              </li>
            );
          })}
        </ol>
      </div>

      <figcaption className="mono mt-6 text-right text-[11px] text-texte-discret">
        Exemple illustratif — entreprises et montants fictifs
      </figcaption>
    </figure>
  );
}
