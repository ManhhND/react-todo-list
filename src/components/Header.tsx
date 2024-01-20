import { LuListTodo } from 'react-icons/lu';
import { MdAddTask } from 'react-icons/md';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <LuListTodo />
        Todo List
      </h1>
      <p>
        <Link className={classes.button} to='/create-task'>
          <MdAddTask size={18} />
          New Task
        </Link>
      </p>
    </header>
  );
}

export default Header;