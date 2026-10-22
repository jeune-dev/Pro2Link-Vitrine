import {
  AlertTriangle, BarChart3, Bell, Boxes, Building2, CheckCheck, ClipboardCheck, ClipboardList, EyeOff,
  FileText, History, Layers, MessageCircle, PackageCheck, Receipt,
  ShieldCheck, ShoppingBag, Smartphone, Store, Truck, UserCog, Users, Utensils, Wallet, Briefcase,
} from 'lucide-react';

/**
 * Contenus éditoriaux du site vitrine (modifiables sans toucher aux composants).
 * Fondés sur le cahier des charges Pro2Link : aucun chiffre, témoignage ni
 * partenaire n'est inventé.
 */

export const NAVIGATION = [
  { label: 'Accueil', to: '/' },
  { label: 'Fonctionnalités', to: '/fonctionnalites' },
  { label: 'Comment ça marche', to: '/comment-ca-marche' },
  { label: 'Entreprises concernées', to: '/#entreprises' },
  { label: 'FAQ', to: '/#faq' },
];

export const PROBLEMES = [
  { icone: MessageCircle, titre: 'Commandes dispersées', texte: 'Entre WhatsApp, appels, e-mails et fichiers Excel, chaque commande suit un chemin différent.' },
  { icone: AlertTriangle, titre: 'Erreurs de saisie', texte: 'Quantités mal recopiées, références oubliées, informations perdues entre deux échanges.' },
  { icone: EyeOff, titre: 'Peu de visibilité', texte: 'Difficile de savoir où en est une commande : validée, en préparation, livrée ?' },
  { icone: Receipt, titre: 'Factures et paiements', texte: 'Le suivi de ce qui est dû et de ce qui a été payé repose sur des relevés manuels.' },
  { icone: History, titre: 'Aucune traçabilité', texte: 'Qui a modifié quoi, et quand ? Les échanges ne laissent pas d’historique fiable.' },
];

export const AVANT_APRES = {
  avant: ['WhatsApp', 'Appels', 'Excel', 'Papier', 'E-mails'],
  apres: ['Fournisseur', 'Produits', 'Bon de commande', 'Validation', 'Livraison', 'Réception', 'Facture', 'Paiement'],
};

export const FONCTIONNALITES = [
  { id: 'partenaires', icone: Users, titre: 'Fournisseurs et clients', texte: 'Retrouvez vos partenaires commerciaux, leur profil, leur historique et leur situation financière.', tags: ['Annuaire', 'Profil', 'Historique'] },
  { id: 'catalogue', icone: Boxes, titre: 'Catalogue des produits', texte: 'Le fournisseur publie ses produits : référence, unité, prix, disponibilité et catégorie.', tags: ['Prix', 'Disponibilité', 'Catégories'] },
  { id: 'bons-commande', icone: ClipboardList, titre: 'Bons de commande', texte: 'Sélectionnez produits et quantités : le bon de commande est généré automatiquement.', tags: ['Sans panier', 'Numérotation', 'Modèle personnalisé'] },
  { id: 'validation', icone: CheckCheck, titre: 'Validation et modification', texte: 'Le fournisseur accepte ou propose une modification ; l’acheteur valide la version finale.', tags: ['Proposition', 'Substitution', 'Version de référence'] },
  { id: 'livraisons', icone: Truck, titre: 'Suivi des livraisons', texte: 'Préparation, livraison, confirmation de réception : chaque étape est visible des deux côtés.', tags: ['En préparation', 'Livrée', 'Réception'] },
  { id: 'facturation', icone: FileText, titre: 'Facturation', texte: 'La facture est associée à la commande réceptionnée et reste consultable à tout moment.', tags: ['Liée à la commande', 'PDF', 'Modèle personnalisé'] },
  { id: 'paiements', icone: Wallet, titre: 'Paiements, dettes et créances', texte: 'Le solde de chaque partenaire est calculé à partir des factures et des paiements enregistrés.', tags: ['Soldes', 'Échéances', 'Historique'] },
  { id: 'notifications', icone: Bell, titre: 'Notifications', texte: 'Nouveau bon de commande, proposition reçue, livraison, facture : vous êtes prévenu.', tags: ['Web', 'Push mobile', 'Temps réel'] },
  { id: 'historique', icone: History, titre: 'Historique des opérations', texte: 'Chaque commande conserve la trace de qui a fait quoi, et à quel moment.', tags: ['Qui', 'Quoi', 'Quand'] },
  { id: 'utilisateurs', icone: UserCog, titre: 'Utilisateurs et permissions', texte: 'Administrateur, responsable achats, comptable, réceptionnaire… chacun selon son rôle.', tags: ['6 rôles', 'Permissions', 'Équipes'] },
];

/**
 * Repères produit affichés sous le hero : FAITS issus du cahier des charges
 * (supports, rôles, statuts), pas des chiffres commerciaux.
 */
export const REPERES = [
  { valeur: '3', libelle: 'supports : Web, Android et iOS' },
  { valeur: '6', libelle: 'rôles internes par entreprise' },
  { valeur: '11', libelle: 'étapes de commande suivies' },
  { valeur: '0', libelle: 'panier : un bon de commande validé à deux' },
];

/** Section sombre « Web et mobile » (cahier des charges § 4 et § 23). */
export const SYNCHRO = [
  { titre: 'Au bureau, la gestion complète', texte: 'Commandes, fournisseurs, clients, produits, factures, paiements, utilisateurs et statistiques sur l’application Web.' },
  { titre: 'Sur le terrain, l’essentiel', texte: 'Recevoir, accepter ou modifier une commande, suivre les statuts et les montants dus depuis un smartphone.' },
  { titre: 'Les mêmes données, partout', texte: 'Une commande reçue sur mobile apparaît aussitôt sur le Web ; une proposition envoyée du Web arrive sur le téléphone du client.' },
];

export const ETAPES = [
  { titre: 'Choisir un fournisseur', texte: 'Recherchez ou ajoutez le fournisseur avec qui vous travaillez.', icone: Building2, acteur: 'Acheteur' },
  { titre: 'Consulter son catalogue', texte: 'Produits, unités, prix et disponibilités à jour.', icone: Boxes, acteur: 'Acheteur' },
  { titre: 'Préparer un bon de commande', texte: 'Sélectionnez produits et quantités : le bon est généré.', icone: ClipboardList, acteur: 'Acheteur' },
  { titre: 'Envoyer et faire valider', texte: 'Le fournisseur accepte ou propose une version modifiée.', icone: ClipboardCheck, acteur: 'Acheteur et fournisseur' },
  { titre: 'Suivre la préparation et la livraison', texte: 'Le fournisseur met à jour le statut de la commande.', icone: Truck, acteur: 'Fournisseur' },
  { titre: 'Confirmer la réception', texte: 'L’acheteur vérifie la livraison et la confirme.', icone: PackageCheck, acteur: 'Acheteur' },
  { titre: 'Recevoir la facture', texte: 'La facture est associée à la commande concernée.', icone: FileText, acteur: 'Fournisseur' },
  { titre: 'Suivre les paiements', texte: 'Les paiements mettent à jour le solde de chaque partenaire.', icone: Wallet, acteur: 'Acheteur et fournisseur' },
];

export const PROFILS = [
  { icone: ShoppingBag, titre: 'Acheteurs professionnels', texte: 'Centralisez vos fournisseurs, vos commandes et ce que vous devez à chacun.' },
  { icone: Truck, titre: 'Fournisseurs et distributeurs', texte: 'Recevez des bons de commande clairs, gérez vos statuts, vos factures et vos créances.' },
  { icone: Store, titre: 'Commerces et grandes surfaces', texte: 'Pilotez vos approvisionnements réguliers auprès de nombreux fournisseurs.' },
  { icone: Utensils, titre: 'Restaurants et hôtels', texte: 'Commandez vos produits sans appels multiples et suivez chaque réception.' },
  { icone: Briefcase, titre: 'Équipes commerciales', texte: 'Suivez vos clients, leurs commandes en cours et leurs paiements depuis le terrain.' },
];

export const AVANTAGES = [
  { icone: Layers, titre: 'Centralisation des opérations', texte: 'Commandes, documents et paiements au même endroit, pour toute l’équipe.' },
  { icone: History, titre: 'Meilleure traçabilité', texte: 'Un historique partagé par l’acheteur et le fournisseur, étape par étape.' },
  { icone: ShieldCheck, titre: 'Réduction des erreurs', texte: 'Des bons de commande générés à partir du catalogue, sans ressaisie.' },
  { icone: BarChart3, titre: 'Suivi des engagements financiers', texte: 'Ce que vous devez et ce que l’on vous doit, à jour à chaque paiement.' },
  { icone: Smartphone, titre: 'Ordinateur et smartphone', texte: 'Les mêmes données sur le Web et sur mobile (Android et iOS), synchronisées.' },
];

export const FAQ = [
  {
    q: 'À qui s’adresse Pro2Link ?',
    r: 'Aux entreprises qui achètent ou vendent entre professionnels : commerces, grandes surfaces, restaurants, hôtels, distributeurs, fournisseurs et équipes commerciales. Une même entreprise peut être acheteuse, fournisseuse, ou les deux.',
  },
  {
    q: 'Comment fonctionne une commande ?',
    r: 'L’acheteur sélectionne un fournisseur, puis les produits et quantités dans son catalogue. Pro2Link génère un bon de commande qu’il envoie au fournisseur. Il n’y a pas de panier : la commande suit un processus de validation entre les deux parties.',
  },
  {
    q: 'Puis-je modifier une commande avant validation ?',
    r: 'Oui. Le fournisseur peut modifier une quantité, signaler un produit indisponible ou proposer un autre produit. L’acheteur reçoit alors une proposition modifiée qu’il peut accepter ou refuser. Une fois acceptée, la commande est validée et devient la référence des deux parties.',
  },
  {
    q: 'Comment suivre mes factures et mes paiements ?',
    r: 'Chaque facture est associée à sa commande. Les paiements enregistrés mettent à jour le solde de chaque fournisseur ou client : vous voyez ce que vous devez, ce qui vous est dû, les factures en attente et l’historique.',
  },
  {
    q: 'Puis-je utiliser Pro2Link sur mon téléphone ?',
    r: 'Oui. Pro2Link est disponible sur le Web et sur mobile (Android et iOS). Les deux utilisent les mêmes données : une commande reçue sur mobile apparaît aussitôt sur l’interface Web.',
  },
  {
    q: 'Comment les données de mon entreprise sont-elles protégées ?',
    r: 'Chaque entreprise n’accède qu’à ses propres données et à celles que ses partenaires lui partagent. Les accès dépendent du rôle de chaque utilisateur, les connexions sont sécurisées et les actions importantes sont historisées.',
  },
];

/**
 * Emplacements des futures références (clients, partenaires). Laisser vide tant
 * qu'aucune référence n'est validée : la section ne s'affiche pas.
 * Format : { nom: 'Entreprise', logo: '/references/xxx.svg', citation?: '…', auteur?: '…' }
 */
export const REFERENCES = [];

