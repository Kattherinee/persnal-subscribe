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
    border: 1px solid ${theme.colors.accent};
    box-shadow: 0 0 0.208vw rgba(167, 139, 250, 0.3);
  }

  &:focus,
  &:active {
    border: 1px solid rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 3px 2px rgba(138, 92, 246, 0.332);
    outline: none;
  }
`;
