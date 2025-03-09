import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import RouteErrorBoundary from '../components/routeError';

// 不使用代码分割，直接导入组件
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'detail',
        element: <Detail />,
      },
    ],
  },
]); 