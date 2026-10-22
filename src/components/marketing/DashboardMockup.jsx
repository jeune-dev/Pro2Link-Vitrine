import { Bell, Boxes, CheckCircle2, ClipboardList, FileText, LayoutDashboard, Search, Truck, Users, Wallet } from 'lucide-react';
import { Badge } from '../common/StatusBadge.jsx';
import { tonDe } from '../../theme/statuts.js';

/**
 * Composition illustrative de l'interface Pro2Link, réalisée en React/CSS.
 * Toutes les valeurs affichées sont FICTIVES (illustration du produit) : elles
 * ne décrivent ni des clients ni des volumes réels.
 */

const COMMANDES = [
  { num: 'BC-0142', partenaire: 'Distribution Alpha', montant: '1 240 000', statut: 'proposition_modifiee', libelle: 'Proposition modifiée' },
  { num: 'BC-0141', partenaire: 'Grossiste Beta', montant: '386 500', statut: 'en_preparation', libelle: 'En préparation' },
  { num: 'BC-0139', partenaire: 'Agro Gamma', montant: '2 075 000', statut: 'livree', libelle: 'Livrée' },
  { num: 'BC-0137', partenaire: 'Hôtel Delta', montant: '642 000', statut: 'terminee', libelle: 'Terminée' },
];

const BARRES = [38, 52, 44, 66, 58, 74, 62, 86, 70, 92];

function Kpi({ icone: Icone, label, valeur, note }) {
  return (
    <div className="rounded-[10px] border border-bordure bg-surface p-3">
      <div className="flex items-center gap-2 text-[11px] font-medium text-texte-secondaire">
        <Icone className="size-3.5 text-primaire" aria-hidden />
        {label}
      </div>
      <p className="mt-1.5 text-[18px] font-semibold text-texte chiffres">{valeur}</p>
      <p className="text-[10.5px] text-texte-discret">{note}</p>
    </div>
  );
}

export default function DashboardMockup() {
  return (
    <div className="relative" aria-hidden>
      {/* Fenêtre principale */}
      <div className="overflow-hidden rounded-feuille border border-bordure bg-fond shadow-elevee">
        <div className="flex items-center gap-1.5 border-b border-bordure bg-surface px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-bordure-forte" />
          <span className="size-2.5 rounded-full bg-bordure-forte" />
          <span className="size-2.5 rounded-full bg-bordure-forte" />
          <div className="ml-3 flex h-6 flex-1 items-center gap-2 rounded-md bg-surface-alt px-2 text-[10.5px] text-texte-discret">
            <Search className="size-3" /> Rechercher un fournisseur, une commande…
          </div>
          <Bell className="ml-2 size-3.5 text-texte-secondaire" />
        </div>

        <div className="flex">
          <aside className="hidden w-36 shrink-0 border-r border-bordure bg-surface p-2.5 sm:block">
            {[
              [LayoutDashboard, 'Tableau de bord', true], [Users, 'Fournisseurs'], [Boxes, 'Produits'],
              [ClipboardList, 'Commandes'], [FileText, 'Factures'], [Wallet, 'Paiements'],
            ].map(([I, l, actif]) => (
              <div key={l} className={`mb-0.5 flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${actif ? 'bg-primaire-teinte font-semibold text-primaire' : 'text-texte-secondaire'}`}>
                <I className="size-3.5" /> {l}
              </div>
            ))}
          </aside>

          <div className="min-w-0 flex-1 space-y-3 p-3.5">
            <div className="grid grid-cols-3 gap-2.5">
              <Kpi icone={ClipboardList} label="Commandes en cours" valeur="12" note="dont 3 à valider" />
              <Kpi icone={Truck} label="À réceptionner" valeur="4" note="cette semaine" />
              <Kpi icone={Wallet} label="Montant dû" valeur="2,4 M" note="FCFA · 6 fournisseurs" />
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              <div className="col-span-5 rounded-[10px] sm:col-span-3 border border-bordure bg-surface p-3">
                <p className="text-[11px] font-semibold text-texte">Dernières commandes</p>
                <ul className="mt-2 space-y-1.5">
                  {COMMANDES.map((c) => (
                    <li key={c.num} className="flex items-center gap-2 text-[10.5px]">
                      <span className="shrink-0 whitespace-nowrap font-semibold text-texte">{c.num}</span>
                      <span className="min-w-0 flex-1 truncate text-texte-secondaire">{c.partenaire}</span>
                      <span className="hidden whitespace-nowrap text-texte chiffres 2xl:inline">{c.montant}</span>
                      <Badge ton={tonDe('commande', c.statut)} icone={false} className="shrink-0 !px-1.5 !py-0 !text-[9.5px]">{c.libelle}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden rounded-[10px] sm:col-span-2 sm:block border border-bordure bg-surface p-3">
                <p className="text-[11px] font-semibold text-texte">Volume commandé</p>
                <div className="mt-3 flex h-20 items-end gap-1">
                  {BARRES.map((h, i) => (
                    <span key={i} className={`flex-1 rounded-t-sm ${i === BARRES.length - 1 ? 'bg-secondaire' : 'bg-primaire/75'}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-texte-discret">10 dernières semaines</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cartes flottantes */}
      <div className="absolute -bottom-6 -left-4 hidden w-60 rounded-carte border border-bordure bg-surface p-3 shadow-elevee sm:block">
        <div className="flex items-start gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-avertissement-fond text-avertissement">
            <ClipboardList className="size-4" />
          </span>
          <div>
            <p className="text-[12px] font-semibold text-texte">Proposition reçue</p>
            <p className="text-[11px] text-texte-secondaire">BC-0142 : 1 produit indisponible, quantité ajustée.</p>
          </div>
        </div>
      </div>
      <div className="absolute -right-3 -top-5 hidden rounded-carte border border-bordure bg-surface px-3 py-2.5 shadow-elevee md:block">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-texte">
          <CheckCircle2 className="size-4 text-succes" /> Réception confirmée
        </div>
        <p className="mt-0.5 text-[11px] text-texte-secondaire">Facture associée à la commande</p>
      </div>
    </div>
  );
}
