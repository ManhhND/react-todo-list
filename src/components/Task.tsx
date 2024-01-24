import { useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { deleteTask, selectTask } from '../features/taskSlice'
import EditTask from '../routes/EditTask'

const Task = ({
  id,
  title,
  description
}: {
  id: string,
  title: string,
  description: string
}) => {
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

  return (
    <>
      {isEditting && <EditTask onStopEditting={hideModal} taskData={task} />}
      <li className="p-4 border-2 rounded-lg border-violet-500 mb-4 hover:bg-amber-400">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-lg uppercase">{title}</h2>
            <p className="italic">{description}</p>
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