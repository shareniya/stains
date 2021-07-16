import React, { Component } from 'react';

 class Error extends Component {

    state = { hasError: false };

    static getDerivedStateFromError() {
        // Update state to show the fallback UI during the next render phase
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // logging the error details
        console.log(`Cause: ${error}.\nStackTrace: ${info.componentStack}`);
    }

    render() {
        if (this.state.hasError) {
            // Return the fallback UI
            return <h5 style={{ 'text-align': 'center' }}>Opps!!! Unfortunately, something went wrong.We are working on getting this fixed as soon as possible.You may try again later.</h5>;
          
        }

        return this.props.children;
    }
    
    
}
export default Error;