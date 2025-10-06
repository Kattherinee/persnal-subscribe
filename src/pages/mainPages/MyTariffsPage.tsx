import styled from 'styled-components';

import { Subtitle, Title, TitleContainer, Wrapper } from './ProfilePage/ProfilePage';
import { CardMyPlan } from '../../components/CardMyPlan';
import { mockPlans } from '../../assets/mockData';
// import { CustomButton } from '../../../ui/CustomButton';
// import { CustomLabel } from '../../../ui/CustomLabel';
// import { CustomInput } from '../../../ui/CustomInput';

export const MyTariffsPage = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Мои тарифы</Title>
        <Subtitle>Управление активными подписками и получение API ключей</Subtitle>
      </TitleContainer>
      <CardContainer>
        {mockPlans.map((plan, i) => {
          return (
            <CardMyPlan
              key={i}
              title={plan.title}
              price={plan.price}
              endDate={plan.endDate}
              isActive={plan.isActive}
              idPlan={plan.id}
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
