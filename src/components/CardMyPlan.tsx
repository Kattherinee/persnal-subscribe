import styled from 'styled-components';
import { theme } from '../assets/theme/theme';
import { CustomButton } from '../ui/CustomButton';
import { Link } from 'react-router-dom';
import { KeyOutlined } from '@ant-design/icons';
import { GenerateKeyModal } from './GenerateKeyModal ';
import { useState } from 'react';

type CardMyPlanProps = {
  title: string;
  price: string;
  endDate?: string;
  isActive: boolean;
  idPlan: string;
};

export const CardMyPlan = ({ title, price, endDate, isActive, idPlan }: CardMyPlanProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <Info>
        <Title>{title}</Title>
        <Price>{price}</Price>
        {endDate && <DateText>Действует до: {endDate}</DateText>}
      </Info>

      <Actions>
        <StyledTag $isActive={isActive}>Активен</StyledTag>
        {isActive && (
          <>
            <CustomButton onClick={() => setOpen(true)} type="text" $mode="secondary" $height="2vw">
              <KeyOutlined />
              Получить ключ
            </CustomButton>
            <GenerateKeyModal open={open} onClose={() => setOpen(false)} />
          </>
        )}
        <Link to={`/my-tariffs/${idPlan}`}>
          <CustomButton
            type={isActive ? 'primary' : 'text'}
            $mode={isActive ? 'primary' : 'secondary'}
            $height="2vw"
          >
            Подробнее
          </CustomButton>
        </Link>
      </Actions>
    </Card>
  );
};

const Card = styled.div`
  background: ${theme.colors.backgroundCard};
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 0 4px 3px rgba(60, 60, 60, 0.046);
  border-radius: 0.6rem;
  padding: 1.5vw 1.8vw;
  margin-bottom: 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3vw;
`;

const Title = styled.h3`
  font-size: 1vw;
  margin: 0 0 0.3vw 0;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textPrimary};
`;

const Price = styled.p`
  font-size: 0.92vw;
  margin: 0;
  color: ${theme.colors.textMedium};
`;

const DateText = styled.span`
  font-size: 0.85vw;
  color: ${theme.colors.textSecondary};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
`;

export const StyledTag = styled.div<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.backgroundCard : theme.colors.sideBarActivebg};
  color: ${({ $isActive }) => ($isActive ? theme.colors.brandPrimary : theme.colors.textMuted)};
  font-size: 0.75vw;
  height: 1vw;
  padding: 0.2vw 0.6vw;
  border-radius: 0.5vw;
  border: ${({ $isActive }) =>
    $isActive
      ? `1px solid ${theme.colors.brandPrimary}`
      : `1px solid ${theme.colors.sideBarActivebg}`};
  margin-right: 0.3vw;
`;
