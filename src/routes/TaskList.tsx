import Task from "../components/Task"

const TaskList = () => {

  return (
    <>
      <main>
        <Task id={1} title="First task" description="Reprehenderit magna Lorem dolor sint adipisicing!" />
        <Task id={2} title="Second task" description="Enim sit eu id." />
        <Task id={3} title="Third task" description="Ad amet ex ipsum tempor proident mollit culpa consectetur." />
      </main>
    </>
  )
}

export default TaskList