import styled from 'styled-components';
import { Form, message } from 'antd';
import { theme } from '../../assets/theme/theme';
import { Link, useNavigate } from 'react-router-dom';
import { CustomLabel } from '../../ui/CustomLabel';
import { CustomInput } from '../../ui/CustomInput';
import { CustomButton } from '../../ui/CustomButton';
import { CustomPasswordInput } from '../../ui/CustomPasswordInput';
import { Card } from './Login';
import { loginAdmin } from '../../api/auth';
import type { AxiosError } from 'axios';
import { useAdminStore } from '../../store/adminStore';

export const LoginAdmin = () => {
  const navigate = useNavigate();
  const [messageLogin, contextHolder] = message.useMessage();
  const { setAuthAdmin } = useAdminStore();
  const onFinish = async (values: { login: string; password: string }) => {
    try {
      const payload = {
        login: values.login,
        password: values.password,
      };

      const res = await loginAdmin(payload);

      setAuthAdmin({
        access_token: res.access_token,
        role: res.role,
      });

      navigate('/admin/users');
    } catch (err) {
      const error = err as AxiosError;
      messageLogin.error('Authorization error: incorrect login/password, or account was deleted');
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Title>Welcome</Title>
        <Subtitle>Sign in to admin panel</Subtitle>

        <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="on">
          <Form.Item
            label={<CustomLabel isRequired>Login</CustomLabel>}
            name="login"
            rules={[{ required: true, message: 'Please enter login' }]}
            required={false}
            style={{ marginBottom: '0.58vw' }}
          >
            <CustomInput placeholder="Enter login" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel isRequired>Password</CustomLabel>}
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
            required={false}
          >
            <CustomPasswordInput type="password" placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <CustomButton type="primary" htmlType="submit" $width="100%">
              Sign In
            </CustomButton>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export const Title = styled.h1`
  font-size: 1.65vw;
  font-weight: 400;
  margin-bottom: 0.2vw;
  color: ${theme.colors.textPrimary};
`;

export const Subtitle = styled.p`
  font-size: 0.95vw;
  color: ${theme.colors.textMuted};
  margin-bottom: 1.43vw;
`;

export const LinkText = styled(Link)`
  display: block;
  font-size: 0.78vw;
  font-weight: 500;
  color: ${theme.colors.brandPrimary};
  cursor: pointer;
  margin: -0.225vw 0 1vw;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const GreyLinkText = styled.a`
  display: block;
  font-size: 0.78vw;
  color: ${theme.colors.textSecondary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
