import styled from 'styled-components';
import { theme } from '../../../assets/theme/theme';
import { CustomButton } from '../../../ui/CustomButton';

export const ProfilePage = () => {
  return (
    <Wrapper>
      <div>
        <Title>Мои данные</Title>
        <Subtitle>Управление основной информацией аккаунта</Subtitle>
      </div>

      <Card>
        <CardTitle>Профиль</CardTitle>
        <p
          style={{
            fontSize: '0.85rem',
            color: theme.colors.textMuted,
            marginBottom: '1rem',
          }}
        >
          Основная информация о вашем аккаунте
        </p>

        <FieldRow>
          <Field>
            <Label>Имя</Label>
            <Value>Иван Петров</Value>
          </Field>
          <Field>
            <Label>Email</Label>
            <Value>ivan@example.com</Value>
          </Field>
        </FieldRow>

        <Buttons>
          <CustomButton type="text" $mode="secondary">
            Редактировать профиль
          </CustomButton>
          <CustomButton type="text" $mode="secondary">
            Сменить пароль
          </CustomButton>
        </Buttons>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: ${theme.fonts.fontWeightSemibold};
  color: ${theme.colors.textPrimary};
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textMuted};
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background: ${theme.colors.backgroundCard};
  border: 1px solid ${theme.colors.border};
  border-radius: 0.6rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textPrimary};
  margin-bottom: 0.75rem;
`;

const FieldRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const Field = styled.div`
  flex: 1;
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  margin-bottom: 0.3rem;
`;

const Value = styled.div`
  background: ${theme.colors.backgroundInput};
  border: 1px solid ${theme.colors.border};
  border-radius: 0.4rem;
  padding: 0.6rem 0.75rem;
  font-size: 0.9rem;
  color: ${theme.colors.textPrimary};
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;
