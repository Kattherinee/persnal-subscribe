import styled from 'styled-components';
import { Subtitle, Title, TitleContainer, Wrapper } from './ProfilePage/ProfilePage';
import { CardMyPlan } from '../../components/CardMyPlan';
import { useEffect, useState } from 'react';
import { getUserTariffs } from '../../api/tariffs';
import { App, Spin } from 'antd';
import { useUserTariffsStore } from '../../store/userTariffsStore';
import { Loader } from '../PlanDetailPage';
import { theme } from '../../assets/theme/theme';

export const MyTariffsPage = () => {
  const { message } = App.useApp();
  const { userTariffs, setUserTariffs } = useUserTariffsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        setLoading(true);

        const res = await getUserTariffs();
        setUserTariffs(res);
      } catch (error) {
        message.error('Error loading tariffs');
        console.error('Failed to fetch tariffs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTariffs();
  }, [setUserTariffs, message]);

  if (loading) {
    return (
      <Wrapper>
        <TitleContainer>
          <Title>My tariffs</Title>
          <Subtitle>Managing active subscriptions and obtaining API keys</Subtitle>
        </TitleContainer>

        <Loader>
          <Spin />
        </Loader>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Title>My tariffs</Title>
        <Subtitle>Managing active subscriptions and obtaining API keys</Subtitle>
      </TitleContainer>
      <CardContainer>
        {userTariffs.length === 0 ? (
          <EmptyState>No tariffs found</EmptyState>
        ) : (
          userTariffs.map((plan, i) => {
            return (
              <CardMyPlan
                key={i}
                title={plan.title}
                price={plan.price}
                endDate={plan.endDate}
                isActive={plan.isActive}
                id={plan.id}
                accessKey={plan.accessKey}
              />
            );
          })
        )}
      </CardContainer>
    </Wrapper>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${theme.colors.textSecondary};
  font-size: 16px;
`;
