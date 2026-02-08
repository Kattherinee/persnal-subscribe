import styled from 'styled-components';
import { CardPlan } from '../../components/CardPlan';
import { Subtitle, Title, TitleContainer, Wrapper } from './ProfilePage/ProfilePage';
import { useTariffsStore } from '../../store/tariffsStore';
import { useEffect } from 'react';
import { getAvailableTariff, payTariff } from '../../api/tariffs';
import { App } from 'antd';

export const TariffsPage = () => {
  const { tariffs, setTariffs } = useTariffsStore();
  const { message } = App.useApp();

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const res = await getAvailableTariff();
        setTariffs(res);
      } catch (error) {
        message.error('Ошибка загрузки тарифов');
        console.error('Failed to fetch tariffs:', error);
      }
    };

    fetchTariffs();
  }, [setTariffs, message]);

  const onSelectPlan = async (id: string) => {
    try {
      const res = payTariff(id);
      window.location.href = (await res) as string;
    } catch (error) {
      message.error('Failed to choose tariff');
      console.error('Failed to pay tariff:', error);
    }
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Pricing Plans</Title>
        <Subtitle>Choose available tariff for your purposes</Subtitle>
      </TitleContainer>
      <CardContainer>
        {tariffs.map((plan) => {
          return (
            <CardPlan
              key={plan.id}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              onSelect={() => onSelectPlan(plan.id)}
            />
          );
        })}
      </CardContainer>
    </Wrapper>
  );
};

const CardContainer = styled.div`
  display: flex;
  gap: 1.3vw;
  @media (max-width: 769px) {
    gap: 3.3vw;
  }
`;
