import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Modal.module.css'

const Modal = ({
  children
}: {
  children: ReactNode
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/')
  }
  return (
    <>
      <div className={classes.backdrop} onClick={handleClose}></div>
      <dialog open className={classes.modal}>{children}</dialog>
    </>
  )
}

export default Modal