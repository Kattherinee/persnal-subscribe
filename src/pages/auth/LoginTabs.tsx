import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Login } from './Login';
import { LoginAdmin } from './LoginAdmin';
import styled from 'styled-components';
import { theme } from '../../assets/theme/theme';

export const LoginTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = location.pathname.includes('signin-admin') ? 'admin' : 'user';

  const handleTabChange = (key: string) => {
    navigate(key === 'admin' ? '/signin-admin' : '/signin');
  };

  return (
    <Container>
      <StyledTabs activeKey={activeKey} onChange={handleTabChange} centered>
        <Tabs.TabPane tab="User" key="user">
          <Login />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Admin" key="admin">
          <LoginAdmin />
        </Tabs.TabPane>
      </StyledTabs>
    </Container>
  );
};
export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.backgroundPage};
  @media (max-width: 769px) {
    align-items: start;
    margin-top: 50vw;
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    color: ${theme.colors.textSecondary};
    font-size: 0.95vw;
    font-weight: 500;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${theme.colors.brandPrimary} !important;
  }

  .ant-tabs-tab-btn:hover {
    color: ${theme.colors.brandPrimaryHover};
  }

  .ant-tabs-ink-bar {
    background: ${theme.colors.brandPrimary};
    height: 3px;
    border-radius: 3px;
  }
  @media (max-width: 769px) {
    .ant-tabs-tab {
      font-size: 4.45vw;
    }
    .ant-tabs-ink-bar {
      height: 6px;
      border-radius: 6px;
    }
  }
`;
