# Live Preview
https://react-todo-list-xi-one.vercel.app/

# Local setup

Clone this repo:
```
git clone https://github.com/ffw-manh-nguyen/react-todo-list.git
```
Go to project:
```
cd react-todo-list
```
Install packages (node version >= 18):
```
npm install
```
Start project:
```
npm run dev
```

# About this project
- A todo list app built with React.js, Typescript and Tailwind CSS
- It has CRUD operations
- It has 3 routes:
  - Homepage `/`: displays todo list with all tasks, has a button to trigger add task modal and a link navigate to completed tasks page
  - Task detail `/task/{id}`: displays task information with 2 buttons for `Edit` and `Delete` operation
  - Completed tasks page `/completed-tasks`: has same layout with homepage, displays all tasks that marked as completed
- Task ID is generated randomly using JS `Math.random()` function
- Using Redux to manage and centralize global task's state
- Icons brought you by React icons library
- This project doesn't have backend, which means all contents created will be lost after page refresh

# References
- Vite (https://vitejs.dev/)
- React.js (https://react.dev/)
- TypeScript (https://www.typescriptlang.org/)
- Tailwind CSS (https://tailwindcss.com/)
- React Router DOM (https://reactrouter.com/en/main)
- React Icons (https://react-icons.github.io/react-icons/)
- React Redux (https://redux.js.org/)