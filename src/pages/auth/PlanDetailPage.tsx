import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { theme } from '../../assets/theme/theme';
import { Progress, Tag, Spin } from 'antd';
import { ExportOutlined, LeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { mockPlan } from '../../assets/mockData';

export interface PlanData {
  id: string;
  title: string;
  price: string;
  startDate: string;
  endDate: string;
  features: string[];
  usage: {
    today: number;
    limit: number;
  };
  isActive: boolean;
}

export const PlanDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // заглушка под API запрос
    async function fetchPlan() {
      setLoading(true);
      try {
        // допустим GET /api/plans/:id
        const res = await fetch(`/api/plans/${id}`);
        const data: PlanData = await res.json();
        setPlan(data);
      } catch (e) {
        console.error('Ошибка при загрузке тарифа:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
    setPlan(mockPlan);
  }, [id]);

  if (loading)
    return (
      <Loader>
        <Spin />
      </Loader>
    );
  if (!plan) return <div>Тариф не найден</div>;

  return (
    <Page>
      <PlanHeader>
        <Back onClick={() => window.history.back()}>
          <LeftOutlined />
          <span>Назад</span>
        </Back>

        <HeaderTitle>Тариф: {plan.title}</HeaderTitle>

        <Icons>
          <ReloadOutlined />
          <ExportOutlined />
        </Icons>
      </PlanHeader>

      <Content>
        <LeftColumn>
          <Card>
            <Top>
              <PlanInfo>
                <Title>{plan.title}</Title>
                <Price>{plan.price}</Price>
              </PlanInfo>
              <StyledTag $active={plan.isActive}>
                {plan.isActive ? 'Активен' : 'Неактивен'}
              </StyledTag>
            </Top>

            <DateBlock>
              <DateItem>
                <Label>Дата создания</Label>
                <Value>{plan.startDate}</Value>
              </DateItem>
              <DateItem>
                <Label>Действует до</Label>
                <Value>{plan.endDate}</Value>
              </DateItem>
            </DateBlock>

            <InfoText>
              Для получения API ключей перейдите в раздел "Мои тарифы" и нажмите кнопку "Получить
              ключ".
            </InfoText>
          </Card>
        </LeftColumn>

        <RightColumn>
          <Card>
            <SubTitle>Возможности тарифа</SubTitle>
            <List>
              {plan.features.map((f, i) => (
                <ListItem key={i}> {f}</ListItem>
              ))}
            </List>
          </Card>

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
        </RightColumn>
      </Content>
    </Page>
  );
};

/* -------- STYLES -------- */
const Page = styled.div`
  background: ${theme.colors.backgroundPage};
  padding: 2vw;
  font-family: ${theme.fonts.fontFamily};
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5vw;
  padding-bottom: 0.8vw;
  border-bottom: 0.05vw solid ${theme.colors.border};
`;

const Back = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4vw;
  font-size: 0.9vw;
  color: ${theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.brandPrimary};
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1.2vw;
  font-weight: ${theme.fonts.fontWeightSemibold};
  color: ${theme.colors.textPrimary};
  margin: 0;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  font-size: 1.1vw;
  color: ${theme.colors.textPrimary};
  cursor: pointer;

  svg:hover {
    color: ${theme.colors.brandPrimary};
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5vw;
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
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlanInfo = styled.div``;

const Title = styled.h3`
  font-size: 1.2vw;
  color: ${theme.colors.textPrimary};
  margin: 0 0 0.3vw;
`;

const Price = styled.p`
  font-size: 1vw;
  color: ${theme.colors.textPrimary};
  margin: 0;
`;

const StyledTag = styled(Tag)<{ $active: boolean }>`
  font-size: 0.8vw;
  padding: 0.2vw 0.6vw;
  border-radius: 0.4vw;
  background: ${(p) =>
    p.$active ? theme.colors.brandPrimary : theme.colors.backgroundButtonDisabled};
  color: ${(p) => (p.$active ? theme.colors.textInverse : theme.colors.textSecondary)};
  border: none;
`;

const DateBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1vw;
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
  padding: 0.6vw;
  border-radius: 0.4vw;
  margin-top: 0.3vw;
`;

const InfoText = styled.p`
  font-size: 0.85vw;
  color: ${theme.colors.textSecondary};
  margin-top: 1.5vw;
`;

const SubTitle = styled.h4`
  font-size: 1vw;
  color: ${theme.colors.textPrimary};
  margin-bottom: 0.8vw;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1vw;
`;

const ListItem = styled.li`
  font-size: 0.9vw;
  color: ${theme.colors.textPrimary};
  margin-bottom: 0.5vw;
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
