import { Form, Modal, message } from 'antd';
import styled from 'styled-components';

import { theme } from '../assets/theme/theme';
import { KeyOutlined } from '@ant-design/icons';
import { CustomButton } from '../ui/CustomButton';
import { CustomLabel } from '../ui/CustomLabel';
import { CustomPasswordInput } from '../ui/CustomPasswordInput';
import { useAuthStore } from '../store/authStore';
import { updatePassword } from '../api/user';
import type { AxiosError } from 'axios';

type GenerateKeyModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ChangePasswordModal = ({ open, onClose }: GenerateKeyModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuthStore();
  const [form] = Form.useForm();

  const onFinish = async (values: { newPassword: string }) => {
    try {
      if (!user) return;
      const payload = {
        newPassword: values.newPassword,
      };

      await updatePassword(payload);
      messageApi.success('Password changed successfully!');
      form.resetFields();
      onClose();
    } catch (err) {
      messageApi.error('Error changing password');
      const error = err as AxiosError;
      console.error(error.response);
      form.resetFields();
      onClose();
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<Title>{<KeyOutlined />} Change Password</Title>}
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={400}
      >
        <Form
          form={form}
          name="changePassword"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            name="newPassword"
            label={<CustomLabel isRequired>New Password</CustomLabel>}
            rules={[
              { required: true, message: 'Please enter password' },
              {
                min: 8,
                message: 'Password must contain at least 8 characters',
              },
              {
                pattern: /[0-9]/,
                message: 'Password must contain at least one number',
              },
            ]}
            required={false}
          >
            <CustomPasswordInput type="password" placeholder="Enter new password" />
          </Form.Item>

          <ButtonsContainer>
            <CustomButton type="text" $mode="secondary" $width="100%" onClick={onClose}>
              Cancel
            </CustomButton>
            <CustomButton type="primary" htmlType="submit" $width="100%">
              Change Password
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
  @media (max-width: 769px) {
    font-size: 4.25vw;
    margin-bottom: 3vw;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 2vw;
  display: flex;
  gap: 1vw;
  @media (max-width: 769px) {
    margin-top: 6vw;
    gap: 3vw;
  }
`;
