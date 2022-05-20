import React from 'react';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const propTypes = {
  userList: PropTypes.array.isRequired,
};

const Board = (props) => {
  const { userList } = props;
  if (!userList) {
    return <div>Loading...</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((player) => (
            <TableRow
              key={player.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {player.username}
              </TableCell>
              <TableCell align="right">{player.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Board.propTypes = propTypes;

export default Board;
