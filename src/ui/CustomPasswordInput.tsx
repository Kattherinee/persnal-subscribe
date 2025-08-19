import styled from 'styled-components';
import { Input } from 'antd';
import { CustomInput } from './CustomInput';

export const CustomPasswordInput = styled(CustomInput).attrs({ as: Input.Password })`
  .ant-input-password-icon {
    font-size: 1vw;
  }
`;
