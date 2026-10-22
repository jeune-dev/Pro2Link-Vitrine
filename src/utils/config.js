/** Configuration publique lue dans les variables d'environnement Vite (aucun secret). */
const clean = (v) => (typeof v === 'string' ? v.trim() : '');

export const config = Object.freeze({
  apiBaseUrl: clean(import.meta.env.VITE_API_BASE_URL).replace(/\/$/, '') || '/api/v1',
  appEntrepriseUrl: clean(import.meta.env.VITE_APP_ENTREPRISE_URL),
  // Back-office des administrateurs Pro2Link (application distincte). Vide : lien masqué.
  adminUrl: clean(import.meta.env.VITE_ADMIN_URL).replace(/\/$/, ''),
  siteUrl: clean(import.meta.env.VITE_SITE_URL).replace(/\/$/, ''),
  contactEmail: clean(import.meta.env.VITE_CONTACT_EMAIL),
  contactPhone: clean(import.meta.env.VITE_CONTACT_PHONE),
});
