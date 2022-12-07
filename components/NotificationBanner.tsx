import React from 'react'
import { Notification } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

/* 
  Notification banners

  https://mantine.dev/core/notification/
*/

export const SuccessNotification = (contentMessage: string, title?: string) => (
  <Notification icon={<IconCheck size={18} />} color="teal" title={title}>
    {contentMessage}
  </Notification>
)

export const ErrorNotification = (contentMessage: string, title?: string) => (
  <Notification icon={<IconX size={18} />} color="red" title={title}>
    {contentMessage}
  </Notification>
)

export const LoadingNotification = (contentMessage: string, title?: string) => (
  <Notification loading title={title} disallowClose>
    {contentMessage}
  </Notification>
)

export const DefaultNotification = (contentMessage: string, title?: string) => (
  <Notification title={title}>{contentMessage}</Notification>
)
