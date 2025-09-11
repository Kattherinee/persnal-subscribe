import styled from 'styled-components';
import { theme } from '../../assets/theme/theme';
import { CustomButton } from '../../ui/CustomButton';
import { CustomLabel } from '../../ui/CustomLabel';
import { CustomInput } from '../../ui/CustomInput';
import { useState } from 'react';

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Иван Петров',
    email: 'ivan@example.com',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Сохраняем данные:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ name: 'Иван Петров', email: 'ivan@example.com' }); // сброс
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Мои данные</Title>
        <Subtitle>Управление основной информацией аккаунта</Subtitle>
      </TitleContainer>

      <PageCard>
        <CardTitle>Профиль</CardTitle>
        <CardInfo>Основная информация о вашем аккаунте</CardInfo>

        <FieldRow>
          <Field>
            <CustomLabel>Имя</CustomLabel>
            <CustomInput
              value={formData.name}
              disabled={!isEditing}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Field>
          <Field>
            <CustomLabel>Email</CustomLabel>
            <CustomInput
              value={formData.email}
              disabled={!isEditing}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Field>
        </FieldRow>

        <Buttons>
          {isEditing ? (
            <>
              <CustomButton $mode="primary" onClick={handleSave}>
                Сохранить изменения
              </CustomButton>
              <CustomButton $mode="secondary" onClick={handleCancel}>
                Отмена
              </CustomButton>
              <CustomButton style={{ marginLeft: 'auto' }} $mode="secondary" onClick={handleCancel}>
                Сменить пароль
              </CustomButton>
              <CustomButton style={{ color: 'red' }} $mode="secondary" onClick={handleCancel}>
                Удалить аккаунт
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton $mode="secondary" onClick={() => setIsEditing(true)}>
                Редактировать профиль
              </CustomButton>
            </>
          )}
        </Buttons>
      </PageCard>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 1.2vw;
  margin-block: 0;
  font-weight: ${theme.fonts.fontWeightSemibold};
  color: ${theme.colors.textPrimary};
`;

export const Subtitle = styled.p`
  font-size: 0.9vw;
  color: ${theme.colors.textMuted};
  margin-block: 0;
`;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6vw;
  margin-bottom: 1.2vw;
`;
export const PageCard = styled.div`
  background: ${theme.colors.backgroundCard};
  border: 1px solid ${theme.colors.border};
  border-radius: 0.6rem;
  padding: 1.2vw 0.94vw;
  box-shadow: 0 0 4px 2px rgba(45, 45, 45, 0.046);
`;

const CardTitle = styled.h3`
  font-size: 0.94vw;
  font-weight: ${theme.fonts.fontWeightSemibold};
  color: ${theme.colors.textPrimary};
  margin-block: 0;
  margin-bottom: 0.75rem;
`;
const CardInfo = styled.div`
  font-size: 0.83vw;
  color: ${theme.colors.textMuted};
  margin-bottom: 0.94vw;
`;

const FieldRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.83vw;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
`;
