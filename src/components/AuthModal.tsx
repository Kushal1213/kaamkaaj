import { ArrowRight, Briefcase, UserCircle, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { useLanguage } from '../i18n';
import type { LocalUser } from '../types';

type Props = {
  onClose: () => void;
  onSignIn: (user: LocalUser) => void;
};

export function AuthModal({ onClose, onSignIn }: Props) {
  const { t } = useLanguage();
  const [role, setRole] = useState<LocalUser['role']>('candidate');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSignIn({
      name: String(data.get('name') ?? '').trim(),
      identifier: String(data.get('identifier') ?? '').trim(),
      role,
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="detail-close" onClick={onClose} aria-label={t('Close')}><X size={20} /></button>
        <span className="section-kicker">{t('Your KaamKaaj account')}</span>
        <h2 id="auth-title">{t('Sign in')}</h2>
        <p>{t('Continue as a candidate or employer. Your session stays on this device.')}</p>
        <div className="role-switch" role="group" aria-label={t('Sign in')}>
          <button className={role === 'candidate' ? 'active' : ''} onClick={() => setRole('candidate')}><UserCircle size={20} /> {t('Candidate')}</button>
          <button className={role === 'employer' ? 'active' : ''} onClick={() => setRole('employer')}><Briefcase size={20} /> {t('Employer')}</button>
        </div>
        <form onSubmit={submit}>
          <label>{t('Full name')}<input name="name" required autoFocus minLength={2} placeholder={t('Your name')} /></label>
          <label>{t('Email or mobile')}<input name="identifier" required inputMode="email" placeholder={t('you@example.com or 10-digit number')} /></label>
          <button className="button primary" type="submit">{t('Continue')} <ArrowRight size={18} /></button>
          <small>{t('No password is needed for this device-based account.')}</small>
        </form>
      </div>
    </div>
  );
}
