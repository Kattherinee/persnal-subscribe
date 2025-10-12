import styled from 'styled-components';
import { theme } from '../../assets/theme/theme';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined } from '@ant-design/icons';
import { CustomButton } from '../../ui/CustomButton';
import { UploadFileModal } from './UploadFileModal';
import { useState } from 'react';

interface IProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminHeader = ({ collapsed, setCollapsed }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Header>
      <HeaderLeft>
        {collapsed ? (
          <MenuUnfoldOutlined
            onClick={() => setCollapsed(false)}
            style={{ cursor: 'pointer', fontSize: 20 }}
          />
        ) : (
          <MenuFoldOutlined
            onClick={() => setCollapsed(true)}
            style={{ cursor: 'pointer', fontSize: 20 }}
          />
        )}
        <h1>Admin-Panel</h1>
      </HeaderLeft>
      <CustomButton onClick={() => setIsModalOpen(true)} type="primary">
        <UploadOutlined style={{ marginRight: 5 }} /> Upload plugin
      </CustomButton>
      <UploadFileModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
