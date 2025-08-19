import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { theme } from '../assets/theme/theme';

interface CustomButtonProps {
  $width?: string;
  $mode?: 'primary' | 'secondary';
}

export const CustomButton = styled(Button)<CustomButtonProps>`
  font-size: 0.82vw;
  font-weight: 500;
  margin-top: 0.5vw;
  width: ${({ $width }) => ($width ? $width : 'auto')};

  ${({ $mode }) =>
    $mode === 'secondary'
      ? css`
          border: 1px solid ${theme.colors.border} !important;
          color: ${theme.colors.gray} !important;
          height: 1.9vw;

          &:hover {
            background: ${theme.colors.card} !important;
            border-color: ${theme.colors.primary} !important;
            color: ${theme.colors.primary} !important;
          }
        `
      : css`
          background: ${theme.colors.primary} !important;
          border-color: ${theme.colors.primary} !important;
          color: ${theme.colors.gray} !important;
          height: 2.2vw;

          &:hover {
            background: ${theme.colors.hoverButton} !important;
            border-color: ${theme.colors.hoverButton} !important;
          }
        `}
`;
