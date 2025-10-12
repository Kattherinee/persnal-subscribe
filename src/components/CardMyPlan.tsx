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
  accessKey: string;
};

export const CardMyPlan = ({
  title,
  price,
  endDate,
  isActive,
  idPlan,
  accessKey,
}: CardMyPlanProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <Info>
        <Title>{title}</Title>
        <Divider />
        <Price>
          <span>$</span> {price.slice(0, -1)} <PriceText>USD/month</PriceText>
        </Price>
        {endDate && (
          <>
            <Divider />
            <DateText>Valid until: {new Date(endDate).toLocaleDateString()}</DateText>
          </>
        )}
      </Info>

      <Actions>
        <StyledTag $isActive={!isActive}>{!isActive ? 'Active' : 'Unactive'}</StyledTag>
        {!isActive && (
          <>
            <CustomButton onClick={() => setOpen(true)} type="text" $mode="secondary" $height="2vw">
              <KeyOutlined />
              Get API key
            </CustomButton>
            <GenerateKeyModal open={open} onClose={() => setOpen(false)} accessKey={accessKey} />
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
  align-items: center;
  gap: 4vw;
`;

const Title = styled.h3`
  font-size: 1.1vw;
  margin: 0 0 0.1vw 0;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textMedium};
`;

const Divider = styled.div`
  width: 1.5px;
  height: 1.2vw;
  background-color: ${theme.colors.border};
  font-weight: 400;
  &:nth-child(2) {
    width: 1px;
  }
`;

const Price = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textMedium};

  line-height: 180%;
  span {
    margin-right: 0.1rem;
    color: ${theme.colors.textSecondary};
    font-size: 0.9rem;
    line-height: 1.5rem;
    margin-bottom: auto;
  }
`;
const PriceText = styled.div`
  margin-left: 0.3rem;
  font-size: 0.8rem;
  line-height: 2rem;
  margin-top: auto;
  font-weight: 600;
`;
const DateText = styled.span`
  font-size: 0.85vw;
  line-height: 2.1rem;
  margin-top: auto;
  color: ${theme.colors.textSecondary};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
`;

export const StyledTag = styled.div<{ $isActive: boolean; $width?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.backgroundCard : theme.colors.sideBarActivebg};
  color: ${({ $isActive }) => ($isActive ? theme.colors.brandPrimary : theme.colors.textMuted)};
  font-size: 0.75vw;

  padding: 0.05vw 0.6vw;
  border-radius: 0.5vw;
  border: ${({ $isActive }) =>
    $isActive
      ? `1px solid ${theme.colors.brandPrimary}`
      : `1px solid ${theme.colors.sideBarActivebg}`};
  margin-right: 0.3vw;
  width: ${({ $width }) => ($width ? $width : 'fit-content')};
  text-align: center;
`;
