import { useState } from 'react';
import { MdAddTask } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hook';
import AddTask from '../components/AddTask';
import Task, { TaskItem } from '../components/Task';
import { selectTask } from '../features/taskSlice';

const CompletedTaskList = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const taskList = useAppSelector(selectTask)
  const completedTaskList = taskList.filter((task) => task.completed)

  const showModal = () => {
    setIsAdding(true)
  }

  const hideModal = () => {
    setIsAdding(false)
  }

  return (
    <>
      <Outlet />
      <div className="mb-4 float-right">
        <button className="border border-violet-500 rounded-lg p-4 flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white" onClick={showModal}>
          <MdAddTask size={18} />
          New Task
        </button>
      </div>
      <div className="clear-both"></div>
      {isAdding && <AddTask onStopAdding={hideModal} />}
      {completedTaskList.length > 0 ?
      <ul>
        {completedTaskList.map((task: TaskItem) => <Task {...task} key={`task-${task.id}`} />)}
      </ul>
      :
      <div className="text-center">
        <h2 className="text-violet-500">There are no tasks completed. Let's get some!</h2>
      </div>
      }
    </>
  )
}

export default CompletedTaskList