import React, { useState, useEffect } from 'react';

import CustomLayout from '../app/repositories-monitor/components/CustomLayout';
import CommitList from '../app/repositories-monitor/components/CommitList';
import getRepository from '../app/repositories-monitor/services/repository'; // TODO change to repository ?

const Home = () => {

  return (
    <CustomLayout>
      <CommitList />
    </CustomLayout>
  );
};

export default Home;
