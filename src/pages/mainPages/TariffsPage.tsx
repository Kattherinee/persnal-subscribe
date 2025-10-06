import styled from 'styled-components';
import { CardPlan } from '../../components/CardPlan';
import { Subtitle, Title, TitleContainer, Wrapper } from './ProfilePage/ProfilePage';
import { useTariffsStore } from '../../store/tariffsStore';
import { useEffect } from 'react';
import { getAvailableTariff } from '../../api/tariffs';
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

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Доступные тарифы</Title>
        <Subtitle>Выберите подходящий тариф для ваших задач</Subtitle>
      </TitleContainer>
      <CardContainer>
        {tariffs.map((plan) => {
          return (
            <CardPlan
              key={plan.id}
              title={plan.title}
              price={plan.price}
              features={plan.features}
            />
          );
        })}
        <CardPlan
          title="Стартер"
          price="599"
          features={['1 проект', '5GB хранилища', 'Email поддержка']}
        />
        {/* <CardPlan
          title="PRO Тариф"
          price="1599"
          features={['3 проект', '5GB хранилища', 'Email поддержка', '1 vtczw', 'И еще че то']}
        /> */}
        {/* <CardPlan
          title="PRO PRO Тариф"
          price="1599"
          features={[
            '3 проект',
            '5GB хранилища',
            'Email поддержка',
            '1 vtczw',
            'И еще че то',
            'Email поддержка',
            '1 vtczw',
            'И еще че то',
          ]}
        /> */}
      </CardContainer>
    </Wrapper>
  );
};

const CardContainer = styled.div`
  display: flex;
  gap: 1.3vw;
`;
