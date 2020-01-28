import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = {
    error: null,
    errorInfo: null,
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  
  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong and was caught with an Error Boundary</h2>
          <details>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}>{this.state.errorInfo.componentStack}</p>
          </details>
        </div>
      );
    }
    return this.props.children;
  }  
}