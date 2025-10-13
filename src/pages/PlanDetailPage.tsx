import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { theme } from '../assets/theme/theme';
import { Progress, Spin } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, CreditCardOutlined } from '@ant-design/icons';
// import { mockPlanActive } from '../assets/mockData';
import { StyledTag } from '../components/CardMyPlan';
import { Dot } from '../components/CardPlan';
// import type { IMyDetailTariff } from '../dto/tariffs';
import { usePlanStore } from '../store/planStore';
// import { getTariffDetail } from '../api/tariffs';

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
        // const res = getTariffDetail(id);
        // console.log('res', res);
        // const data: IMyDetailTariff = await res;
        // console.log('data', data);
        // // const data: IMyDetailTariff = await res.json();
        // setPlan(data);
      } catch (e) {
        console.error('Ошибка при загрузке тарифа:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
    // setPlan(mockPlanActive);
  }, [id, setPlan]);

  if (loading)
    return (
      <Loader>
        <Spin />
      </Loader>
    );
  if (!plan) return <div>Тариф не найден</div>;

  return (
    <Page>
      <HeaderContainer>
        <BackAndTitle>
          <Back onClick={() => window.history.back()}>
            <ArrowLeftOutlined />
            <span>Назад</span>
          </Back>

          <HeaderTitle>Тариф: {plan.title}</HeaderTitle>
        </BackAndTitle>
      </HeaderContainer>

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
                  {plan.isActive ? 'Активен' : 'Неактивен'}
                </StyledTag>
              </TitleContainer>

              <Price>{plan.price}</Price>
            </PlanInfo>

            <DateBlock>
              <DateItem>
                <Label>
                  <CalendarOutlined style={{ marginRight: '0.4vw' }} />
                  Дата создания
                </Label>
                <Value>{plan.startDate}</Value>
              </DateItem>
              <DateItem>
                <Label>
                  <CalendarOutlined style={{ marginRight: '0.4vw' }} />
                  Действует до
                </Label>
                <Value>{plan.endDate}</Value>
              </DateItem>
            </DateBlock>

            <InfoText>
              {plan.isActive
                ? "Для получения API ключей перейдите в раздел 'Мои тарифы' и нажмите кнопку 'Получить ключ'"
                : 'Для неактивного тарифа нет API ключей'}
            </InfoText>
          </Card>
        </LeftColumn>

        <RightColumn>
          <Card>
            <SubTitle>Возможности тарифа</SubTitle>
            <Features>
              {plan.features.map((feature, i) => (
                <Feature key={i}>
                  <Dot />
                  <span>{feature}</span>
                </Feature>
              ))}
            </Features>
          </Card>

          {plan.isActive && (
            <Card>
              <SubTitle>Использование</SubTitle>
              <UsageText>
                Запросы сегодня <b>{plan.usage.today}</b> / {plan.usage.limit}
              </UsageText>
              <Progress
                percent={(plan.usage.today / plan.usage.limit) * 100}
                showInfo={false}
                strokeColor={theme.colors.brandPrimary}
              />
              <MutedText>Статистика обновляется каждые 5 минут</MutedText>
            </Card>
          )}
        </RightColumn>
      </Content>
    </Page>
  );
};

/* -------- STYLES -------- */
const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${theme.fonts.fontFamily};
`;

const HeaderContainer = styled.header`
  height: 56px;
  border-bottom: 1px solid ${theme.colors.border};
  box-shadow: 0 0 4px 2px rgba(24, 24, 24, 0.046);
  background: ${theme.colors.backgroundCard};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const BackAndTitle = styled.div`
  display: flex;
  gap: 1vw;
  margin-left: 15vw;
`;

const Back = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4vw;
  font-size: 0.78vw;
  color: ${theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.brandPrimary};
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1.05vw;
  font-weight: ${theme.fonts.fontRegular};
  color: ${theme.colors.textPrimary};
  margin: 0;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5vw;
  width: 60vw;
  margin-top: 2vw;
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
  font-size: 1.12vw;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textPrimary};
  margin: 0 0 0.4vw;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.p`
  font-size: 1vw;
  color: ${theme.colors.textSecondary};
  margin: 0;
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
  display: flex;
  flex-direction: column;
  gap: 0.68vw;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8vw;
  font-size: 1vw;
  color: ${theme.colors.textMedium};
`;

const UsageText = styled.p`
  font-size: 0.9vw;
  color: ${theme.colors.textPrimary};
  margin-bottom: 0.8vw;
`;

const MutedText = styled.span`
  font-size: 0.75vw;
  color: ${theme.colors.textSecondary};
  display: block;
  margin-top: 0.6vw;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;
