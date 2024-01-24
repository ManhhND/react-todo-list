import TaskForm from "../components/TaskForm";
import { TaskItem } from "./TaskList";

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