import React, { useState, useEffect } from 'react';

import CustomLayout from '../app/repositories-monitor/components/CustomLayout';
import getRepository from '../app/repositories-monitor/services/repositories'; // TODO change to repository ?

const Home = () => {
  let [username, setUsername] = useState('');
  let [commits, setCommits] = useState('');
  useEffect(() => {
    getRepository()
      .then((res) => {
        console.log(res);
        setUsername(res.data.user);
        setCommits(res.data.commits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CustomLayout>
      <h1>you are authenticated</h1>
      {username} - {commits}
    </CustomLayout>
  );
};

export default Home;
