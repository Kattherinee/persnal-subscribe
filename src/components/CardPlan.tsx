import styled from 'styled-components';
import { theme } from '../assets/theme/theme';
import { CustomButton } from '../ui/CustomButton';

interface PlanCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  onSelect?: () => void;
}

export const CardPlan: React.FC<PlanCardProps> = ({
  title,
  subtitle,
  price,
  features,
  onSelect,
}) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Price>{price}</Price>

      <Features>
        {features.map((feature, i) => (
          <Feature key={i}>
            <Dot />
            <span>{feature}</span>
          </Feature>
        ))}
      </Features>

      <CustomButton onClick={onSelect} type="primary" $mode="primary">
        Выбрать план
      </CustomButton>
    </Card>
  );
};

const Card = styled.div`
  background: ${theme.colors.backgroundCard};
  border: 1px solid ${theme.colors.border};
  border-radius: 0.6rem;

  padding: 1.5rem;
  width: 100%;
  max-width: 40vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px 2px rgba(24, 24, 24, 0.046);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: ${theme.fonts.fontWeightSemibold};
  color: ${theme.colors.textPrimary};
  margin-block: 0;
  margin-bottom: 0.43vw;
`;

const Subtitle = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.textMuted};
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textMedium};
  margin: 0.9vw 0 1.2vw;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  margin-bottom: 1rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  font-size: 0.8vw;
  color: ${theme.colors.textMedium};
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.colors.brandPrimary};
`;
