import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hook';
import EditTask from '../components/EditTask';
import { deleteTask, selectTask } from '../features/taskSlice';

const TaskDetail = () => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const taskList = useAppSelector(selectTask)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const task = taskList.filter((task) => task.id === id)[0]

  const showModal = () => {
    setIsEditting(true)
  }

  const hideModal = () => {
    setIsEditting(false)
  }

  const handleDeleteTask = () => {
    dispatch(deleteTask(task))
    navigate('/')
  }

  return (
    <>
      {isEditting && <EditTask onStopEditting={hideModal} taskData={task} />}
      <article className="text-center lg:w-2/3 lg:mx-auto mb-10">
        <h2 className="mb-4 font-bold text-4xl uppercase">{task.title}</h2>
        <p className="italic">{task.description}</p>
        {/* <time>Due date: {task.date}</time> */}
      </article>
      <div className="flex gap-2 justify-center">
        <button className="p-4 rounded-md bg-violet-500 hover:bg-violet-600 text-white w-1/2 md:w-1/5" type="button" onClick={showModal}>Edit</button>
        <button className="p-4 rounded-md bg-red-500 hover:bg-red-600 text-white w-1/2 md:w-1/5" onClick={handleDeleteTask}>Delete</button>
      </div>
    </>
  )
}

export default TaskDetail