import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { deleteTask, selectTask } from '../features/taskSlice';
import EditTask from './EditTask';

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
      <h1>Task Detail page</h1>
      <article className=''>
        <p>Title: {task.title}</p>
        <p>Description: {task.description}</p>
        <menu className=''>
          <button type='button' onClick={showModal}>Edit</button>
          <button onClick={handleDeleteTask}>Delete</button>
        </menu>
      </article>
    </>
  )
}

export default TaskDetail