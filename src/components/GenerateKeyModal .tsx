import { Modal, Spin, message } from 'antd';
import styled from 'styled-components';
import { theme } from '../assets/theme/theme';
import { CopyOutlined, KeyOutlined, LoadingOutlined } from '@ant-design/icons';
import { CustomButton } from '../ui/CustomButton';

interface IProps {
  open: boolean;
  onClose: () => void;
  accessKey?: string;
}

export const GenerateKeyModal = ({ open, onClose, accessKey }: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = async () => {
    if (!accessKey) return;
    await navigator.clipboard.writeText(accessKey);

    messageApi.success('The key was copied!');
  };
  return (
    <>
      {contextHolder}
      <Modal
        title={<Title>{<KeyOutlined />} Get API key</Title>}
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={400}
      >
        {accessKey ? (
          <Wrapper>
            <ApiContainer>
              <InfoText>Your API key:</InfoText>
              <KeyBox>
                <KeyValue>{accessKey}</KeyValue>
                <CopyBtn onClick={handleCopy}>
                  <CopyOutlined />
                </CopyBtn>
              </KeyBox>
            </ApiContainer>
            <Warning>
              <strong>Important:</strong> Save this key in a safe place.
            </Warning>
            <CustomButton type="primary" $mode="primary" onClick={onClose}>
              Done
            </CustomButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <Spin
              size="default"
              indicator={<LoadingOutlined spin />}
              style={{ marginRight: '0.3vw', color: theme.colors.brandPrimaryTransparent }}
            >
              Getting the key...
            </Spin>
          </Wrapper>
        )}
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
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2vw;
`;

const InfoText = styled.label`
  font-size: 0.95vw;
  color: ${theme.colors.textSecondary};
  margin-block: 0;
`;
const ApiContainer = styled.div`
  margin-top: 0.4vw;
  display: flex;
  flex-direction: column;
  gap: 0.4vw;
`;

const KeyBox = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.backgroundPage};
  padding: 0.6vw;
  border-radius: 0.5vw;
  border: 0.05vw solid ${theme.colors.border};
`;

const KeyValue = styled.span`
  flex: 1;
  font-family: monospace;
  font-size: 0.9vw;
  color: ${theme.colors.textPrimary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CopyBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1vw;
`;

const Warning = styled.div`
  font-size: 0.9vw;
  color: ${theme.colors.textMuted};
  background: #fff9e4;
  border-radius: 0.5vw;
  border: 1px solid #ffd438;
  padding: 0.6vw;
`;
