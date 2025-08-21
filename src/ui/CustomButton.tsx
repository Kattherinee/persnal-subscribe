import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { theme } from '../assets/theme/theme';

interface CustomButtonProps {
  $width?: string;
  $height?: string;
  $mode?: 'primary' | 'secondary';
}

export const CustomButton = styled(Button)<CustomButtonProps>`
  font-size: 0.82vw;
  font-weight: 500;
  margin-top: 0.5vw;
  width: ${({ $width }) => ($width ? $width : 'auto')};
  height: ${({ $height }) => ($height ? $height : '2.2vw')};

  ${({ $mode }) =>
    $mode === 'secondary'
      ? css`
          border: 1px solid ${theme.colors.border} !important;
          color: ${theme.colors.textSecondary} !important;

          &:hover {
            background: ${theme.colors.backgroundCard} !important;
            border-color: ${theme.colors.brandPrimaryHover} !important;
            color: ${theme.colors.brandPrimaryHover} !important;
          }
        `
      : css`
          background: ${theme.colors.brandPrimary} !important;
          border-color: ${theme.colors.brandPrimary} !important;
          color: ${theme.colors.textInverse} !important;

          &:hover {
            background: ${theme.colors.brandPrimaryHover} !important;
            border-color: ${theme.colors.brandPrimaryHover} !important;
          }
        `}
`;
