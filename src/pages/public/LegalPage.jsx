import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Notice from '../../components/common/Notice.jsx';

/**
 * Pages légales : STRUCTURE seulement. Le contenu juridique (éditeur, hébergeur,
 * responsable de traitement, durées de conservation…) doit être fourni et
 * validé par Pro2Link — rien n'est inventé ici.
 */
const PAGES = {
  mentions: {
    titre: 'Mentions légales',
    description: 'Mentions légales du site Pro2Link.',
    rubriques: ['Éditeur du site', 'Directeur de la publication', 'Hébergement', 'Propriété intellectuelle', 'Contact'],
  },
  confidentialite: {
    titre: 'Politique de confidentialité',
    description: 'Comment Pro2Link collecte, utilise et protège les données personnelles.',
    rubriques: ['Responsable du traitement', 'Données collectées', 'Finalités et bases légales', 'Durées de conservation', 'Destinataires', 'Sécurité des données', 'Vos droits', 'Cookies'],
  },
  conditions: {
    titre: 'Conditions d’utilisation',
    description: 'Conditions générales d’utilisation de la plateforme Pro2Link.',
    rubriques: ['Objet', 'Accès à la plateforme', 'Comptes et responsabilités', 'Abonnements', 'Obligations des utilisateurs', 'Responsabilité', 'Résiliation', 'Droit applicable'],
  },
};

export default function LegalPage({ page }) {
  const p = PAGES[page];
  useDocumentMeta({ title: p.titre, description: p.description });

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <h1 className="text-[32px] font-semibold tracking-tight text-texte">{p.titre}</h1>
      <Notice ton="avertissement" titre="Contenu à compléter" className="mt-6">
        Le texte de cette page doit être rédigé et validé par Pro2Link (informations juridiques non fournies). Les rubriques ci-dessous indiquent la structure attendue.
      </Notice>
      <div className="mt-10 space-y-8">
        {p.rubriques.map((r, i) => (
          <section key={r} aria-labelledby={`rubrique-${i}`}>
            <h2 id={`rubrique-${i}`} className="text-sous-titre font-semibold text-texte">{i + 1}. {r}</h2>
            <p className="mt-2 text-petit italic text-texte-discret">À compléter.</p>
          </section>
        ))}
      </div>
    </article>
  );
}
