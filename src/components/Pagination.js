import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  pageSize, 
  totalElements, 
  onPageChange, 
  onPageSizeChange 
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>
          Mostrando {startItem} - {endItem} de {totalElements} elementos
        </span>
        
        <div className="page-size-selector">
          <label htmlFor="pageSize">Elementos por página:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="pagination-controls">
        <button
          className="btn btn-pagination"
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          title="Primera página"
        >
          ⟪
        </button>
        
        <button
          className="btn btn-pagination"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          title="Página anterior"
        >
          ⟨
        </button>

        {pageNumbers.map(page => (
          <button
            key={page}
            className={`btn btn-pagination ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </button>
        ))}

        <button
          className="btn btn-pagination"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          title="Página siguiente"
        >
          ⟩
        </button>
        
        <button
          className="btn btn-pagination"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
          title="Última página"
        >
          ⟫
        </button>
      </div>
    </div>
  );
};

export default Pagination;