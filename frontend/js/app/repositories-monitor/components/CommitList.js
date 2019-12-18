import React, { useEffect } from 'react';
import Commit from './Commit';
import { connect } from 'react-redux';
import { initializeRepository, updateRepository } from '../store/actions/repository';
import { hideRepositoryData, showRepositoryData } from '../store/actions/visibilityFilter';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import { Form, Icon, Input, Button, Table, Select, Col, Row } from 'antd';
const { Option } = Select;
const CommitList = (props) => {
  const client = new W3CWebSocket('ws://localhost:8000/ws/repository');

  client.onopen = () => {
    console.log('connected');
  };

  client.onmessage = (event) => {
    const response = JSON.parse(event.data);
    // Update store

    if (response !== undefined && response.message != undefined) {
      props.updateRepository(response.message);
    }
  };

  client.onclose = () => {
    console.log('closed');
  };

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

  const sendMessage = () => {
    client.send(
      JSON.stringify({ command: 'send', repo: 'pernambucano/catinabox', message: 'hello world' })
    );
  };
  const addRepo = () => { };
  const removeRepo = () => {
    client.send(JSON.stringify({ command: 'remove', repo: 'pernambucano/catinabox' }));
  };

  return (
    <div>
      <Row>
        <Col span={18} offset={3}>
          <Form>
            <Form.Item>
              <Select
                mode="tags"
                tokenSeparators={[',']}
                placeholder="Digite aqui os repositórios no formato organização/repositório"
                onSelect={(input) => {
                  const existsAlreadyOnState = props.originalCommitList.find(
                    (r) => r.repository == input
                  );
                  if (!existsAlreadyOnState) {
                    // TODO how to verify if this item is useful ?
                    client.send(JSON.stringify({ command: 'add', repo: input }));
                    props.initializeRepository(input);
                  } else {
                    props.showRepositoryData(input);
                  }
                }}
                onDeselect={(input) => {
                  props.hideRepositoryData(input);
                }}
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

const filterData = (commitList, deselectedItems) => {
  const listWithKeys = commitList.map((d) => {
    return { ...d, key: d.sha };
  });

  if (deselectedItems.length > 0) {
    return listWithKeys.filter((f) => !deselectedItems.includes(f.repository));
  } else {
    return listWithKeys;
  }
};

const mapStateToProps = (state) => {
  const filteredCommitList = filterData(state.repository, state.visibilityFilter);
  return {
    repository: filteredCommitList,
    originalCommitList: state.repository,
  };
};
const mapDispatchToProps = {
  initializeRepository,
  updateRepository,
  hideRepositoryData,
  showRepositoryData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitList);
