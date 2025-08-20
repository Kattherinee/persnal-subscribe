import styled from 'styled-components';
import { theme } from '../assets/theme/theme';

export const CustomLabel = styled.span<{ isRequired?: boolean }>`
  font-size: 0.8vw;
  color: ${theme.colors.textSecondary};
  font-weight: 500;
  display: block;
  margin-bottom: -0.5vw;

  ${({ isRequired }) =>
    isRequired &&
    `
      &::after {
        content: '*';
        color: ${theme.colors.textPrimary};
        margin-left: 0.3vw;
      }
    `}
`;
