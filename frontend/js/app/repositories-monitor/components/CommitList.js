import React from 'react';
import Commit from './Commit';
import { connect } from 'react-redux';
import { initializeRepository } from '../store/actions/repository';

import { Form, Icon, Input, Button, Table, Select, Col, Row } from 'antd';
const { Option } = Select;
const CommitList = (props) => {
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

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    console.log('onSubmit');
  }

  return (
    <div>
      <Row>
        <Col span={18} offset={3}>
          <Form onSubmit={handleOnSubmit}>
            <Form.Item>
              <Select
                mode="tags"
                onChange={handleChange}
                tokenSeparators={[',']}
                placeholder="Digite aqui os repositórios"
                onSelect={(input) => {
                  const existsAlreadyOnState = props.repository.find((r) => r.repository == input);
                  if (!existsAlreadyOnState) {
                    props.initializeRepository(input);
                  }
                }}
                onDeselect={(input) => console.log(`onDeselect, ${input}`)}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row>
        <Table columns={columns} dataSource={props.repository} size="middle" />
      </Row>
    </div>
  );
};

const addKeyToCommitList = (commitList) => {
  return commitList.map((d) => {
    return { ...d, key: d.sha };
  });
};

const mapStateToProps = (state) => {
  const repository = addKeyToCommitList(state.repository);
  return {
    repository: repository,
  };
};
const mapDispatchToProps = {
  initializeRepository,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitList);
