import React from 'react';
import ReactDOM from 'react-dom';
import AdminDashboard from '../components/AdminDashboard';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdminDashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
});