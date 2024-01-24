import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAppDispatch } from "../app/hook";
import { addTask, updateTask } from "../features/taskSlice";
import { TaskItem } from "../routes/TaskList";
import Modal from "./Modal";

const TaskForm = ({
  action,
  onModalClose,
  taskData
}: {
  action: string,
  onModalClose: () => void,
  taskData?: TaskItem
}) => {
  const [enteredTitle, setEnteredTitle] = useState<string>('')
  const [enteredDescription, setEnteredDescription] = useState<string>('')
  const dispatch = useAppDispatch()
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredDescription(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedData = {
      id: Math.round(Math.random() * 10000).toString(),
      title: enteredTitle,
      description: enteredDescription
    }
    if (action === 'add') {
      dispatch(addTask(submittedData))
    }
    if (action === 'update' && taskData) {
      submittedData.id = taskData.id
      submittedData.title = titleRef.current?.value as string
      submittedData.description = descriptionRef.current?.value as string
      dispatch(updateTask(submittedData))
    }
    onModalClose()
  }
  return (
    <>
      <Modal onClose={onModalClose}>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-violet-500" htmlFor="title">Title</label>
            <input className="w-full p-2 border border-violet-500 rounded-md" type="text" id="title" name='title' required onChange={handleTitleChange} defaultValue={taskData?.title} ref={titleRef} />
          </div>
          <div className="mb-4">
            <label className="text-violet-500" htmlFor="description">Description</label>
            <textarea className="block p-2 w-full border border-violet-500 rounded-md" id="description" name='description' required rows={5} onChange={handleDescriptionChange} defaultValue={taskData?.description} ref={descriptionRef} />
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            <button className="p-4 rounded-md hover:bg-black/[0.1] w-1/2 text-violet-500" type="button" onClick={onModalClose}>Cancel</button>
            <button className="p-4 rounded-md bg-violet-500 hover:bg-violet-600 text-white w-1/2">{action === 'create' ? 'Create' : 'Update'}</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default TaskForm