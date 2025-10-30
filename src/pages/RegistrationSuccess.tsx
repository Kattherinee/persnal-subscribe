import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';
import { CustomButton } from '../ui/CustomButton';
import { theme } from '../assets/theme/theme';
import { Container } from './auth/LoginTabs';
import { Card } from './auth/Login';

export const RegistrationSuccess = () => {
  const navigate = useNavigate();

  const handleGoToAdminPanel = () => {
    navigate('/signin');
  };

  return (
    <Container>
      <SuccessCard>
        <IconWrapper>
          <CheckCircleOutlined />
        </IconWrapper>

        <SuccessTitle>Thank you for registering!</SuccessTitle>
        <SuccessSubtitle>Your account has been successfully created.</SuccessSubtitle>
        <SuccessDescription>Press the button below to access your admin panel.</SuccessDescription>

        <CustomButton type="primary" onClick={handleGoToAdminPanel} block $width="100%">
          Go to Admin Panel
        </CustomButton>
      </SuccessCard>
    </Container>
  );
};

const SuccessCard = styled(Card)`
  text-align: center;
  padding: 3vw 2.5vw;

  @media (max-width: 769px) {
    padding: 8vw 6vw;
  }
`;

const IconWrapper = styled.div`
  font-size: 4.5vw;
  color: ${theme.colors.success};
  margin-bottom: 1.5vw;

  @media (max-width: 769px) {
    font-size: 15vw;
    margin-bottom: 5vw;
  }
`;

const SuccessTitle = styled.h1`
  font-size: 1.8vw;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
  margin: 0 0 1vw 0;

  @media (max-width: 769px) {
    font-size: 5.5vw;
    margin: 0 0 3vw 0;
  }
`;

const SuccessSubtitle = styled.p`
  font-size: 1vw;
  color: ${theme.colors.textPrimary};
  margin: 0 0 0.5vw 0;
  font-weight: 500;

  @media (max-width: 769px) {
    font-size: 3.8vw;
    margin: 0 0 2vw 0;
  }
`;

const SuccessDescription = styled.p`
  font-size: 0.85vw;
  color: ${theme.colors.textSecondary};
  margin: 0 0 2vw 0;

  @media (max-width: 769px) {
    font-size: 3.2vw;
    margin: 0 0 6vw 0;
  }
`;
