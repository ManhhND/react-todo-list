import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const App = () => {

  return (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  )
}

export default App
