import React, { useState, useEffect } from 'react';

import CustomLayout from '../app/repositories-monitor/components/CustomLayout';
import CommitList from '../app/repositories-monitor/components/CommitList';
import getRepository from '../app/repositories-monitor/services/repository'; // TODO change to repository ?

const Home = () => {
  let [username, setUsername] = useState('');
  let [commits, setCommits] = useState([]);

  return (
    <CustomLayout>
      <h1>you are authenticated, {username}</h1>
      <CommitList />
    </CustomLayout>
  );
};

export default Home;
