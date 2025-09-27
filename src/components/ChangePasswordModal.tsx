import { Form, Modal, message } from 'antd';
import styled from 'styled-components';

import { theme } from '../assets/theme/theme';
import { KeyOutlined } from '@ant-design/icons';
import { CustomButton } from '../ui/CustomButton';
import { CustomLabel } from '../ui/CustomLabel';
import { CustomPasswordInput } from '../ui/CustomPasswordInput';
import { useAuthStore } from '../store/authStore';
import { updatePassword } from '../api/auth';

type GenerateKeyModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ChangePasswordModal = ({ open, onClose }: GenerateKeyModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuthStore();
  const onFinish = async (values: { newPassword: string }) => {
    try {
      if (!user) return;
      const payload = {
        id: user.id,
        newPassword: values.newPassword,
      };

      await updatePassword(payload);
      messageApi.success('Пароль изменен успешно!');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      messageApi.error(err.response?.data?.message || 'Ошибка смены пароля');
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<Title>{<KeyOutlined />} Сменить пароль</Title>}
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={400}
      >
        <Form name="changePassword" layout="vertical" onFinish={onFinish} autoComplete="on">
          <Form.Item
            label={<CustomLabel isRequired>Новый пароль</CustomLabel>}
            name="newPassword"
            rules={[
              { required: true, message: 'Введите пароль' },
              {
                min: 8,
                message: 'Пароль должен содержать минимум 8 символов',
              },
              {
                pattern: /[0-9]/,
                message: 'Пароль должен содержать хотя бы одну цифру',
              },
            ]}
            required={false}
          >
            <CustomPasswordInput type="password" placeholder="Введите новый пароль" />
          </Form.Item>

          <ButtonsContainer>
            <CustomButton type="text" $mode="secondary" $width="100%" onClick={onClose}>
              Отмена
            </CustomButton>
            <CustomButton type="primary" htmlType="submit" $width="100%">
              Сменить пароль
            </CustomButton>
          </ButtonsContainer>
        </Form>
      </Modal>
    </>
  );
};

const Title = styled.h3`
  font-size: 1.1vw;
  font-weight: ${theme.fonts.fontWeightMedium};
  color: ${theme.colors.textPrimary};
  margin-block: 0;
`;

const ButtonsContainer = styled.div`
  margin-top: 2vw;
  display: flex;
  gap: 1vw;
`;
