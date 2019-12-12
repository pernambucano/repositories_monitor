import React from 'react';
import Commit from './Commit';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const CommitList = (props) => {
  return (
    <div>
      {data.map((d) => (
        <Commit data={d} key={d.title} />
      ))}
    </div>
  );
};

export default CommitList;
