import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import './styles.less';

const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();
  
  let errorMessage: string;
  
  if (isRouteErrorResponse(error)) {
    // 如果是路由错误
    errorMessage = `${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    // 如果是普通错误
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    // 如果是字符串
    errorMessage = error;
  } else {
    // 其他情况
    errorMessage = 'Unknown error occurred';
  }

  return (
    <div className="route-error-container">
      <h2 className="route-error-title">Oops! Something went wrong</h2>
      <p className="route-error-message">{errorMessage}</p>
      <button 
        onClick={() => window.location.href = '/'}
        className="route-error-button"
      >
        Go to Home
      </button>
    </div>
  );
};

export default RouteErrorBoundary;
