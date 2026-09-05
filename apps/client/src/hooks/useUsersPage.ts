// src/hooks/useUsersPage.ts
import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/userService';
import { useDebounce } from './useDebounce';
import type { IUser, IUserQuery } from '@workspace/shared';

export const useUsersPage = () => {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const debouncedSearch = useDebounce(search, 500);

  const [data, setData] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryPayload: IUserQuery = {
      page,
      limit,
      search: debouncedSearch || undefined,
      industry: industry || undefined,
    };

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchUsers(queryPayload);
        setData(result.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err?.message || 'خطای ناشناخته');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [debouncedSearch, industry, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIndustry(e.target.value);
    setPage(1);
  };

  return {
    search,
    industry,
    page,
    limit,
    data,
    loading,
    error,
    setPage,
    handleSearchChange,
    handleIndustryChange,
  };
};