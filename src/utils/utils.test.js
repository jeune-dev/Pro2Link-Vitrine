import { describe, expect, it } from 'vitest';
import { formatMontant, formatMois, initiales, nomComplet } from './format.js';
import { tonDe } from '../theme/statuts.js';
import { etapeRequise, normaliserUtilisateur } from '../contexts/AuthContext.jsx';

describe('format', () => {
  it('affiche les montants en FCFA sans décimale', () => {
    expect(formatMontant(4250000).replace(/\s/g, ' ')).toBe('4 250 000 FCFA');
    expect(formatMontant(null)).toBe('—');
  });
  it('formate un mois et un nom', () => {
    expect(formatMois('2026-10')).toMatch(/oct/);
    expect(nomComplet({ first_name: 'Awa', last_name: 'Diop' })).toBe('Awa Diop');
    expect(initiales('Hôtel Teranga')).toBe('HT');
  });
});

describe('statuts (charte § 5)', () => {
  it('donne le ton d’un statut et neutre pour un code inconnu', () => {
    expect(tonDe('entreprise', 'suspendu')).toBe('danger');
    expect(tonDe('abonnement', 'essai')).toBe('info');
    expect(tonDe('abonnement', 'nouveau_code')).toBe('neutre');
  });
});

describe('session', () => {
  it('exige le changement du mot de passe provisoire avant la MFA', () => {
    const u = normaliserUtilisateur({ role: 'super_admin', must_change_password: true, mfa_active: false });
    expect(etapeRequise(u)).toBe('mot_de_passe');
  });
  it('identifie l’étape restante d’un super admin (orienté vers le back-office)', () => {
    expect(etapeRequise(normaliserUtilisateur({ role_code: 'super_admin', totp_enabled_at: null }))).toBe('configuration_mfa');
    expect(etapeRequise(normaliserUtilisateur({ role_code: 'super_admin', totp_enabled_at: '2026-10-01T00:00:00Z' }))).toBeNull();
  });
  it('n’impose pas la MFA à un compte entreprise', () => {
    expect(etapeRequise(normaliserUtilisateur({ role: 'utilisateur', mfa_active: false }))).toBeNull();
  });
});
