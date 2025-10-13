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

  return (
    <Wrapper>
      <TitleContainer>
        <Title>
          <UsergroupAddOutlined style={{ marginRight: '0.4vw' }} /> User list ({users.length})
        </Title>
        <Subtitle>Complete information about system users</Subtitle>
      </TitleContainer>

      <PageCard>
        <Table<IUserDto>
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </PageCard>
    </Wrapper>
  );
};
