import './Pagination.scss'
import { useState, FC } from 'react';
import {Link} from "react-router-dom";


interface IPagination {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange?: (pageNumber: number) => void;
    pageUrl?: string
}

const Pagination:FC<IPagination> = ({
                                        totalItems,
                                        itemsPerPage,
                                        currentPage=1,
                                        onPageChange = () => {},
                                        pageUrl = ''
                                    }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber <= totalPages && pageNumber >= 1) {
            onPageChange(pageNumber);
        }
    };

    const renderPaginationItems = () => {
        const paginationItems = [];
        const range = 3; // Определяет количество страниц слева и справа от текущей страницы

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                (i > currentPage - range && i < currentPage + range) ||
                i === totalPages
            ) {
                paginationItems.push(
                    <li key={i} className={currentPage === i ? 'active' : ''}>
                        <Link to={`${pageUrl}/page/${i}`} onClick={() => handlePageChange(i)}>{i}</Link>
                    </li>,
                );
            }
        }
        return paginationItems.length > 1 ? paginationItems : [];
    };

    if (totalPages <= 1) return <></>;
    return (
        <ul className="pagination">
            {renderPaginationItems()}
        </ul>
    );
};

export default Pagination;