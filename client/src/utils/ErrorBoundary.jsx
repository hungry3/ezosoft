import  { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>
            {this.state.error.message ? (
              <span>Error: {this.state.error.message}</span>
            ) : (
              <span>We apologize for the inconvenience. Please try again later.</span>
            )}
          </p>
        </div>
      );
    }

    return this.props.children; 
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node,
};