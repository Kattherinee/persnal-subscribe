import styled from 'styled-components';
import { theme } from '../assets/theme/theme';
import { CustomButton } from '../ui/CustomButton';
import { CheckCircleOutlined } from '@ant-design/icons';

interface IProps {
  title: string;
  price: number;
  features: string[];
  onSelect?: () => void;
}

export const CardPlan: React.FC<IProps> = ({ title, price, features, onSelect }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Price>
        <span>$</span> {price} <PriceText>USD/month</PriceText>
      </Price>
      <CustomButton onClick={onSelect} type="primary" $mode="primary">
        Choose plan
      </CustomButton>
      <Features $count={features.length}>
        {features.map((feature, i) => (
          <Feature key={i}>
            <CheckCircleOutlined style={{ color: theme.colors.brandPrimary }} />
            <span>{feature}</span>
          </Feature>
        ))}
      </Features>
    </Card>
  );
};

const Card = styled.div`
  background: ${theme.colors.backgroundCard};
  border: 1px solid ${theme.colors.brandPrimaryTransparent};
  border-radius: 0.6rem;
  padding: 1.5rem;
  padding-bottom: 2rem;
  width: 100%;
  max-width: 27vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px 2px rgba(24, 24, 24, 0.046);
  transition: transform 0.2s ease;

  button {
    border-radius: 20px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  @media (max-width: 769px) {
    max-width: unset;
  }
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: ${theme.fonts.fontWeightSemibold};
  color: ${theme.colors.textPrimary};
  margin-block: 0;
  margin-bottom: 0.23vw;
  @media (max-width: 769px) {
    margin-bottom: 1.03vw;
    font-size: 1.5rem;
  }
`;

export const Price = styled.div`
  display: flex;
  font-size: 1.9rem;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textMedium};
  margin: 0.4vw 0 0.7vw;
  line-height: 180%;
  span {
    margin-right: 0.1rem;
    color: ${theme.colors.textSecondary};
    font-size: 1.3rem;
    line-height: 2rem;
    margin-bottom: auto;
  }
  @media (max-width: 769px) {
    font-size: 2.3rem;
    margin: 1.1vw 0 2.73vw;
    span {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`;
export const PriceText = styled.div`
  margin-left: 0.3rem;
  font-size: 0.9rem;
  line-height: 2.5rem;
  margin-top: auto;
  font-weight: 600;
`;

const Features = styled.div<{ $count: number }>`
  display: grid;
  gap: 0.5vw;
  margin-top: 1.2rem;
  @media (max-width: 769px) {
    gap: 2.65vw;
  }
  /* 
  grid-template-columns: ${({ $count }) => ($count > 2 ? 'repeat(2, 1fr)' : '1fr')};

  grid-auto-rows: ${({ $count }) => ($count > 4 ? 'minmax(1.5rem, auto)' : 'auto')}; */
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  font-size: 1vw;
  color: ${theme.colors.textMedium};
  font-weight: 500;
  @media (max-width: 769px) {
    gap: 1.6vw;
    font-size: 3.7vw;
  }
`;
