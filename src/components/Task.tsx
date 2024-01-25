import { useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { deleteTask, selectTask, updateTask } from '../features/taskSlice'
import EditTask from '../routes/EditTask'

export type TaskItem = {
  id: string,
  title: string,
  description: string
  completed: boolean
}

const Task = ({
  id,
  title,
  description,
  completed
}: TaskItem) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const taskList = useAppSelector(selectTask)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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

  const handleCompleteTask = () => {
    const updatedData = {...task}
    updatedData.completed = !task.completed
    dispatch(updateTask(updatedData))
  }

  return (
    <>
      {isEditting && <EditTask onStopEditting={hideModal} taskData={task} />}
      <li className={`p-4 border-2 rounded-lg border-violet-500 mb-4 ${completed ? 'bg-gray-200' : 'hover:bg-amber-400'}`}>
        <div className="flex justify-between gap-4">
          <div className="w-1/12 flex">
            <input type="checkbox" className="hidden peer" id={`task-${id}-completion`} onClick={handleCompleteTask} defaultChecked={completed} />
            <label htmlFor={`task-${id}-completion`} className={`relative flex cursor-pointer before:rounded-full before:absolute before:left-0 before:flex before:h-6 before:w-6 before:items-center before:justify-center before:border-2 before:border-violet-500 ${completed ? "before:bg-violet-500 before:text-white before:content-['✓'] before:font-bold" : "before:bg-white before:content-['']"}`}
            >
            </label>
          </div>
          <div className="w-10/12">
            <h2 className={`font-bold text-lg uppercase ${completed ? 'line-through text-gray-500' : ''}`}>{title}</h2>
            <p className={`italic ${completed ? 'line-through text-gray-500' : ''}`}>{description}</p>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <Link to={`/task/${id}`} className="text-violet-500" title="See detail">
              <FaEye size={24} />
            </Link>
            <button className="text-violet-500" type="button" onClick={showModal} title="Edit">
              <FaEdit size={24} />
            </button>
            <button className="text-red-500" onClick={handleDeleteTask} title="Delete">
              <FaTrash size={24} />
            </button>
          </div>
        </div>
      </li>
    </>
  )
}

export default Task