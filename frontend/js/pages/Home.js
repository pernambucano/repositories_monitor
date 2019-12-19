import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomLayout from '../app/repositories-monitor/components/CustomLayout';
import Search from '../app/repositories-monitor/components/Search';
import CommitList from '../app/repositories-monitor/components/CommitList';
import getRepository from '../app/repositories-monitor/services/repository'; // TODO change to repository ?
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { updateRepository } from '../app/repositories-monitor/store/actions/repository'

const Home = (props) => {
  const websocketClient = new W3CWebSocket('ws://0bb4d975.ngrok.io/ws/repository');
  useEffect(() => {
    websocketClient.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      if (response !== undefined && response.message !== undefined && response.message.commits !== undefined) {
        props.updateRepository(response.message);
        // order it
      }
    });
  }, []);

  return (
    <CustomLayout>
      <Search websocketClient={websocketClient} />
      <CommitList />
    </CustomLayout>
  );
};

const mapDispatchToProps = {
  updateRepository
}
export default connect(null, mapDispatchToProps)(Home);
