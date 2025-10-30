import { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  PageCard,
  Subtitle,
  Title,
  TitleContainer,
  Wrapper,
} from '../mainPages/ProfilePage/ProfilePage';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { StyledTag } from '../../components/CardMyPlan';
import { getUserInfo } from '../../api/admin';
import type { IUserDto } from '../../dto/admin';
import { useAdminStore } from '../../store/adminStore';
import styled from 'styled-components';

const MobileUserCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const MobileUserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 8px;
`;

const MobileUserNumber = styled.div`
  background: #f0f0f0;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  flex-shrink: 0;
`;

const MobileUserName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  flex: 1;
  word-break: break-word;
`;

const MobileUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MobileInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const MobileInfoLabel = styled.span`
  font-size: 13px;
  color: #666;
  flex-shrink: 0;
`;

const MobileInfoValue = styled.span`
  font-size: 13px;
  color: #000;
  text-align: right;
  word-break: break-word;
  flex: 1;
`;

const ResponsiveWrapper = styled.div`
  .desktop-table {
    display: block;
  }

  .mobile-list {
    display: none;
  }

  @media (max-width: 769px) {
    .desktop-table {
      display: none;
    }

    .mobile-list {
      display: block;
    }
  }
`;

const MobileTitle = styled(Title)`
  @media (max-width: 769px) {
    font-size: 20px;

    .anticon {
      margin-right: 8px !important;
    }
  }
`;

const MobileSubtitle = styled(Subtitle)`
  @media (max-width: 769px) {
    font-size: 14px;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
`;

export const AllUsersPage = () => {
  const { setUsers, users } = useAdminStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getUserInfo();
        setUsers(res);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [setUsers]);

  const columns: ColumnsType<IUserDto> = [
    {
      title: '№',
      render: (_, __, index) => index + 1,
      width: 80,
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',
      render: (text) => text || '—',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text) => text || '—',
    },
    {
      title: 'Current plan',
      dataIndex: 'tariffTitle',
      render: (text) => text || '—',
    },
    {
      title: 'Status',
      dataIndex: 'tariffEndDate',
      render: (date?: string) => {
        const isActive = dayjs(date).isAfter(dayjs(), 'day') || dayjs(date).isSame(dayjs(), 'day');

        return (
          <StyledTag $isActive={isActive} $width="5vw">
            {isActive ? 'Active' : 'Inactive'}
          </StyledTag>
        );
      },
    },
    {
      title: 'Active until',
      dataIndex: 'tariffEndDate',
      render: (date?: string) => (date ? dayjs(date).format('DD.MM.YYYY') : '—'),
    },
  ];

  const renderMobileView = () => {
    if (loading) {
      return <LoadingText>Loading...</LoadingText>;
    }

    if (users.length === 0) {
      return <EmptyText>No users found</EmptyText>;
    }

    return users.map((user, index) => {
      const isActive =
        dayjs(user.tariffEndDate).isAfter(dayjs(), 'day') ||
        dayjs(user.tariffEndDate).isSame(dayjs(), 'day');

      return (
        <MobileUserCard key={user.id}>
          <MobileUserHeader>
            <MobileUserNumber>#{index + 1}</MobileUserNumber>
            <MobileUserName>{user.fullName || '—'}</MobileUserName>
            <StyledTag $isActive={isActive} $width="auto" style={{ flexShrink: 0 }}>
              {isActive ? 'Active' : 'Inactive'}
            </StyledTag>
          </MobileUserHeader>

          <MobileUserInfo>
            <MobileInfoRow>
              <MobileInfoLabel>Email:</MobileInfoLabel>
              <MobileInfoValue>{user.email || '—'}</MobileInfoValue>
            </MobileInfoRow>

            <MobileInfoRow>
              <MobileInfoLabel>Current plan:</MobileInfoLabel>
              <MobileInfoValue>{user.tariffTitle || '—'}</MobileInfoValue>
            </MobileInfoRow>

            <MobileInfoRow>
              <MobileInfoLabel>Active until:</MobileInfoLabel>
              <MobileInfoValue>
                {user.tariffEndDate ? dayjs(user.tariffEndDate).format('DD.MM.YYYY') : '—'}
              </MobileInfoValue>
            </MobileInfoRow>
          </MobileUserInfo>
        </MobileUserCard>
      );
    });
  };

  return (
    <Wrapper>
      <TitleContainer>
        <MobileTitle>
          <UsergroupAddOutlined style={{ marginRight: '0.4vw' }} /> User list ({users.length})
        </MobileTitle>
        <MobileSubtitle>Complete information about system users</MobileSubtitle>
      </TitleContainer>

      <PageCard>
        <ResponsiveWrapper>
          <div className="desktop-table">
            <Table<IUserDto>
              dataSource={users}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={false}
            />
          </div>

          <div className="mobile-list">{renderMobileView()}</div>
        </ResponsiveWrapper>
      </PageCard>
    </Wrapper>
  );
};
