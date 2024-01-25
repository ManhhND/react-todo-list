import TaskForm from "./TaskForm";

const AddTask = ({
  onStopAdding
}: {
  onStopAdding: () => void
}) => {

  return <TaskForm action="create" onModalClose={onStopAdding} />;
}

export default AddTask;