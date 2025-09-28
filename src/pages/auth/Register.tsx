/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { Form, message } from 'antd';
import { theme } from '../../assets/theme/theme';
import { Card, Subtitle, Title } from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { CustomLabel } from '../../ui/CustomLabel';
import { CustomInput } from '../../ui/CustomInput';
import { CustomPasswordInput } from '../../ui/CustomPasswordInput';
import { CustomButton } from '../../ui/CustomButton';
import { registerUser } from '../../api/auth';
import { Container } from './LoginTabs';

export const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values: { email: string; password: string; name: string }) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
        fullName: values.name,
      };

      await registerUser(payload);
      navigate('/signin');
      message.success('Регистрация успешно завершена!');
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Регистрация</Title>
        <Subtitle>Создайте новый аккаунт для начала</Subtitle>
        <Form name="registration" layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label={<CustomLabel isRequired>Имя</CustomLabel>}
            name="name"
            required={false}
            rules={[{ required: true, message: 'Введите имя' }]}
            style={{ marginBottom: '0.58vw' }}
          >
            <CustomInput placeholder="Введите ваше имя" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel isRequired>Email</CustomLabel>}
            name="email"
            required={false}
            style={{ marginBottom: '0.58vw' }}
            rules={[
              { required: true, message: 'Введите Email' },
              { type: 'email', message: 'Введите корректный Email' },
            ]}
          >
            <CustomInput placeholder="example@company.com" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel isRequired>Пароль</CustomLabel>}
            name="password"
            style={{ marginBottom: '0.58vw' }}
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
          <Form.Item
            label={<CustomLabel isRequired>Подтверждение пароля</CustomLabel>}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Подтвердите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
            required={false}
          >
            <CustomPasswordInput type="password" placeholder="Подтвердите пароль" />
          </Form.Item>

          <Form.Item>
            <CustomButton type="primary" htmlType="submit" block $width="100%">
              Зарегистрироваться
            </CustomButton>
          </Form.Item>
        </Form>
        <LinkContainer>
          <GreyText>Уже есть аккаунт? </GreyText>
          <LinkText to="/signin">Войти</LinkText>
        </LinkContainer>
      </Card>
    </Container>
  );
};
const GreyText = styled.span`
  font-size: 0.78vw;
  color: ${theme.colors.textSecondary};
`;
const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
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
  }
`;
