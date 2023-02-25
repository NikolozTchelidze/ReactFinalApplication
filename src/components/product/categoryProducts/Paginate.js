import { Pagination } from '@mui/material'
import React from 'react'

export const Paginate = ({currentPage,totalPages,changePage}) => {
  return <Pagination count={totalPages} page={Number(currentPage)} onChange={(_,value) => {changePage("page",value)}}/>
}

