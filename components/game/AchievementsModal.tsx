import { Modal, Image, Stack, Text } from '@mantine/core'
import AchievementIcons, {
  IAchievementIcons,
} from '../../constants/AchievementIcons'

interface IAchievementModal {
  acheievement: string
  openModal: boolean
  closeAchievementsModal: (achievement: string) => Promise<void>
}

const win3gamesModal = (props: IAchievementModal) => {
  const { acheievement, openModal, closeAchievementsModal } = props
  const AchievementsIconsList: IAchievementIcons = AchievementIcons

  return (
    <Modal
      opened={openModal}
      centered
      size="sm"
      onClose={() => closeAchievementsModal(acheievement)}
      radius={20}
      overlayOpacity={0.3}
      styles={{
        modal: {
          background: 'linear-gradient(75deg, #FFF9DB 0%, #FFEC99 100%)',
        },
        close: {
          background: '#C1C2C5',
          border: '2px solid #909296',
          color: '#1A1B1E',
        },
      }}
    >
      <Stack align={'center'}>
        <Text size={25} weight={800} color="orange.6" align="center">
          ACHIEVEMENT UNLOCKED!
        </Text>
        <Image src={AchievementsIconsList[acheievement]} width={150} />
        <Text color="lime.9" weight={600} size={20} align="center" italic>
          {acheievement.toUpperCase().replace(/-/g, ' ')}
        </Text>
      </Stack>
    </Modal>
  )
}

export default win3gamesModal
