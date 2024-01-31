import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hook";
import { addTask, updateTask } from "../features/taskSlice";
import Modal from "./Modal";
import { TaskItem } from "./Task";

type FormErrors = {
  title?: string,
  description?: string,
  dueDate?: string
}

const TaskForm = ({
  action,
  onModalClose,
  taskData
}: {
  action: string,
  onModalClose: () => void,
  taskData?: TaskItem
}) => {
  const intialValues: TaskItem = {
    id: nanoid(),
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    completed: false
  };
  const [formValues, setFormValues] = useState<TaskItem>(intialValues)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch()
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const dueDateRef = useRef<HTMLInputElement>(null)
  const priorityRef = useRef<HTMLSelectElement>(null)
  const completionRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formStateData = {
      id: taskData?.id ? taskData.id : formValues.id,
      title: formValues.title ? formValues.title : titleRef.current?.value as string,
      description: formValues.description ? formValues.description : descriptionRef.current?.value as string,
      dueDate: formValues.dueDate ? formValues.dueDate : dueDateRef.current?.value as string,
      priority: formValues.priority ? formValues.priority : priorityRef.current?.value as string,
      completed: completionRef.current?.checked as boolean,
    }

    setFormErrors(validate(formStateData))
    setIsSubmitting(true)
  }

  const validate = (values: TaskItem) => {
    const errors: FormErrors = {}
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1);
    const inputDate = new Date(values.dueDate)

    if (!values.title) {
      errors.title = "title field is required"
    }
    if (!values.description) {
      errors.description = "description field is required"
    }
    if (tomorrow > inputDate) {
      errors.dueDate = "due date should be a day greater than today"
    }

    return errors;
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm()
    }
  }, [formErrors])

  const submitForm = () => {
    const formStateData = {
      id: taskData?.id ? taskData.id : formValues.id,
      title: formValues.title ? formValues.title : titleRef.current?.value as string,
      description: formValues.description ? formValues.description : descriptionRef.current?.value as string,
      dueDate: formValues.dueDate ? formValues.dueDate : dueDateRef.current?.value as string,
      priority: formValues.priority ? formValues.priority : priorityRef.current?.value as string,
      completed: completionRef.current?.checked as boolean,
    }
    if (action === 'create' && Object.keys(formErrors).length === 0) {
      dispatch(addTask(formStateData))
      navigate('/')
    }
    if (action === 'update' && taskData) {
      dispatch(updateTask(formStateData))
    }
    onModalClose()
  };

  return (
    <>
      <Modal onClose={onModalClose}>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-violet-500" htmlFor="title">Title</label>
            <input className="w-full p-2 border border-violet-500 rounded-md" type="text" id="title" name="title" onChange={handleFieldChange} defaultValue={taskData?.title} ref={titleRef} autoFocus />
            <span className="text-red-500 italic">{formErrors?.title}</span>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-violet-500" htmlFor="description">Description</label>
            <textarea className="block p-2 w-full border border-violet-500 rounded-md" id="description" name="description" rows={5} onChange={handleFieldChange} defaultValue={taskData?.description} ref={descriptionRef} />
            <span className="text-red-500 italic">{formErrors.description ?? formErrors.description}</span>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-violet-500" htmlFor="dueDate">Due Date</label>
            <input className="w-full p-2 border border-violet-500 rounded-md text-violet-500" type="date" id="dueDate" name="dueDate" onChange={handleFieldChange} defaultValue={taskData?.dueDate} ref={dueDateRef} />
            <span className="text-red-500 italic">{formErrors.dueDate ?? formErrors.dueDate}</span>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-violet-500" htmlFor="priority">Priority</label>
            <select name="priority" className="bg-gray-50 border border-violet-500 text-violet-500 mb-6 text-sm rounded-lg focus:ring-violet-700 focus:border-violet-700 block p-2.5" onChange={handleFieldChange} defaultValue={taskData ? taskData.priority : intialValues.priority} ref={priorityRef}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          {action === 'update' && <div className="mb-4">
            <input type="checkbox" className="hidden peer" id={`task-${taskData?.id}-completion`} ref={completionRef}defaultChecked={taskData?.completed} />
            <label
              htmlFor={`task-${taskData?.id}-completion`}
              className="relative flex cursor-pointer before:rounded-full pl-8
              before:absolute before:left-0 before:flex before:h-6 before:w-6
              before:items-center before:justify-center before:border-2
              before:border-violet-500 before:bg-white before:transition-[background-color]
              before:duration-300 before:ease-in before:content-['']
              peer-checked:before:text-violet-500 peer-checked:before:bg-violet-500 peer-checked:before:text-white
              peer-checked:before:content-['✓'] peer-checked:before:font-bold"
            >
              Mark as completed
            </label>
          </div>}
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