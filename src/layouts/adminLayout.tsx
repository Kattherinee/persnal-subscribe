import { useState } from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';
import { theme } from '../assets/theme/theme';
import { LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useAdminStore } from '../store/adminStore';
import { AdminHeader } from '../components/admin/AdminHeader';

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logoutAdmin } = useAdminStore();

  return (
    <LayoutWrapper>
      <Sidebar $collapsed={collapsed}>
        <SidebarHeader $collapsed={collapsed} />
        <SidebarMenu $collapsed={collapsed}>
          <SidebarLink to="/admin/users">
            <UsergroupAddOutlined />
            Все пользователи
          </SidebarLink>
        </SidebarMenu>

        <SidebarFooter>
          {!collapsed && (
            <>
              <SidebarLink to={'/signin-admin'} onClick={() => logoutAdmin()}>
                <LogoutOutlined /> Выйти
              </SidebarLink>
            </>
          )}
        </SidebarFooter>
      </Sidebar>

      <Main>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
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
  width: ${({ $collapsed }) => ($collapsed ? '20px' : '210px')};
  transition: width 0.3s ease;
  background: ${theme.colors.backgroundSidebar};
  border-right: 1px solid ${theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;

const SidebarHeader = styled.div<{ $collapsed: boolean }>`
  height: 56px;
  border-bottom: 1px solid ${theme.colors.border};

  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  background-color: ${theme.colors.backgroundCard};
  margin-bottom: 1vw;
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

const Content = styled.main<{ $collapsed: boolean }>`
  flex: 1;
  padding: ${({ $collapsed }) => ($collapsed ? '1.6vw 7vw 1.6vw 7vw' : '1.6vw 4vw 1.6vw 3.5vw')};
  overflow-y: auto;
  color: ${theme.colors.textPrimary};
`;
