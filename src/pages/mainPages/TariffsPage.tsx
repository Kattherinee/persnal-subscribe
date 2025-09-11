import styled from 'styled-components';
import { CardPlan } from '../../components/CardPlan';
import { Subtitle, Title, TitleContainer, Wrapper } from './ProfilePage';
// import { CustomButton } from '../../../ui/CustomButton';
// import { CustomLabel } from '../../../ui/CustomLabel';
// import { CustomInput } from '../../../ui/CustomInput';

export const TariffsPage = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Доступные тарифы</Title>
        <Subtitle>Выберите подходящий тариф для ваших задач</Subtitle>
      </TitleContainer>
      <CardContainer>
        <CardPlan
          title="Стартер"
          subtitle="Идеально для начинающих"
          price="599 ₽/мес"
          features={['1 проект', '5GB хранилища', 'Email поддержка']}
        />
        <CardPlan
          title="Стартер"
          subtitle="Идеально для начинающих"
          price="599 ₽/мес"
          features={['1 проект', '5GB хранилища', 'Email поддержка', '1 vtczw']}
        />
      </CardContainer>
    </Wrapper>
  );
};

const CardContainer = styled.div`
  display: flex;
  gap: 1.3vw;
`;
