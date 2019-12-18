import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomLayout from '../app/repositories-monitor/components/CustomLayout';
import CommitList from '../app/repositories-monitor/components/CommitList';
import getRepository from '../app/repositories-monitor/services/repository'; // TODO change to repository ?
import { w3cwebsocket as W3CWebSocket } from 'websocket';
// import ReconnectingWebsocket from 'reconnecting-websocket'
import { updateRepository } from '../app/repositories-monitor/store/actions/repository'

const Home = (props) => {
  const options = {
    connectionTimeout: 40000,
    maxRetries: 10,
  };
  const websocketClient = new W3CWebSocket('ws://ce50e772.ngrok.io/ws/repository');
  useEffect(() => {
    // websocketClient.addEventListener("open", () => {
    //   console.log('open');
    // });

    // websocketClient.addEventListener("message", (event) => {
    //   const response = JSON.parse(event.data);
    //   // Update store

    //   if (response !== undefined && response.message != undefined) {
    //     props.updateRepository(response.message);
    //   }
    // });

    // websocketClient.addEventListener("close", () => {
    //   console.log('close');
    // });

    websocketClient.onopen = () => {
      console.log('open');
    };
  }, []);

  return (
    <CustomLayout>
      <CommitList websocketClient={websocketClient} />
    </CustomLayout>
  );
};

const mapDispatchToProps = {
  updateRepository
}
export default connect(null, mapDispatchToProps)(Home);
