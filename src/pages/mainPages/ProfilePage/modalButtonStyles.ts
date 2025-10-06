import { theme } from '../../../assets/theme/theme';

export const modalButtonStyles = {
  okButton: {
    background: theme.colors.brandPrimary,
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    fontWeight: theme.fonts.fontWeightMedium,
    transition: 'all 0.2s ease',
  },
  okButtonHover: {
    background: theme.colors.brandPrimaryHover,
  },
  cancelButton: {
    background: theme.colors.backgroundCard,
    color: theme.colors.textSecondary,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    fontWeight: theme.fonts.fontWeightMedium,
    transition: 'all 0.2s ease',
  },
  cancelButtonHover: {
    borderColor: theme.colors.brandPrimary,
    color: theme.colors.brandPrimary,
  },
  dangerButton: {
    background: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    fontWeight: theme.fonts.fontWeightMedium,
    transition: 'all 0.2s ease',
  },
  dangerButtonHover: {
    background: '#ff7875',
  },
};
