import React from 'react';
import ReactDOM from 'react-dom';
import Apps from '../components/apps';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Apps />, div);
    ReactDOM.unmountComponentAtNode(div);
});