import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './app/store.ts'
import './index.css'
import App from './routes/App.tsx'
import CompletedTaskList from './routes/CompletedTaskList.tsx'
import TaskDetail from './routes/TaskDetail.tsx'
import TaskList from './routes/TaskList.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TaskList />
      },
      {
        path: 'task/:id',
        element: <TaskDetail />
      },
      {
        path: 'completed-tasks',
        element: <CompletedTaskList />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
