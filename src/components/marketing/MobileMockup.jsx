import { Bell, ChevronRight, Home, ClipboardList, FileText, Wallet } from 'lucide-react';
import { Badge } from '../common/StatusBadge.jsx';
import { tonDe } from '../../theme/statuts.js';

/** Aperçu illustratif de l'application mobile (valeurs fictives). */
const LIGNES = [
  { num: 'BC-0145', nom: 'Restaurant Epsilon', statut: 'en_attente_validation', libelle: 'À valider' },
  { num: 'BC-0144', nom: 'Supérette Zêta', statut: 'validee', libelle: 'Validée' },
  { num: 'BC-0143', nom: 'Hôtel Êta', statut: 'prete', libelle: 'Prête' },
];

export default function MobileMockup({ className = '' }) {
  return (
    <div className={`mx-auto w-[248px] rounded-[38px] border-[7px] border-[#1F2937] bg-[#1F2937] shadow-elevee ${className}`} aria-hidden>
      <div className="overflow-hidden rounded-[31px] bg-fond">
        <div className="flex justify-center bg-primaire pt-2"><span className="h-4 w-20 rounded-full bg-[#1F2937]" /></div>
        <div className="bg-primaire px-4 pb-5 pt-3 text-sur-primaire">
          <div className="flex items-center justify-between text-[11px] opacity-90">
            <span>Bonjour,</span>
            <Bell className="size-3.5" />
          </div>
          <p className="text-[14px] font-semibold">Espace fournisseur</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/12 p-2.5">
              <p className="text-[10px] opacity-80">À traiter</p>
              <p className="text-[17px] font-semibold">5</p>
            </div>
            <div className="rounded-xl bg-white/12 p-2.5">
              <p className="text-[10px] opacity-80">Créances</p>
              <p className="text-[13px] font-semibold leading-6">1,8 M FCFA</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 p-3">
          <p className="px-1 text-[11px] font-semibold text-texte">Commandes reçues</p>
          {LIGNES.map((l) => (
            <div key={l.num} className="flex items-center gap-2 rounded-xl border border-bordure bg-surface p-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-texte">{l.num}</p>
                <p className="truncate text-[10px] text-texte-secondaire">{l.nom}</p>
              </div>
              <Badge ton={tonDe('commande', l.statut)} icone={false} className="!px-1.5 !py-0 !text-[9.5px]">{l.libelle}</Badge>
              <ChevronRight className="size-3.5 text-texte-discret" />
            </div>
          ))}
        </div>
        <div className="flex justify-around border-t border-bordure bg-surface py-2.5 text-texte-discret">
          <Home className="size-4 text-primaire" />
          <ClipboardList className="size-4" />
          <FileText className="size-4" />
          <Wallet className="size-4" />
        </div>
      </div>
    </div>
  );
}
