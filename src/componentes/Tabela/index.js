import React, {useState} from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import './style.css';

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'celular', label: 'Celular', minWidth: 150 },
  { id: 'escritopor', label: 'Escrito por', minWidth: 170 },
  { id: 'local', label: 'Local', minWidth: 170 },
];

export default function Tabela({ pessoas, removePessoa, isLoading, user }) {

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
      {user.email === 'adm@campanhamurilo.com' && pessoas && 
        <div className="tabela">
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
                  <TableCell>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pessoas && pessoas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pessoa, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map(column => {
                        const value = pessoa[column.id];
                        return (
                          <>
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          </>
                        );
                      })}
                      <TableCell>
                        <IconButton onClick={() => removePessoa(pessoa.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
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
            labelRowsPerPage=''
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      }
    </>
  )
}
