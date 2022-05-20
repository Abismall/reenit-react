import { useState, useEffect } from 'react';

import { getAllUsers } from '../../api/requests';

import Board from './board';

const ScoreBoard = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  if (!users) {
    return <div>No users found</div>;
  }
  return (
    <div>
      <Board userList={users} />
    </div>
  );
};

export default ScoreBoard;
