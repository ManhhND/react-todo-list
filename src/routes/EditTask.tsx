import { TaskItem } from "../components/Task";
import TaskForm from "../components/TaskForm";

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