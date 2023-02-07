import { Button } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons'
import Link from 'next/link'

const BackToGamesButton = () => {
  return (
    <Link href="/games">
      <Button
        compact
        variant="light"
        color="dark"
        style={{ border: '1px solid #909296' }}
      >
        <IconArrowBackUp color="#141517" />
      </Button>
    </Link>
  )
}

export default BackToGamesButton
