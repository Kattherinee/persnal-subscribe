import { Modal, Spin, message } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import { theme } from '../assets/theme/theme';
import { CopyOutlined, KeyOutlined, LoadingOutlined } from '@ant-design/icons';
import { CustomButton } from '../ui/CustomButton';

type GenerateKeyModalProps = {
  open: boolean;
  onClose: () => void;
};

export const GenerateKeyModal = ({ open, onClose }: GenerateKeyModalProps) => {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // моковый запрос
      await new Promise((res) => setTimeout(res, 1500));
      const mockKey = 'sk-proj-abc123xyz890example';
      setApiKey(mockKey);
    } catch (e) {
      messageApi.error('Ошибка при генерации ключа');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    messageApi.success('Ключ скопирован!');
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<Title>{<KeyOutlined />} Получить API ключ</Title>}
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={400}
      >
        {!apiKey ? (
          <Wrapper>
            <InfoText>Создайте новый API ключ для тарифа "Базовый".</InfoText>
            <CustomButton
              type="primary"
              $mode="primary"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spin
                    size="small"
                    indicator={<LoadingOutlined spin />}
                    style={{ marginRight: '0.3vw', color: theme.colors.textInverse }}
                  />{' '}
                  Генерация
                </>
              ) : (
                'Сгенерировать ключ'
              )}
            </CustomButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <ApiContainer>
              <InfoText>Ваш API ключ:</InfoText>
              <KeyBox>
                <KeyValue>{apiKey}</KeyValue>
                <CopyBtn onClick={handleCopy}>
                  <CopyOutlined />
                </CopyBtn>
              </KeyBox>
            </ApiContainer>
            <Warning>
              <strong>Важно:</strong> Сохраните этот ключ в безопасном месте.
            </Warning>
            <CustomButton type="primary" $mode="primary" onClick={onClose}>
              Готово
            </CustomButton>
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
