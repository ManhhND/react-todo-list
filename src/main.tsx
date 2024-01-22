import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './app/store.ts'
import './index.css'
import AddTask from './routes/AddTask.tsx'
import App from './routes/App.tsx'
import TaskList from './routes/TaskList.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TaskList />,
        children: [
          {
            path: '/create-task',
            element: <AddTask />,
          }
        ]
      },
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
