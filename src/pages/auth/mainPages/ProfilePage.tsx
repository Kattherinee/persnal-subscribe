import styled from 'styled-components';
import { theme } from '../../../assets/theme/theme';
import { CustomButton } from '../../../ui/CustomButton';
import { CustomLabel } from '../../../ui/CustomLabel';
import { CustomInput } from '../../../ui/CustomInput';
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
              <CustomButton $mode="primary" $height="2vw" onClick={handleSave}>
                Сохранить изменения
              </CustomButton>
              <CustomButton $mode="secondary" $height="2vw" onClick={handleCancel}>
                Отмена
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton $mode="secondary" $height="2vw" onClick={() => setIsEditing(true)}>
                Редактировать профиль
              </CustomButton>
              <CustomButton $mode="secondary" $height="2vw">
                Сменить пароль
              </CustomButton>
            </>
          )}
        </Buttons>
      </Card>
    </Wrapper>
  );
};

// ====== styled-components ======

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
