import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomLayout from '../app/repositories-monitor/components/CustomLayout';
import Search from '../app/repositories-monitor/components/Search';
import CommitList from '../app/repositories-monitor/components/CommitList';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { updateRepository } from '../app/repositories-monitor/store/actions/repository'

const Home = (props) => {
  var ws_path = 'ws://' + window.location.host + "/ws/repository";
  const websocketClient = new W3CWebSocket(ws_path);
  useEffect(() => {
    websocketClient.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      if (response !== undefined && response.message !== undefined && response.message.commits !== undefined) {
        props.updateRepository(response.message);
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
