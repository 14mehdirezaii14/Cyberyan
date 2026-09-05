// src/components/users/UserFilterBar.tsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import type { IUserQuery } from '@workspace/shared';


interface UserFilterBarProps {
  initialValues?: IUserQuery;
  onFilterChange: (query: IUserQuery) => void;
}

export const UserFilterBar: React.FC<UserFilterBarProps> = ({
  initialValues,
  onFilterChange,
}) => {
  const [search, setSearch] = useState(initialValues?.search || '');
  const [industry, setIndustry] = useState(initialValues?.industry || '');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onFilterChange({
      search: debouncedSearch || undefined,
      industry: industry || undefined,
      page: 1,
      limit: initialValues?.limit || 10,
    });
  }, [debouncedSearch, industry]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          جستجو (نام و عنوان شغلی)
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو کنید..."
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="w-full sm:w-64">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          فیلتر صنعت
        </label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">همه صنایع</option>
          <option value="IT">فناوری اطلاعات</option>
          <option value="Finance">مالی و بانکی</option>
          <option value="Education">آموزش</option>
        </select>
      </div>
    </div>
  );
};