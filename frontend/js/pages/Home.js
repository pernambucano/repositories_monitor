import React, { useState, useEffect } from 'react';

import CustomLayout from '../app/repositories-monitor/components/CustomLayout';
import CommitList from '../app/repositories-monitor/components/CommitList';
import getRepository from '../app/repositories-monitor/services/repositories'; // TODO change to repository ?

const Home = () => {
  let [username, setUsername] = useState('');
  let [commits, setCommits] = useState([]);
  useEffect(() => {
    getRepository()
      .then((res) => {
        console.log(res);
        //setUsername(res.data.user);
        setCommits(commits.concat(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CustomLayout>
      <h1>you are authenticated, {username}</h1>
      <CommitList data={commits} />
    </CustomLayout>
  );
};

export default Home;
