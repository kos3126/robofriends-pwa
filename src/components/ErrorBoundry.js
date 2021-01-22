import React, { Component } from "react";

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError()はエラーがスローされたあとにフォールバックUIをレンター
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /*
  /// componentDidCatch()はエラー情報をログに記録するために使用
  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  } でも動作する
  */

  render() {
    if (this.state.hasError) {
      return <h1>Oooops. That is not good</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
