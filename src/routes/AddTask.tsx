import TaskForm from "../components/TaskForm";

const AddTask = ({ onStopAdding }: { onStopAdding: () => void }) => {

  return <TaskForm action="add" onModalClose={onStopAdding} />;
}

export default AddTask;