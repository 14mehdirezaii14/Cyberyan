// src/pages/UsersPage.tsx
import React from 'react';
import './index.css';
import { useUsersPage } from '../../hooks/useUsersPage';
import { formatIndustry, formatJobTitle } from '../../utils/userFormatter';
import { IndustryEnum, type IUser } from '@workspace/shared';

export const UsersPage: React.FC = () => {
  const {
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
  } = useUsersPage();

  return (
    <div className="users-container">
      <h1 className="users-title">مدیریت کاربران</h1>

      <div className="filter-bar">
        <div className="filter-group">
          <label className="filter-label">جستجو (نام و عنوان شغلی)</label>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="جستجو کنید..."
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">فیلتر صنعت</label>
          <select value={industry} onChange={handleIndustryChange} className="filter-select">
            <option value="">همه صنایع</option>
            {Object.values(IndustryEnum).map((ind) => (
              <option key={ind} value={ind}>
                {ind.charAt(0).toUpperCase() + ind.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-card">
        {loading && <div className="state-message">در حال بارگذاری اطلاعات...</div>}
        {error && <div className="state-message state-error">خطا: {error}</div>}

        {!loading && !error && data && (
          <>
            <div className="table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>نام کاربر</th>
                    <th>عنوان شغلی</th>
                    <th>صنعت</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((user: IUser) => (
                      <tr key={user._id}>
                        <td>{user.first_name}</td>
                        <td>{formatJobTitle(user.job_title)}</td>
                        <td>{formatIndustry(user.industry)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="state-message">
                        کاربری یافت نشد.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                disabled={page <= 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="btn"
              >
                صفحه قبل
              </button>
              <span className="page-info">صفحه {page}</span>
              <button
                disabled={data.length < limit}
                onClick={() => setPage((prev) => prev + 1)}
                className="btn"
              >
                صفحه بعد
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};