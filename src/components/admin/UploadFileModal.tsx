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
          content: 'Getting upload link...',
          key: 'upload',
          duration: 0,
        });

        const { storageFileId, uploadFileLink } = await GetUploadLinkPlugin();

        if (!storageFileId || !uploadFileLink) {
          throw new Error('Failed to get upload link');
        }

        // Upload file directly via presigned URL
        messageApi.loading({ content: 'Uploading file...', key: 'upload', duration: 0 });

        await axios.put(uploadFileLink, file, {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });

        messageApi.loading({ content: 'Confirming upload...', key: 'upload', duration: 0 });

        await ConfirmUploadPlugin({ storageFileId });

        messageApi.destroy('upload');
        messageApi.success('File uploaded successfully!');
        onSuccess?.({ storageFileId });
        onClose();
      } catch (error) {
        console.error('Upload error:', error);
        messageApi.destroy('upload');
        messageApi.error('Error uploading file.');
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
            Upload Plugin
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
          <p className="ant-upload-text">Click or drag file here to upload</p>
          <p className="ant-upload-hint">
            Single upload supported. Do not upload confidential or prohibited files.
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
