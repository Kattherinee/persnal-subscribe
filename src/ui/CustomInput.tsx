import styled from 'styled-components';
import { Input } from 'antd';
import { theme } from '../assets/theme/theme';

export const CustomInput = styled(Input)`
  width: 100%;
  height: 2.2vw;
  border-radius: 0.3vw;
  border: 1.52px solid ${theme.colors.border};
  padding: 0 0.65vw;
  font-size: 0.84vw;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    border: 1px solid ${theme.colors.brandAccentHover};
    box-shadow: 0 0 0.208vw rgba(172, 148, 241, 0.3);
  }

  &.ant-input-outlined:focus {
    border-color: ${theme.colors.brandPrimaryHover} !important;
    box-shadow: 0 0 2px 1px rgba(166, 129, 252, 0.201);
    outline: none;
  }

  &:disabled {
    border: none;
    &:hover {
      border: none;
      box-shadow: none;
    }
  }
`;
