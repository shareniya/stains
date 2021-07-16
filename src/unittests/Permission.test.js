import React from 'react';
import ReactDOM from 'react-dom';
import Permission from '../components/Permission';

it('render without crashing', () =>{
  const div = document.createElement('div');
  ReactDOM.render(<Permission/>, div);
  ReactDOM.unmountComponentAtNode(div);
});