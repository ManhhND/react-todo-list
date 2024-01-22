import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hook';
import Task from '../components/Task';
import { selectTask } from '../features/taskSlice';
import classes from './TaskList.module.css';

export type TaskItem = {
  id: string,
  title: string,
  description: string
}

const TaskList = () => {
  const taskList = useAppSelector(selectTask)

  return (
    <>
      <Outlet />
      <main>
        {/* <Task id={1} title="First task" description="Reprehenderit magna Lorem dolor sint adipisicing!" />
        <Task id={2} title="Second task" description="Enim sit eu id." />
        <Task id={3} title="Third task" description="Ad amet ex ipsum tempor proident mollit culpa consectetur." /> */}
        {taskList.length > 0 && (
          <ul className={classes.tasks}>
            {taskList.map((task: TaskItem) => <Task id={task.id} title={task?.title} description={task?.description} key={`task-${task.id}`} />)}
          </ul>
        )}
        {taskList.length === 0 && (
          <div className="text-center text-white">
            <h2>There are no tasks. Let's add some!</h2>
          </div>
        )}
      </main>
    </>
  )
}

export default TaskList