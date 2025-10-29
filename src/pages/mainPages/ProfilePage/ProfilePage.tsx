/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { theme } from '../../../assets/theme/theme';
import { CustomButton } from '../../../ui/CustomButton';
import { CustomLabel } from '../../../ui/CustomLabel';
import { CustomInput } from '../../../ui/CustomInput';
import { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { deleteUser, updateUser } from '../../../api/user';
import { ChangePasswordModal } from '../../../components/ChangePasswordModal';
import { App } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { modalButtonStyles } from './modalButtonStyles';

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, setUser, logout } = useAuthStore();
  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
  });
  const navigate = useNavigate();
  const { modal, message } = App.useApp();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUser(formData);
      setUser(formData);
      setIsEditing(false);
      message.success('Successfully updated!');
    } catch (err) {
      message.error('Profile update error');
      const error = err as AxiosError;
      console.error(error.response);
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setFormData({ ...formData, fullname: user.fullname, email: user.email });
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    modal.confirm({
      title: 'Are you sure you want to delete your account?',
      icon: <WarningTwoTone twoToneColor="#ff1c1c" />,
      content: 'This action cannot be undone. All your data will be permanently deleted.',
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: {
        style: modalButtonStyles.dangerButton,
        onMouseEnter: (e) => {
          Object.assign(e.currentTarget.style, modalButtonStyles.dangerButtonHover);
        },
        onMouseLeave: (e) => {
          Object.assign(e.currentTarget.style, modalButtonStyles.dangerButton);
        },
      },
      cancelButtonProps: {
        style: modalButtonStyles.cancelButton,
        onMouseEnter: (e) => {
          Object.assign(e.currentTarget.style, modalButtonStyles.cancelButtonHover);
        },
        onMouseLeave: (e) => {
          Object.assign(e.currentTarget.style, modalButtonStyles.cancelButton);
        },
      },
      onOk: deleteAccount,
    });
  };

  const deleteAccount = async () => {
    try {
      if (!user) return;
      await deleteUser();
      navigate('/signup');
      logout();
    } catch (error: any) {
      message.error('Error deleting account');
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Title>My profile</Title>
        <Subtitle>Manage your account's main information</Subtitle>
      </TitleContainer>

      <PageCard>
        <CardTitle>Profile</CardTitle>
        <CardInfo>Main information about your account</CardInfo>

        <FieldRow>
          <Field>
            <CustomLabel>Name</CustomLabel>
            <CustomInput
              value={formData?.fullname}
              disabled={!isEditing}
              onChange={(e) => handleChange('fullname', e.target.value)}
            />
          </Field>
          <Field>
            <CustomLabel>Email</CustomLabel>
            <CustomInput
              value={formData?.email}
              disabled={!isEditing}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Field>
        </FieldRow>

        <Buttons>
          {isEditing ? (
            <>
              <BottomRow>
                <CustomButton $mode="primary" onClick={handleSave}>
                  Save changes
                </CustomButton>
                <CustomButton $mode="secondary" onClick={handleCancel}>
                  Cancel
                </CustomButton>
              </BottomRow>
              <TopRow>
                <CustomButton $mode="secondary" onClick={() => setIsModalOpen(true)}>
                  Change password
                </CustomButton>
                <CustomButton $mode="secondary" onClick={handleDeleteAccount}>
                  Delete account
                </CustomButton>
              </TopRow>

              <ChangePasswordModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </>
          ) : (
            <>
              <CustomButton $mode="secondary" onClick={() => setIsEditing(true)}>
                Edit profile
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
  font-size: 1.3vw;
  margin-block: 0;
  font-weight: ${theme.fonts.fontWeightSemibold};
  color: ${theme.colors.textPrimary};
  @media (max-width: 769px) {
    font-size: 4.25vw;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.9vw;
  color: ${theme.colors.textMuted};
  margin-block: 0;
  @media (max-width: 769px) {
    font-size: 3.75vw;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2vw;
  margin-bottom: 1.2vw;
  @media (max-width: 769px) {
    gap: 0.94vw;
    margin-bottom: 4.2vw;
  }
`;

export const PageCard = styled.div`
  background: ${theme.colors.backgroundCard};
  border: 1px solid ${theme.colors.border};
  border-radius: 0.6rem;
  padding: 1.2vw 0.94vw;
  box-shadow: 0 0 4px 2px rgba(45, 45, 45, 0.046);
  @media (max-width: 769px) {
    padding: 3.2vw 4vw 4vw;
  }
`;

const CardTitle = styled.h3`
  font-size: 0.94vw;
  font-weight: ${theme.fonts.fontWeightSemibold};
  color: ${theme.colors.textPrimary};
  margin-block: 0;
  margin-bottom: 0.75rem;
  @media (max-width: 769px) {
    display: none;
  }
`;

const CardInfo = styled.div`
  font-size: 0.83vw;
  color: ${theme.colors.textMuted};
  margin-bottom: 0.94vw;
  @media (max-width: 769px) {
    display: none;
  }
`;

const FieldRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  @media (max-width: 769px) {
    flex-direction: column;
    gap: 5.28vw;
    margin-bottom: 3.2vw;
  }
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.83vw;
  @media (max-width: 769px) {
    gap: 2.28vw;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1rem;

  @media (max-width: 769px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 2vw;
    margin-top: 6vw;
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

const TopRow = styled.div`
  display: flex;
  gap: 0.75rem;
  button {
    width: 10vw;
  }

  @media (max-width: 769px) {
    display: grid;
    margin-top: 2.5vw;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5vw;
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

const BottomRow = styled(TopRow)`
  button {
    width: 8vw;
  }
  @media (max-width: 769px) {
    button {
      width: 100%;
    }
    margin-top: 1.8vw;
  }
`;
