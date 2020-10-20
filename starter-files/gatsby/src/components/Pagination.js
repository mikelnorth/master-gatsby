import React from 'react';

export default function Pagination({
  perPage,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const toalPages = Math.ceil(tatalCount / perPage);

  return (
    <div>
      <Link to={`/${base}/${currentPage - 1}`} />
    </div>
  );
}
