import React from 'react';
import Commits from './Commits';

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
		<Commits data={data}/>
	);
}

export default CommitList;
