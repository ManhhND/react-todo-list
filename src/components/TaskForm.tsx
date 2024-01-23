import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAppDispatch } from "../app/hook";
import { addTask, updateTask } from "../features/taskSlice";
import { TaskItem } from "../routes/TaskList";
import Modal from "./Modal";
import classes from './TaskForm.module.css';

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
        <form className={classes.form} onSubmit={handleSubmit}>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name='title' required onChange={handleTitleChange} defaultValue={taskData?.title} ref={titleRef} />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea id="description" name='description' required rows={3} onChange={handleDescriptionChange} defaultValue={taskData?.description} ref={descriptionRef} />
          </p>
          <p className={classes.actions}>
            <button type="button" onClick={onModalClose}>Cancel</button>
            <button>{action === 'post' ? 'Add' : 'Update'}</button>
          </p>
        </form>
      </Modal>
    </>
  )
}

export default TaskForm