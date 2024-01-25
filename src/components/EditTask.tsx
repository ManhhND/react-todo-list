import { TaskItem } from "./Task";
import TaskForm from "./TaskForm";

const EditTask = ({
  onStopEditting,
  taskData
}: {
  onStopEditting: () => void,
  taskData: TaskItem
}) => {

  return <TaskForm action="update" onModalClose={onStopEditting} taskData={taskData} />
}

export default EditTask;