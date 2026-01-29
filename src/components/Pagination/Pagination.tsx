// import { useState } from 'react';
// import css from './Pagination.module.css'
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    pageCount: number,
    onPageChange: (pageCount: number) => void,
}

export default function Pagination({ pageCount, onPageChange }: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={event => onPageChange(event.selected + 1)}
        />
    )
}