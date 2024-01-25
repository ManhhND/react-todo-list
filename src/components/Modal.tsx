import { ReactNode } from 'react'

const Modal = ({
  children,
  onClose
}: {
  children: ReactNode
  onClose: () => void
}) => {
  return (
    <>
      <div className="bg-black/[0.6] fixed top-0 left-0 w-full h-full z-10" onClick={onClose}></div>
      <dialog open className="w-10/12 md:w-1/2 rounded-md z-10">{children}</dialog>
    </>
  )
}

export default Modal