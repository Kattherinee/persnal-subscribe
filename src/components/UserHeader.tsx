import styled from 'styled-components';
import { theme } from '../assets/theme/theme';
import {
  DownloadOutlined,
  InfoCircleTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { CustomButton } from '../ui/CustomButton';
import { App } from 'antd';
import { useState } from 'react';
import { GetPluginLink } from '../api/uploadFile';
import { modalButtonStyles } from '../pages/mainPages/ProfilePage/modalButtonStyles';

interface IProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserHeader = ({ collapsed, setCollapsed }: IProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { modal, message } = App.useApp();
  const downloadPlugin = async () => {
    try {
      setIsDownloading(true);
      message.loading({ content: 'Получение ссылки...', key: 'download', duration: 0 });

      const downloadLink = await GetPluginLink();

      if (!downloadLink) {
        throw new Error('Не удалось получить ссылку для скачивания');
      }

      message.loading({ content: 'Скачивание файла...', key: 'download', duration: 0 });

      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = 'plugin.exe';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.destroy('download');
    } catch (error) {
      console.error('Ошибка скачивания:', error);
      message.destroy('download');
      message.error('Ошибка при скачивании плагина');
    } finally {
      setIsDownloading(false);
    }
  };
  const handleDownloadPlugin = () => {
    modal.confirm({
      title: 'Скачать плагин?',
      icon: <InfoCircleTwoTone twoToneColor="#7e1cff" />,
      content: 'Вы уверены, что хотите скачать активный плагин?',
      okText: 'Скачать',
      cancelText: 'Отмена',
      okButtonProps: {
        style: modalButtonStyles.okButton,
        onMouseEnter: (e) => {
          Object.assign(e.currentTarget.style, modalButtonStyles.okButtonHover);
        },
        onMouseLeave: (e) => {
          Object.assign(e.currentTarget.style, modalButtonStyles.okButton);
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
      onOk: downloadPlugin,
    });
  };
  return (
    <Header>
      <HeaderLeft>
        {collapsed ? (
          <MenuUnfoldOutlined
            size={20}
            onClick={() => setCollapsed(false)}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <MenuFoldOutlined
            size={20}
            onClick={() => setCollapsed(true)}
            style={{ cursor: 'pointer' }}
          />
        )}
        <h1>Личный кабинет</h1>
      </HeaderLeft>
      <CustomButton
        $mode="primary"
        onClick={handleDownloadPlugin}
        disabled={isDownloading}
        style={{ marginLeft: 'auto' }}
      >
        <DownloadOutlined style={{ marginRight: '0.4rem' }} />
        Скачать плагин
      </CustomButton>
    </Header>
  );
};

const Header = styled.header`
  height: 56px;
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.backgroundCard};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h1 {
    font-size: 1rem;
    font-weight: ${theme.fonts.fontWeightSemibold};
    color: ${theme.colors.textPrimary};
    margin: 0;
  }
`;
