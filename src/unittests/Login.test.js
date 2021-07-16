import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login';

it('render without crashing', () =>{
  const div = document.createElement('div');
  ReactDOM.render(<Login/>, div);
  ReactDOM.unmountComponentAtNode(div);
});