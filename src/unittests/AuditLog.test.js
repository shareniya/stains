import React from 'react';
import ReactDOM from 'react-dom';
import AuditLog from '../components/AuditLog';

it('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuditLog/>, div);
  ReactDOM.unmountComponentAtNode(div);
});