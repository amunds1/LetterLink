import { Button } from '@mantine/core'
import { requestForToken } from '../../firebase/messaging'

const NotificationButton = () => {
  return <Button onClick={requestForToken}>Notification</Button>
}

export default NotificationButton
