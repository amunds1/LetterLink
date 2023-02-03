import React, { useState, useEffect } from 'react'
import { Notification } from '@mantine/core'

import { requestForToken, onMessageListener } from '../../firebase/messaging'

const NotificationSystem = () => {
  const [notification, setNotification] = useState<{
    title: string
    body: string
  }>({ title: '', body: '' })

  const notify = () => (
    <Notification title={notification?.title}>
      {notification?.body}
    </Notification>
  )

  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification])

  requestForToken()

  onMessageListener()
    .then((payload) => {
      console.log('Payload ser slik ut: ', payload)
      setNotification({
        title: 'dette er en tittel',
        body: 'Dette er en body',
      })
    })
    .catch((err) => console.log('failed: ', err))

  return (
    <Notification title={notification.title}>{notification.body}</Notification>
  )
}

export default NotificationSystem
