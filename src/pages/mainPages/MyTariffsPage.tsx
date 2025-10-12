import styled from 'styled-components';

import { Subtitle, Title, TitleContainer, Wrapper } from './ProfilePage/ProfilePage';
import { CardMyPlan } from '../../components/CardMyPlan';
import { useEffect } from 'react';
import { getUserTariffs } from '../../api/tariffs';
import { App } from 'antd';
import { useUserTariffsStore } from '../../store/userTariffsStore';

export const MyTariffsPage = () => {
  const { message } = App.useApp();
  const { userTariffs, setUserTariffs } = useUserTariffsStore();
  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const res = await getUserTariffs();
        setUserTariffs(res);
      } catch (error) {
        message.error('Ошибка загрузки тарифов');
        console.error('Failed to fetch tariffs:', error);
      }
    };

    fetchTariffs();
  }, [setUserTariffs, message]);
  console.log('userTariffs', userTariffs);
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Мои тарифы</Title>
        <Subtitle>Управление активными подписками и получение API ключей</Subtitle>
      </TitleContainer>
      <CardContainer>
        {userTariffs.map((plan, i) => {
          return (
            <CardMyPlan
              key={i}
              title={plan.title}
              price={plan.price}
              endDate={plan.endDate}
              isActive={plan.isActive}
              idPlan={plan.id}
              accessKey={plan.accessKey}
            />
          );
        })}
      </CardContainer>
    </Wrapper>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
