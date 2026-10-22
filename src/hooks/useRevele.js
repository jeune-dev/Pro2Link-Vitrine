import { useEffect } from 'react';

/**
 * Révélation au défilement : chaque élément [data-revele] reçoit « est-visible »
 * à sa première apparition à l'écran (une seule fois).
 *
 * - Sans la classe html.anim (pas d'IntersectionObserver, ou mouvement réduit),
 *   le CSS ne masque rien : ce hook est alors sans effet.
 * - Les pages chargées à la demande ajoutent leurs éléments après coup : un
 *   MutationObserver les confie à l'IntersectionObserver dès leur insertion.
 * - À l'impression, tout est révélé.
 */
export function useRevele() {
  useEffect(() => {
    const racine = document.documentElement;
    if (!racine.classList.contains('anim')) return undefined;

    const io = new IntersectionObserver((entrees) => {
      for (const e of entrees) {
        if (e.isIntersecting) {
          e.target.classList.add('est-visible');
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });

    const observer = (noeud) => {
      if (!(noeud instanceof Element)) return;
      if (noeud.matches('[data-revele]:not(.est-visible)')) io.observe(noeud);
      noeud.querySelectorAll('[data-revele]:not(.est-visible)').forEach((el) => io.observe(el));
    };

    observer(document.body);
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach(observer));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const toutReveler = () => document.querySelectorAll('[data-revele]').forEach((el) => el.classList.add('est-visible'));
    window.addEventListener('beforeprint', toutReveler);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('beforeprint', toutReveler);
    };
  }, []);
}
