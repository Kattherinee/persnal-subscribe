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
import { registerUser } from '../../api/user';
import { Container } from './Login';
import { useEffect, useState } from 'react';

export const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFinish = async (values: { email: string; password: string; name: string }) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
        fullName: values.name,
      };

      await registerUser(payload);
      navigate('/thank-you');
      message.success('Registration completed successfully!');
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Registration error');
    }
  };

  // Автофокус на первом поле с ошибкой
  const onFinishFailed = (errorInfo: any) => {
    const firstErrorField = errorInfo.errorFields?.[0]?.name?.[0];
    if (firstErrorField) {
      const field = form.getFieldInstance(firstErrorField);
      if (field && typeof field.focus === 'function') {
        field.focus();
      }
    }
  };

  return (
    <Container>
      <Card>
        <Title>Registration</Title>
        <Subtitle>Create a new account to get started</Subtitle>
        <Form
          form={form}
          name="registration"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<CustomLabel isRequired>Name</CustomLabel>}
            name="name"
            required={false}
            rules={[{ required: true, message: 'Please enter name' }]}
            style={{ marginBottom: isMobile ? '2.8vw' : '0.58vw' }}
          >
            <CustomInput placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel isRequired>Email</CustomLabel>}
            name="email"
            required={false}
            style={{ marginBottom: isMobile ? '2.8vw' : '0.58vw' }}
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' },
            ]}
          >
            <CustomInput placeholder="example@company.com" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel isRequired>Password</CustomLabel>}
            name="password"
            style={{ marginBottom: isMobile ? '2.8vw' : '0.58vw' }}
            rules={[
              { required: true, message: 'Please enter password' },
              {
                min: 8,
                message: 'Password must contain at least 8 characters',
              },
              {
                pattern: /[a-zA-Z]/,
                message: 'Password must contain at least one letter',
              },
              {
                pattern: /[0-9]/,
                message: 'Password must contain at least one number',
              },
              {
                pattern: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
                message: 'Password must contain at least one special character',
              },
            ]}
            required={false}
          >
            <CustomPasswordInput type="password" placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel isRequired>Confirm Password</CustomLabel>}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
            required={false}
          >
            <CustomPasswordInput type="password" placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <CustomButton type="primary" htmlType="submit" block $width="100%">
              Register
            </CustomButton>
          </Form.Item>
        </Form>

        <LinkContainer>
          <GreyText>Already have an account? </GreyText>
          <LinkText to="/signin">Sign In</LinkText>
        </LinkContainer>
      </Card>
    </Container>
  );
};

const GreyText = styled.span`
  font-size: 0.78vw;
  color: ${theme.colors.textSecondary};
  @media (max-width: 769px) {
    font-size: 3.18vw;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  @media (max-width: 769px) {
    gap: 1.5vw;
    margin-top: -2vw;
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
    font-size: 3.18vw;
  }
`;
