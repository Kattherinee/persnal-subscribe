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

export const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

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

      message.success('Успешный вход!');
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Ошибка авторизации');
    }
  };
  return (
    <Container>
      <Card>
        <Title>Добро пожаловать</Title>
        <Subtitle>Войдите в свой аккаунт для продолжения</Subtitle>

        <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="on">
          <Form.Item
            label={<CustomLabel isRequired>Email</CustomLabel>}
            name="login"
            rules={[
              { required: true, message: 'Введите Email' },
              { type: 'email', message: 'Введите корректный Email' },
            ]}
            required={false}
            style={{ marginBottom: '0.58vw' }}
          >
            <CustomInput placeholder="example@company.com" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel isRequired>Пароль</CustomLabel>}
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              {
                min: 8,
                message: 'Пароль должен содержать минимум 8 символов',
              },
              {
                pattern: /[0-9]/,
                message: 'Пароль должен содержать хотя бы одну цифру',
              },
            ]}
            required={false}
          >
            <CustomPasswordInput type="password" placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item>
            <CustomButton type="primary" htmlType="submit" $width="100%">
              Войти
            </CustomButton>
          </Form.Item>
        </Form>

        <LinkText to="/signup">Создать новый аккаунт</LinkText>
        <GreyLinkText>Забыли пароль?</GreyLinkText>
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
  padding: 1.5vw 2.725vw; /* 43px 24px */
  border-radius: 0.825vw;
  box-shadow: 0 0.208vw 1.042vw rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 20vw;
  text-align: center;
`;

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
