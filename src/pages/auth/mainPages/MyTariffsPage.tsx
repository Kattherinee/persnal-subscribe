import styled from 'styled-components';

import { Subtitle, Title, TitleContainer, Wrapper } from './ProfilePage';
import { CardMyPlan } from '../../../components/CardMyPlan';
import { mockPlan } from '../../../assets/mockData';
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
        <CardMyPlan
          title={mockPlan.title}
          price={mockPlan.price}
          endDate={mockPlan.endDate}
          isActive={true}
          idPlan={mockPlan.id}
        />
        <CardMyPlan title="Премиум" price="2999 ₽/мес" isActive={false} idPlan="123" />
      </CardContainer>
    </Wrapper>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
