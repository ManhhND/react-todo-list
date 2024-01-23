import TaskForm from "../components/TaskForm";
import { TaskItem } from "./TaskList";

const EditTask = ({
  onStopEditting,
  taskData
}: {
  onStopEditting: () => void,
  taskData: TaskItem
}) => {

  return (
    <>
      <h1>Edit Task</h1>
      <TaskForm action="update" onModalClose={onStopEditting} taskData={taskData} />
    </>
  )
}

export default EditTask;