import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { theme } from '../assets/theme/theme';
import { Spin } from 'antd';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { StyledTag } from '../components/CardMyPlan';
import { usePlanStore } from '../store/planStore';
import { getTariffDetail } from '../api/tariffs';
import { Price, PriceText } from '../components/CardPlan';

export const PlanDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const plan = usePlanStore((state) => state.plan);
  const setPlan = usePlanStore((state) => state.setPlan);

  useEffect(() => {
    async function fetchPlan() {
      setLoading(true);
      try {
        if (!id) return;
        const res = await getTariffDetail(id);
        setPlan(res);
      } catch (e) {
        console.error('Error loading tariff:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
  }, [id, setPlan]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading)
    return (
      <Loader>
        <Spin />
      </Loader>
    );
  if (!plan) return <div>Tariff not found</div>;

  return (
    <Page>
      <Back onClick={() => window.history.back()}>
        <ArrowLeftOutlined />
        <span>Back</span>
      </Back>
      <Content>
        <LeftColumn>
          <Card>
            <PlanInfo>
              <TitleContainer>
                <Title>
                  <CreditCardOutlined style={{ marginRight: '0.6vw' }} />
                  {plan.title}
                </Title>
                <StyledTag $isActive={plan.isActive}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </StyledTag>
              </TitleContainer>
              <Price>
                <span>$</span> {plan.price} <PriceText>USD/month</PriceText>
              </Price>
            </PlanInfo>

            <DateBlock>
              <DateItem>
                <Label>
                  <CalendarOutlined style={{ marginRight: '0.4vw' }} />
                  Creation Date
                </Label>
                <Value>{formatDate(plan.startDate)}</Value>
              </DateItem>
              <DateItem>
                <Label>
                  <CalendarOutlined style={{ marginRight: '0.4vw' }} />
                  Valid Until
                </Label>
                <Value>{formatDate(plan.endDate)}</Value>
              </DateItem>
            </DateBlock>

            <InfoText>
              {plan.isActive
                ? "To get API keys, go to the 'My Tariffs' section and click the 'Get Key' button"
                : 'There are no API keys for inactive tariffs'}
            </InfoText>
          </Card>
        </LeftColumn>

        <RightColumn>
          <Card>
            <SubTitle>Tariff Features</SubTitle>
            <Features>
              {plan.features.map((feature, i) => (
                <Feature key={i}>
                  <CheckCircleOutlined style={{ color: theme.colors.brandPrimary }} />
                  <span>{feature}</span>
                </Feature>
              ))}
            </Features>
          </Card>
        </RightColumn>
      </Content>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${theme.fonts.fontFamily};
`;

const Back = styled.div`
  display: flex;
  align-items: center;
  align-self: self-start;
  margin-left: 8.9vw;
  gap: 0.4vw;
  font-size: 0.78vw;
  color: ${theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.brandPrimary};
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5vw;
  width: 60vw;
  margin-top: 1vw;
`;

const LeftColumn = styled.div``;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
`;

const Card = styled.div`
  background: ${theme.colors.backgroundCard};
  border-radius: 0.6vw;
  padding: 1.5vw;
  border: 0.05vw solid ${theme.colors.border};
  box-shadow: 0 0 4px 2px rgba(24, 24, 24, 0.046);
`;

const PlanInfo = styled.div``;

const Title = styled.h3`
  font-size: 1.22vw;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textPrimary};
  margin: 0 0 0.4vw;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${StyledTag} {
    height: fit-content;
  }
`;

const DateBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1.4vw;
  gap: 1vw;
`;

const DateItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 0.8vw;
  color: ${theme.colors.textSecondary};
`;

const Value = styled.div`
  font-size: 0.95vw;
  background: ${theme.colors.backgroundPage};
  color: ${theme.colors.textMedium};
  padding: 0.6vw;
  border-radius: 0.4vw;
  margin-top: 0.3vw;
`;

const InfoText = styled.p`
  background-color: ${theme.colors.backgroundPage};
  padding: 0.8vw;
  font-size: 0.8vw;
  color: ${theme.colors.textSecondary};

  margin-block: 0;
  margin-top: 1vw;
`;

const SubTitle = styled.h4`
  font-size: 1.15vw;
  color: ${theme.colors.textPrimary};

  font-weight: ${theme.fonts.fontWeightMedium};
  margin-block: 0;
  margin-bottom: 0.9vw;
`;

const Features = styled.div`
  display: grid;
  gap: 0.5vw;
  margin-top: 1.2rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  font-size: 1vw;
  color: ${theme.colors.textMedium};
  font-weight: 500;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;
