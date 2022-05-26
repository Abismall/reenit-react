import { useState, useEffect } from 'react';

import { getAllUsers } from '../../../api/requests';
import TextField from '@mui/material/TextField';

import Board from './board';

const ScoreBoard = () => {
  const [users, setUsers] = useState(null);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const userList = await getAllUsers();
    if (userList != null && userList.length > 0) {
      setUsers(userList);
    }
  };

  if (!users) {
    return <div>No users found</div>;
  }
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={(e) => setFilter(e.target.value)}
      />
      <Board userList={users} filter={filter} />
    </div>
  );
};

export default ScoreBoard;
