import { useSelector, useDispatch } from 'react-redux'
import { hideNotification } from '../store/Slices/notificationSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  const dispatch = useDispatch()

  if (notification.message && notification.type) {
    toast[notification.type](notification.message, {
      onClose: () => dispatch(hideNotification()),
    })
  }

  return <ToastContainer />
}

export default Notification
