import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';
import { theme } from '../assets/theme/theme';
import { CreditCardOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store/authStore';
import { UserHeader } from '../components/UserHeader';

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout, user } = useAuthStore();

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
            My profile
          </SidebarLink>
          <SidebarLink to="/tariffs">
            <CreditCardOutlined />
            Available tariffs
          </SidebarLink>
          <SidebarLink to="/my-tariffs">
            <KeyOutlined />
            My tariffs
          </SidebarLink>
        </SidebarMenu>

        <SidebarFooter>
          {!collapsed && (
            <SidebarLink className="logout" to="/signin" onClick={() => logout()}>
              <LogoutOutlined /> Exit
            </SidebarLink>
          )}
        </SidebarFooter>
      </Sidebar>

      <Main>
        <UserHeader collapsed={collapsed} setCollapsed={setCollapsed} isMobile={isMobile} />
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
  width: ${({ $collapsed, $isMobile }) => ($isMobile ? '340px' : $collapsed ? '20px' : '240px')};
  transition: all 0.3s ease;
  background: ${theme.colors.backgroundSidebar};
  border-right: 1px solid ${theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  z-index: 1000;

  ${({ $isMobile, $collapsed }) =>
    $isMobile &&
    `
    position: fixed;
    top: 0;
    left: ${$collapsed ? '-340px' : '0'};
    height: 100vh;
    box-shadow: ${$collapsed ? 'none' : '0 0 20px rgba(0,0,0,0.3)'};
  `}
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
`;

const SidebarHeader = styled.div<{ $collapsed: boolean }>`
  padding: 0 0.84vw;
  margin-bottom: 1.6vw;
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  align-items: center;
  gap: 0.84vw;
  @media (max-width: 769px) {
    font-size: 4vw;
    padding: 0 4vw;
    margin-bottom: 3.2vw;
    gap: 3.2vw;
  }
`;

const SidebarMenu = styled.nav<{ $collapsed: boolean }>`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  flex-direction: column;
  flex: 1;
  padding: 0 0.5rem;
  @media (max-width: 769px) {
    padding: 0 1rem 0 1rem;
  }
`;

export const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.4vw;
  padding: 0.64vw 1.06vw;
  margin: 0.28vw 0;
  border-radius: 0.4vw;
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.94vw;
  font-weight: ${theme.fonts.fontWeightMedium};

  &.logout {
    border: 1px solid ${theme.colors.sideBarActivebg};
  }

  &.active {
    background: ${theme.colors.sideBarBrandActivebg};
    color: ${theme.colors.textPrimary};
  }

  &:hover {
    background: ${theme.colors.brandPrimaryTransparent};
    color: ${theme.colors.textPrimary};
  }
  @media (max-width: 769px) {
    padding: 2.28vw 4vw;
    margin: 0.84vw 0;
    border-radius: 1.2vw;
    font-size: 3.75vw;
    gap: 1.8vw;
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
  position: relative;
`;

const Content = styled.main<{ $collapsed: boolean; $isMobile: boolean }>`
  flex: 1;
  padding: ${({ $collapsed, $isMobile }) =>
    $isMobile ? '1.2rem 1rem' : $collapsed ? '1.6vw 7vw 1.6vw 7vw' : '1.6vw 4vw 1.6vw 3.5vw'};
  overflow-y: auto;
  color: ${theme.colors.textPrimary};
`;
