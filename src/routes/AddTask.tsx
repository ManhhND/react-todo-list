import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hook';
import Modal from '../components/Modal';
import { addTask } from '../features/taskSlice';
import classes from './AddTask.module.css';

const AddTask = () => {
  const [enteredTitle, setEnteredTitle] = useState<string>('')
  const [enteredDescription, setEnteredDescription] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
    dispatch(addTask(submittedData))
    navigate('/')
  }

  return (
    <>
      <Modal>
        <form className={classes.form} onSubmit={handleSubmit}>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name='title' required onChange={handleTitleChange} />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea id="description" name='description' required rows={3} onChange={handleDescriptionChange} />
          </p>
          <p className={classes.actions}>
            <Link type='button' to='/'>Cancel</Link>
            <button>Add</button>
          </p>
        </form>
      </Modal>
    </>
  );
}

export default AddTask;