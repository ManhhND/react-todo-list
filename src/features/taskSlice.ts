import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { TaskItem } from '../components/Task'

// Define a type for the slice state
export interface TaskState {
  tasks: TaskItem[]
}

// Define the initial state using that type
const initialState: TaskState = {
  tasks: []
}

export const taskSlice = createSlice({
  name: 'task',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addTask: (state, action: PayloadAction<TaskItem>) => {
      state.tasks = [action.payload, ...state.tasks]
    },

    updateTask: (state, action: PayloadAction<TaskItem>) => {
      state.tasks = state.tasks.map((task) => 
        task.id === action.payload.id ? {
          ...task,
          title: action.payload.title,
          description: action.payload.description,
          dueDate: action.payload.dueDate,
          completed: action.payload.completed
        } : task
      )
      state.tasks = [...state.tasks.filter((task) => !task.completed), ...state.tasks.filter((task) => task.completed)]
    },

    deleteTask: (state, action: PayloadAction<TaskItem>) => {
      state.tasks = state.tasks.filter((task: TaskItem) => task.id !== action.payload.id)
    }
  }
})

export const { addTask, updateTask, deleteTask } = taskSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTask = (state: RootState) => state.todo.tasks

export default taskSlice.reducer