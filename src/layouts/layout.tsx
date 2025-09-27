import { useState } from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';
import { theme } from '../assets/theme/theme';
import {
  CreditCardOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '../store/authStore';

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuthStore();

  return (
    <LayoutWrapper>
      <Sidebar $collapsed={collapsed}>
        <SidebarHeader $collapsed={collapsed}>
          {!collapsed && (
            <div>
              <div style={{ fontWeight: theme.fonts.fontWeightMedium }}>{user?.fullname}</div>
              <small style={{ color: theme.colors.textSecondary }}>{user?.email}</small>
            </div>
          )}
        </SidebarHeader>

        <SidebarMenu $collapsed={collapsed}>
          <SidebarLink to="/">
            <UserOutlined />
            Мои данные
          </SidebarLink>
          <SidebarLink to="/tariffs">
            <CreditCardOutlined />
            Доступные тарифы
          </SidebarLink>
          <SidebarLink to="/my-tariffs">
            <KeyOutlined />
            Мои тарифы
          </SidebarLink>
        </SidebarMenu>

        <SidebarFooter>
          {!collapsed && (
            <>
              <SidebarLink className="logout" to={'/signin'} onClick={() => logout()}>
                <LogoutOutlined /> Выйти
              </SidebarLink>
            </>
          )}
        </SidebarFooter>
      </Sidebar>

      <Main>
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
        </Header>

        <Content $collapsed={collapsed}>
          <Outlet />
        </Content>
      </Main>
    </LayoutWrapper>
  );
};
const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  background: ${theme.colors.backgroundPage};
`;

const Sidebar = styled.div<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '20px' : '240px')};
  transition: width 0.3s ease;
  background: ${theme.colors.backgroundSidebar};
  border-right: 1px solid ${theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const SidebarHeader = styled.div<{ $collapsed: boolean }>`
  padding: 0 1rem;
  margin-bottom: 1.5rem;
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  align-items: center;
  gap: 0.75rem;
`;

const SidebarMenu = styled.nav<{ $collapsed: boolean }>`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  flex-direction: column;
  flex: 1;
  padding: 0 0.5rem;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.4vw;
  padding: 0.6rem 1rem;
  margin: 0.2rem 0;
  border-radius: 0.4rem;
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: ${theme.fonts.fontWeightMedium};

  &.logout {
    border: 1px solid ${theme.colors.sideBarActivebg};
  }

  &.active {
    background: ${theme.colors.sideBarActivebg};
    color: ${theme.colors.textPrimary};
  }

  &:hover {
    background: ${theme.colors.brandPrimaryTransparent};
    color: ${theme.colors.textPrimary};
  }
`;

const SidebarFooter = styled.div`
  padding: 0 0.5rem;
  font-size: 0.85rem;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

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
  }
`;

const Content = styled.main<{ $collapsed: boolean }>`
  flex: 1;
  padding: ${({ $collapsed }) => ($collapsed ? '1.6vw 7vw 1.6vw 7vw' : '1.6vw 4vw 1.6vw 3.5vw')};
  overflow-y: auto;
  color: ${theme.colors.textPrimary};
`;
