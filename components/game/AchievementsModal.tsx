import { Modal, Image, Stack, Text, useMantineColorScheme } from '@mantine/core'
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

  // Dark mode
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

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
          background: dark
            ? 'linear-gradient(75deg, #bdb38a 0%, #998e60 100%)'
            : 'linear-gradient(75deg, #FFF9DB 0%, #FFEC99 100%)',
        },
        close: {
          background: '#25262B',
          borderRadius: '20px',
          color: '#F8F9FA',
        },
      }}
    >
      <Stack align="center">
        <Text
          size={25}
          weight={800}
          color={dark ? 'orange.3' : 'orange.6'}
          align="center"
        >
          ACHIEVEMENT UNLOCKED!
        </Text>
        <Image src={AchievementsIconsList[acheievement]} width={150} />
        <Text
          color={dark ? 'lime.2' : 'lime.9'}
          weight={600}
          size={20}
          align="center"
          italic
        >
          {acheievement.toUpperCase().replace(/-/g, ' ')}
        </Text>
      </Stack>
    </Modal>
  )
}

export default win3gamesModal
