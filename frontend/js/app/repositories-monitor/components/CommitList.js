import React from 'react';
import Commit from './Commit';

import { Table, Select } from 'antd';
import { Form, Icon, Input, Button } from 'antd';
const { Option } = Select;
const CommitList = ({ data }) => {
  const columns = [
    {
      title: 'sha',
      dataIndex: 'sha',
    },
    {
      title: 'message',
      dataIndex: 'message',
    },
    {
      title: 'repository',
      dataIndex: 'repository',
    },
    {
      title: 'date',
      dataIndex: 'date',
    },
  ];

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>); // TODO repositories of this user
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function handleOnSubmit(event) {
	  event.preventDefault()

    console.log('onSubmit' );
  }

  const new_data = data.map((d) => {
    return { ...d, key: d.sha };
  });
  return (
    <div>
      <Form style={{ width: '100%' }} onSubmit={handleOnSubmit}>
        <Form.Item>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            onChange={handleChange}
            tokenSeparators={[',']}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon="search">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={new_data} size="middle" />
    </div>
  );
};

export default CommitList;
