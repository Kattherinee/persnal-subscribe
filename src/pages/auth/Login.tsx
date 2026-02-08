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
import { useEffect, useState } from 'react';

export const Login = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [messageLogin, contextHolder] = message.useMessage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <Container>
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
            style={{ marginBottom: isMobile ? '2.8vw' : '0.58vw' }}
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

          <Form.Item style={{ marginBottom: isMobile ? '1.98vw' : '0.78vw' }}>
            <CustomButton type="primary" htmlType="submit" $width="100%">
              Sign In
            </CustomButton>
          </Form.Item>
        </Form>

        <LinkText to="/signup">Create new account</LinkText>
      </Card>
    </Container>
  );
};

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.backgroundPage};
`;

export const Card = styled.div`
  background: ${theme.colors.backgroundCard};
  padding: 1.9vw 2.725vw 1.5vw;
  border-radius: 0.825vw;
  box-shadow: 0 0.208vw 1.042vw rgba(0, 0, 0, 0.05);

  width: 24vw;
  text-align: center;
  @media (max-width: 769px) {
    width: 80vw;
    padding: 5vw 5.725vw 2.8vw;
    border-radius: 1.825vw;
  }
`;

export const Title = styled.h1`
  font-size: 1.65vw;
  font-weight: 400;
  margin-bottom: 0.5vw;
  color: ${theme.colors.textPrimary};
  @media (max-width: 769px) {
    font-size: 5.1vw;
    margin-bottom: 1.5vw;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.95vw;
  color: ${theme.colors.textMuted};
  margin-bottom: 1.43vw;
  @media (max-width: 769px) {
    margin-bottom: 2.9vw;
    font-size: 3.95vw;
  }
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
  @media (max-width: 769px) {
    font-size: 3.28vw;
    margin-bottom: 2vw;
  }
`;
