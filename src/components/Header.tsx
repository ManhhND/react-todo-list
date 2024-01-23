import { LuListTodo } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <LuListTodo />
        <Link to="/">
          Todo List
        </Link>
      </h1>
    </header>
  );
}

export default Header;