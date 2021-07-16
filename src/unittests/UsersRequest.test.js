import React from 'react';
import ReactDOM from 'react-dom';
import UsersRequest from '../components/UsersRequest';

it('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersRequest/>, div);
  ReactDOM.unmountComponentAtNode(div);
});