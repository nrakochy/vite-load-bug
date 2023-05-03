import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error: ", error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="ErrorBoundary__container">
          <h3 className="ErrorBoundary__title">Sorry... there was an error.</h3>
          <button
            className="ErrorBoundary__button"
            type="button"
            onClick={() => window.location.reload()}
          >
            Reload the page
          </button>
          <button
            className="ErrorBoundary__button"
            type="button"
            onClick={() => window.location.replace("/")}
          >
            Back to home page
          </button>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
