/**
 * Contenus détaillés des pages « Fonctionnalités » et « Comment ça marche »,
 * repris du cahier des charges Pro2Link (§ 6 à 21).
 */

export const DETAILS_FONCTIONNALITES = {
  partenaires: {
    points: ['Recherche et ajout de fournisseurs', 'Profil, catalogue et historique de chaque partenaire', 'Montants dus et paiements effectués par partenaire'],
    exemple: 'Un restaurant retrouve en un coup d’œil ses fournisseurs habituels et ce qu’il doit à chacun.',
  },
  catalogue: {
    points: ['Nom, référence, description, photo, unité, prix, catégorie', 'Disponibilité : disponible, stock limité, sur commande, rupture', 'Modification du prix ou désactivation d’un produit'],
    exemple: 'Un grossiste met à jour la disponibilité d’un produit : ses clients le voient avant de commander.',
  },
  'bons-commande': {
    points: ['Sélection des produits et des quantités dans le catalogue', 'Numéro, acheteur, fournisseur, prix et montant total générés', 'Modèle de bon de commande personnalisable par l’entreprise'],
    exemple: 'Une supérette prépare sa commande hebdomadaire sans ressaisir la moindre référence.',
  },
  validation: {
    points: ['Acceptation de la commande telle quelle', 'Proposition modifiée : quantité, produit indisponible, substitution', 'Acceptation, refus ou nouvelle demande de modification par l’acheteur'],
    exemple: 'Le fournisseur signale une rupture et propose un produit équivalent ; l’acheteur accepte depuis son téléphone.',
  },
  livraisons: {
    points: ['Statuts : en préparation, prête, livrée', 'Confirmation de réception par l’acheteur', 'Historique complet de chaque étape'],
    exemple: 'Le réceptionnaire d’un hôtel confirme la livraison dès l’arrivée de la marchandise.',
  },
  facturation: {
    points: ['Facture associée à la commande réceptionnée', 'Consultation et téléchargement par l’acheteur', 'Modèle de facture standard ou personnalisé'],
    exemple: 'Le comptable retrouve la facture d’une commande précise sans fouiller ses e-mails.',
  },
  paiements: {
    points: ['Factures en attente et factures payées', 'Paiements enregistrés et historique', 'Solde par fournisseur ou par client, calculé automatiquement'],
    exemple: 'Un distributeur voit immédiatement quels clients lui doivent de l’argent.',
  },
  notifications: {
    points: ['Nouveau bon de commande, proposition reçue ou acceptée', 'Commande prête, livrée, réception confirmée', 'Nouvelle facture, paiement enregistré, échéance'],
    exemple: 'L’acheteur est prévenu sur mobile dès qu’une proposition modifiée l’attend.',
  },
  historique: {
    points: ['Création, envoi, modifications et validation', 'Changements de statut, livraison et réception', 'Facturation et paiements : qui a fait quoi, et quand'],
    exemple: 'En cas de désaccord sur une quantité, les deux parties consultent la même trace.',
  },
  utilisateurs: {
    points: ['Plusieurs utilisateurs par entreprise', 'Rôles : administrateur, responsable achats, responsable commandes, comptable, réceptionnaire, commercial', 'Permissions selon le rôle'],
    exemple: 'Le réceptionnaire confirme les livraisons sans avoir accès aux paiements.',
  },
};

export const PARCOURS_ACHETEUR = [
  { titre: 'Sélectionner un fournisseur', texte: 'Recherchez ou ajoutez un fournisseur, consultez son profil et son catalogue.' },
  { titre: 'Choisir produits et quantités', texte: 'Pas de panier : vous composez directement votre sélection depuis le catalogue.' },
  { titre: 'Bon de commande généré', texte: 'Pro2Link crée le bon de commande (numéro, produits, prix, total) que vous envoyez au fournisseur.' },
  { titre: 'Recevoir une éventuelle proposition', texte: 'Si le fournisseur modifie la commande, vous êtes notifié et pouvez accepter, refuser ou redemander une modification.' },
  { titre: 'Commande validée', texte: 'En acceptant, la commande est validée : les deux parties disposent de la même version de référence.' },
  { titre: 'Suivre et réceptionner', texte: 'Vous suivez la préparation puis confirmez la réception à la livraison.' },
  { titre: 'Recevoir la facture', texte: 'La facture associée à la commande est consultable et téléchargeable.' },
  { titre: 'Suivre ce que vous devez', texte: 'Vos paiements mettent à jour le solde dû à chaque fournisseur.' },
];

export const PARCOURS_FOURNISSEUR = [
  { titre: 'Présenter son catalogue', texte: 'Produits, prix, unités et disponibilités, tenus à jour.' },
  { titre: 'Recevoir le bon de commande', texte: 'Vous êtes notifié de chaque nouveau bon de commande.' },
  { titre: 'Vérifier et décider', texte: 'Acceptez tel quel, ou modifiez : quantité, produit indisponible, produit de substitution.' },
  { titre: 'Envoyer une proposition', texte: 'En cas de modification, la proposition est transmise au client pour acceptation.' },
  { titre: 'Préparer et livrer', texte: 'Vous mettez à jour le statut : en préparation, prête, livrée.' },
  { titre: 'Facturer', texte: 'Après la confirmation de réception, vous générez et transmettez la facture.' },
  { titre: 'Enregistrer les paiements', texte: 'Chaque paiement reçu met à jour la créance du client.' },
  { titre: 'Suivre ses créances', texte: 'Vous voyez quels clients vous doivent de l’argent et combien.' },
];

/** Statuts principaux d'un bon de commande (cahier des charges § 12). */
export const STATUTS_COMMANDE = [
  'Brouillon', 'Bon de commande envoyé', 'En attente de validation', 'Proposition modifiée', 'Commande validée',
  'En préparation', 'Prête', 'Livrée', 'Réception confirmée', 'Facturée', 'Terminée',
];
