import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { theme } from '../assets/theme/theme';
import { LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useAdminStore } from '../store/adminStore';
import { AdminHeader } from '../components/admin/AdminHeader';
import { SidebarLink } from './layout';

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logoutAdmin } = useAdminStore();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = collapsed ? 'auto' : 'hidden';
    }
  }, [collapsed, isMobile]);

  return (
    <LayoutWrapper>
      {isMobile && !collapsed && <Overlay onClick={() => setCollapsed(true)} />}

      <Sidebar $collapsed={collapsed} $isMobile={isMobile}>
        <SidebarHeader $collapsed={collapsed} />
        <SidebarMenu $collapsed={collapsed}>
          <SidebarLink to="/admin/users">
            <UsergroupAddOutlined />
            All users
          </SidebarLink>
        </SidebarMenu>

        <SidebarFooter>
          {!collapsed && (
            <SidebarLink className="logout" to="/signin-admin" onClick={() => logoutAdmin()}>
              <LogoutOutlined /> Exit
            </SidebarLink>
          )}
        </SidebarFooter>
      </Sidebar>

      <Main>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content $collapsed={collapsed} $isMobile={isMobile}>
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
  position: relative;
`;

const Sidebar = styled.div<{ $collapsed: boolean; $isMobile: boolean }>`
  width: ${({ $collapsed, $isMobile }) => ($isMobile ? '210px' : $collapsed ? '20px' : '210px')};
  transition: all 0.3s ease;
  background: ${theme.colors.backgroundSidebar};
  border-right: 1px solid ${theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  z-index: 1000;
  overflow-y: auto;

  /* ✅ Исправление */
  height: 100vh;
  @supports (height: 100dvh) {
    height: 100dvh;
  }

  ${({ $isMobile, $collapsed }) =>
    $isMobile &&
    `
    position: fixed;
    top: 0;
    left: ${$collapsed ? '-210px' : '0'};
    box-shadow: ${$collapsed ? 'none' : '0 0 20px rgba(0,0,0,0.3)'};
    overscroll-behavior: contain; /* предотвратить прокрутку body */
  `}
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
  height: 100vh;
`;

const SidebarHeader = styled.div<{ $collapsed: boolean }>`
  height: 56px;
  border-bottom: 1px solid ${theme.colors.border};
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  background-color: ${theme.colors.backgroundCard};
  margin-bottom: 1vw;

  @media (max-width: 769px) {
    height: 14vw;
    margin-bottom: 3vw;
  }
`;

const SidebarMenu = styled.nav<{ $collapsed: boolean }>`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  flex-direction: column;
  flex: 1;
  padding: 0 0.5rem;

  @media (max-width: 769px) {
    padding: 0 3vw;
    height: fit-content;
  }
`;

const SidebarFooter = styled.div`
  padding: 0 0.5rem;
  font-size: 0.85rem;

  @media (max-width: 769px) {
    padding: 0 3vw;
    margin-bottom: 5vw;
    font-size: 3.4vw;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Content = styled.main<{ $collapsed: boolean; $isMobile: boolean }>`
  flex: 1;
  padding: ${({ $collapsed, $isMobile }) =>
    $isMobile ? '1.2rem 1rem' : $collapsed ? '1.6vw 7vw 1.6vw 7vw' : '1.6vw 4vw 1.6vw 3.5vw'};
  overflow-y: auto;
  color: ${theme.colors.textPrimary};
`;
