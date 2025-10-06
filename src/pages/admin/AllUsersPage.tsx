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

// import { UserDto } from '../types/UserDto';
export type UserDto = {
  UserId: string;
  FullName: string;
  Email: string;
  TariffTitle: string;
  TariffEndDate: string; // UTC
};

export const AllUsersPage = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // 🔥 моковый запрос
        const mock: UserDto[] = [
          {
            UserId: '1',
            FullName: 'Алексей Козлов',
            Email: 'alexey.kozlov@example.com',
            TariffTitle: 'Стартер',
            TariffEndDate: '2024-02-01T00:00:00Z',
          },
          {
            UserId: '2',
            FullName: 'Анна Николаева',
            Email: 'anna.nikolaeva@example.com',
            TariffTitle: 'Премиум',
            TariffEndDate: '2026-02-15T00:00:00Z',
          },
        ];
        setUsers(mock);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns: ColumnsType<UserDto> = [
    {
      title: '№',
      render: (_, __, index) => index + 1,
      width: 80,
    },
    {
      title: 'ФИО',
      dataIndex: 'FullName',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
    },
    {
      title: 'Текущий план',
      dataIndex: 'TariffTitle',
    },
    {
      title: 'Статус',
      dataIndex: 'TariffEndDate',
      render: (date: string) => {
        const isExpired = dayjs(date).isBefore(dayjs());
        return (
          <StyledTag $isActive={!isExpired} $width="5vw">
            {!isExpired ? 'Активен' : 'Неактивен'}
          </StyledTag>
        );
      },
    },
    {
      title: 'Активен до',
      dataIndex: 'TariffEndDate',
    },
  ];

  return (
    <Wrapper>
      <TitleContainer>
        <Title>
          <UsergroupAddOutlined style={{ marginRight: '0.4vw' }} /> Список пользователей (
          {users.length})
        </Title>
        <Subtitle>Полная информация о пользователях системы</Subtitle>
      </TitleContainer>

      <PageCard>
        <Table<UserDto>
          dataSource={users}
          columns={columns}
          rowKey="UserId"
          loading={loading}
          pagination={false}
        />
      </PageCard>
    </Wrapper>
  );
};
