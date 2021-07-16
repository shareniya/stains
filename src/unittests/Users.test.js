import React from 'react';
import ReactDOM from 'react-dom';
import Users from '../components/Users';

it('render without crashing', () =>{
  const div = document.createElement('div');
  ReactDOM.render(<Users/>, div);
  ReactDOM.unmountComponentAtNode(div);
});