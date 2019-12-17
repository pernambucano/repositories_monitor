import React, { useEffect } from 'react';
import Commit from './Commit';
import { connect } from 'react-redux';
import { initializeRepository } from '../store/actions/repository';
import { hideRepositoryData, showRepositoryData } from '../store/actions/visibilityFilter';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import { Form, Icon, Input, Button, Table, Select, Col, Row } from 'antd';
const { Option } = Select;
const CommitList = (props) => {
  const client = new W3CWebSocket('ws://localhost:8000/ws/repository');
  useEffect(() => {
    client.onopen = () => {
      console.log('connected');
    };

    client.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('message received ' + message);
    };

    client.onclose = () => {
      console.log('closed');
    };
  }, []);

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
  const addRepo = () => {
    client.send(JSON.stringify({ command: 'add', repo: 'pernambucano/catinabox' }));
  };
  const removeRepo = () => {
    client.send(JSON.stringify({ command: 'remove', repo: 'pernambucano/catinabox' }));
  };

  return (
    <div>
      <button onClick={sendMessage}>Send MSG</button>
      <button onClick={addRepo}>Add Repo</button>
      <button onClick={removeRepo}>Remove Repo</button>
      <Row>
        <Col span={18} offset={3}>
          <Form>
            <Form.Item>
              <Select
                mode="tags"
                tokenSeparators={[',']}
                placeholder="Digite aqui os repositórios no formato organização/repositorio"
                onSelect={(input) => {
                  const existsAlreadyOnState = props.originalCommitList.find(
                    (r) => r.repository == input
                  );
                  if (!existsAlreadyOnState) {
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
  hideRepositoryData,
  showRepositoryData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitList);
