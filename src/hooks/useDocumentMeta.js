import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { config } from '../utils/config.js';

function poserMeta(selecteur, attribut, cle, contenu) {
  let el = document.head.querySelector(selecteur);
  if (!contenu) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribut, cle);
    document.head.appendChild(el);
  }
  el.setAttribute('content', contenu);
}

/**
 * Titre, description, Open Graph et lien canonique propres à chaque page.
 * `noindex` pour les pages privées (connexion, back-office).
 */
export function useDocumentMeta({ title, description, noindex = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const titre = title ? `${title} · Pro2Link` : 'Pro2Link';
    document.title = titre;
    poserMeta('meta[name="description"]', 'name', 'description', description);
    poserMeta('meta[property="og:title"]', 'property', 'og:title', titre);
    poserMeta('meta[property="og:description"]', 'property', 'og:description', description);
    poserMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : null);

    const url = config.siteUrl ? `${config.siteUrl}${pathname}` : null;
    poserMeta('meta[property="og:url"]', 'property', 'og:url', url);
    let canonique = document.head.querySelector('link[rel="canonical"]');
    if (url && !noindex) {
      if (!canonique) {
        canonique = document.createElement('link');
        canonique.rel = 'canonical';
        document.head.appendChild(canonique);
      }
      canonique.href = url;
    } else {
      canonique?.remove();
    }
  }, [title, description, noindex, pathname]);
}
