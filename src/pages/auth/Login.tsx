import styled from 'styled-components';
import { Form, message } from 'antd';
import { theme } from '../../assets/theme/theme';
import { Link, useNavigate } from 'react-router-dom';
import { CustomLabel } from '../../ui/CustomLabel';
import { CustomInput } from '../../ui/CustomInput';
import { CustomButton } from '../../ui/CustomButton';
import { CustomPasswordInput } from '../../ui/CustomPasswordInput';
import { loginUser } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import type { AxiosError } from 'axios';

export const Login = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [messageLogin, contextHolder] = message.useMessage();

  const onFinish = async (values: { login: string; password: string }) => {
    try {
      const payload = {
        login: values.login,
        password: values.password,
      };

      const res = await loginUser(payload);

      setAuth(
        {
          email: res.email,
          fullname: res.fullname,
        },
        res.access_token,
      );

      messageLogin.success('Login successful!');
      navigate('/');
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
        <Subtitle>Sign in to your account to continue</Subtitle>

        <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="on">
          <Form.Item
            label={<CustomLabel isRequired>Login</CustomLabel>}
            name="login"
            rules={[{ required: true, message: 'Please enter login' }]}
            required={false}
            style={{ marginBottom: '0.58vw' }}
          >
            <CustomInput placeholder="example@company.com" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel isRequired>Password</CustomLabel>}
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
            required={false}
          >
            <CustomPasswordInput type="password" placeholder="Enter password" />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0.78vw' }}>
            <CustomButton type="primary" htmlType="submit" $width="100%">
              Sign In
            </CustomButton>
          </Form.Item>
        </Form>

        <LinkText to="/signup">Create new account</LinkText>
      </Card>
    </>
  );
};

export const Card = styled.div`
  background: ${theme.colors.backgroundCard};
  padding: 1.9vw 2.725vw 1.5vw;
  border-radius: 0.825vw;
  box-shadow: 0 0.208vw 1.042vw rgba(0, 0, 0, 0.05);

  width: 24vw;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.65vw;
  font-weight: 400;
  margin-bottom: 0.5vw;
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

  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${theme.colors.brandPrimaryHover};
  }
`;
