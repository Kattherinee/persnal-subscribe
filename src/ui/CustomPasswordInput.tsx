import styled from 'styled-components';
import { Input } from 'antd';
import { CustomInput } from './CustomInput';
import { theme } from '../assets/theme/theme';

export const CustomPasswordInput = styled(CustomInput).attrs({ as: Input.Password })`
  .ant-input-password-icon {
    font-size: 1vw;
  }
  &.ant-input-outlined:focus-within {
    border-color: ${theme.colors.brandPrimaryHover} !important;
    box-shadow: 0 0 2px 1px rgba(138, 92, 246, 0.201);
    outline: none;
  }
`;
