import { Link } from 'react-router-dom'
import classes from './Task.module.css'

const Task = ({
  id,
  title,
  description
}: {
  id: number,
  title: string,
  description: string
}) => {

  return (
    <>
      <div className={classes.task}>
        <Link to={`/post/${id}`}>
          <p className={classes.title}>{title}</p>
          <p className={classes.description}>{description}</p>
        </Link>
      </div>
    </>
  )
}

export default Task