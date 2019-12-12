import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, Avatar } from 'antd';

const Commit = (props) => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios('http://127.0.0.1:8000/api/', { method: 'GET' })
      .then((res) => {
        setCommits(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={commits}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.fullname}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  );
};

export default Commit;
