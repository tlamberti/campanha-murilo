import React, {useState} from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress
} from '@material-ui/core'

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'celular', label: 'Celular', minWidth: 100 },
  {
    id: 'escritopor',
    label: 'Escrito por',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'local',
    label: 'Local',
    minWidth: 170,
    align: 'right',
  },
];

export default function Tabela({ pessoas, isLoading }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {pessoas && 
        <>
          <TableContainer>
            {isLoading && <CircularProgress />}
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pessoas && pessoas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pessoa, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map(column => {
                        const value = pessoa[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={pessoas && pessoas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      }
    </>
  )
}
