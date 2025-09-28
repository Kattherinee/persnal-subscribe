import styled from 'styled-components';
import { Form, message } from 'antd';
import { theme } from '../../assets/theme/theme';
import { Link } from 'react-router-dom';
import { CustomLabel } from '../../ui/CustomLabel';
import { CustomInput } from '../../ui/CustomInput';
import { CustomButton } from '../../ui/CustomButton';
import { CustomPasswordInput } from '../../ui/CustomPasswordInput';
import { Card } from './Login';

export const LoginAdmin = () => {
  const onFinish = (values: { email: string; password: string }) => {
    console.log('Success:', values);
    message.success('Успешный вход!');
  };

  return (
    <Card>
      <Title>Добро пожаловать</Title>
      <Subtitle>Войдите в аккаунт админ-панели</Subtitle>

      <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="on">
        <Form.Item
          label={<CustomLabel isRequired>Email</CustomLabel>}
          name="email"
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
    </Card>
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
