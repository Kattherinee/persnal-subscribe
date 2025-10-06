import { Modal, Upload, message } from 'antd';
import styled from 'styled-components';
import { theme } from '../../assets/theme/theme';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { GetUploadLinkPlugin, ConfirmUploadPlugin } from '../../api/uploadFile';
import type { UploadProps } from 'antd';
import axios from 'axios';

const { Dragger } = Upload;

type UploadFileModalProps = {
  open: boolean;
  onClose: () => void;
};

export const UploadFileModal = ({ open, onClose }: UploadFileModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: true,
    maxCount: 1,

    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        messageApi.loading({
          content: 'Получение ссылки для загрузки...',
          key: 'upload',
          duration: 0,
        });

        const { storageFileId, uploadFileLink } = await GetUploadLinkPlugin();

        if (!storageFileId || !uploadFileLink) {
          throw new Error('Не удалось получить ссылку для загрузки');
        }

        //Загружаем файл напрямую по presigned URL
        messageApi.loading({ content: 'Загрузка файла...', key: 'upload', duration: 0 });

        await axios.put(uploadFileLink, file, {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });

        messageApi.loading({ content: 'Подтверждение загрузки...', key: 'upload', duration: 0 });

        await ConfirmUploadPlugin({ storageFileId });

        messageApi.destroy('upload');
        messageApi.success('Файл успешно загружен!');
        onSuccess?.({ storageFileId });
        onClose();
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        messageApi.destroy('upload');
        messageApi.error('Ошибка при загрузке файла.');
        onError?.(error as Error);
      }
    },
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <Title>
            <UploadOutlined style={{ marginRight: 8 }} />
            Загрузить плагин
          </Title>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={600}
      >
        <StyledDragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: theme.colors.brandPrimary }} />
          </p>
          <p className="ant-upload-text">Нажмите или перетащите файл сюда для загрузки</p>
          <p className="ant-upload-hint">
            Поддерживается одиночная загрузка. Не загружайте конфиденциальные или запрещённые файлы.
          </p>
        </StyledDragger>
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
const StyledDragger = styled(Dragger)`
  margin: 0.1vw;

  .ant-upload-drag:hover {
    border-color: ${theme.colors.brandPrimaryHover};
  }

  .ant-upload-drag-active {
    border-color: ${theme.colors.brandPrimary};
  }
`;
