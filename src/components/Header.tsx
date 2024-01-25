import { LuListTodo } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="py-8 mb-4 border-b-2 border-violet-600">
      <h1 className="flex text-4xl items-center gap-4 justify-center text-violet-600">
        <LuListTodo />
        <Link to="/">
          Todo List
        </Link>
      </h1>
    </header>
  );
}

export default Header;