import { useState } from 'react';
import { MdAddTask } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hook';
import Task from '../components/Task';
import { selectTask } from '../features/taskSlice';
import AddTask from './AddTask';
import classes from './TaskList.module.css';

export type TaskItem = {
  id: string,
  title: string,
  description: string
}

const TaskList = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const taskList = useAppSelector(selectTask)

  const showModal = () => {
    setIsAdding(true)
  }

  const hideModal = () => {
    setIsAdding(false)
  }

  return (
    <>
      <Outlet />
      <div>
        <p>
          <button className={classes.button} onClick={showModal}>
            <MdAddTask size={18} />
            New Task
          </button>
        </p>
        {isAdding && <AddTask onStopAdding={hideModal} />}
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
      </div>
    </>
  )
}

export default TaskList