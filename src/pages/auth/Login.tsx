import styled from 'styled-components';
import { Form, Input, Button, message } from 'antd';
import { theme } from '../../assets/theme/theme';
import { Link } from 'react-router-dom';

export const Login = () => {
  const onFinish = (values: { email: string; password: string }) => {
    console.log('Success:', values);
    message.success('Успешный вход!');
  };

  return (
    <Container>
      <Card>
        <Title>Добро пожаловать</Title>
        <Subtitle>Войдите в свой аккаунт для продолжения</Subtitle>

        <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="on">
          <Form.Item
            label={<Label isRequired>Email</Label>}
            name="email"
            rules={[
              { required: true, message: 'Введите Email' },
              { type: 'email', message: 'Введите корректный Email' },
            ]}
            required={false}
            style={{ marginBottom: '0.58vw' }}
          >
            <StyledInput placeholder="example@company.com" />
          </Form.Item>

          <Form.Item
            label={<Label isRequired>Пароль</Label>}
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
            <StyledPasswordInput type="password" placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit" block>
              Войти
            </StyledButton>
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
  background: ${theme.colors.background};
`;

export const Card = styled.div`
  background: ${theme.colors.card};
  padding: 1.5vw 2.725vw; /* 43px 24px */
  border-radius: 0.825vw;
  box-shadow: 0 0.208vw 1.042vw rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 25vw;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.85vw;
  font-weight: 400;
  margin-bottom: 0.26vw;
  color: ${theme.colors.foreground};
`;

export const Subtitle = styled.p`
  font-size: 1.09vw;
  color: ${theme.colors.mutedForeground};
  margin-bottom: 1.43vw;
`;

export const StyledButton = styled(Button)`
  background: ${theme.colors.primary} !important;
  border-color: ${theme.colors.primary} !important;
  height: 2.7vw;
  font-size: 0.95vw;
  font-weight: 500;
  margin-top: 0.5vw;

  &:hover {
    background: ${theme.colors.hoverButton} !important;
    border-color: ${theme.colors.hoverButton} !important;
  }
`;

export const LinkText = styled(Link)`
  display: block;
  font-size: 0.885vw;
  font-weight: 500;
  color: ${theme.colors.primary};
  cursor: pointer;
  margin: -0.225vw 0 1vw;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const GreyLinkText = styled.a`
  display: block;
  font-size: 0.885vw;
  color: ${theme.colors.secondaryForeground};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledInput = styled(Input)`
  width: 100%;
  height: 2.8vw;
  border-radius: 0.3vw;
  border: 1.52px solid ${theme.colors.border};
  padding: 0 0.65vw;
  font-size: 0.9375vw;
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
export const StyledPasswordInput = styled(StyledInput).attrs({ as: Input.Password })`
  .ant-input-password-icon {
    font-size: 1vw;
  }
`;

export const Label = styled.span<{ isRequired?: boolean }>`
  font-size: 0.95vw;
  color: ${theme.colors.popoverForeground};
  font-weight: 500;
  display: block;
  margin-bottom: -0.5vw;
  ${({ isRequired }) =>
    isRequired &&
    `
      &::after {
        content: '*';
        color: ${theme.colors.foreground};
        margin-left: 0.3vw;
      }
    `}
`;
