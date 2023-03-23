import { Modal, Image, Stack, Text, useMantineColorScheme } from '@mantine/core'
import Levels, { ILevels, LevelTreshold } from '../../constants/Levels'
interface ILevelModalProps {
  openLeveldUpModal: boolean
  closeLeveldUpModal(): Promise<void>
  experiencePoints: number
}

const LeveledUpModal = (props: ILevelModalProps) => {
  const { openLeveldUpModal, closeLeveldUpModal, experiencePoints } = props

  // Dark mode
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const level = Math.floor(experiencePoints / LevelTreshold + 1)
  const levelList: ILevels = Levels
  const levelName: string = levelList[level]

  return (
    <Modal
      opened={openLeveldUpModal}
      centered
      size="sm"
      onClose={() => closeLeveldUpModal()}
      radius={20}
      styles={{
        modal: {
          background: dark
            ? 'linear-gradient(75deg, #5b8a7c 0%, #2f4d44 100%)'
            : 'linear-gradient(75deg, #E6FCF5 0%, #96F2D7 100%)',
        },
        close: {
          background: dark ? '#909296' : '#25262B',
          borderRadius: '20px',
          color: '#F8F9FA',
        },
      }}
    >
      <Stack align="center">
        <Text size={40} weight={800} color={dark ? 'pink.4' : 'pink.6'}>
          LEVEL UP!
        </Text>
        <Image src="/icons/leveldUp.svg" width={150} />
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 0 }}>
          <Text
            color={dark ? 'teal.4' : 'teal.8'}
            weight={800}
            size={30}
            align="center"
          >
            LEVEL {level}
          </Text>
          <Text
            color={dark ? 'teal.5' : 'teal.9'}
            weight={400}
            size={20}
            align="center"
            italic
          >
            {levelName}
          </Text>
        </div>
      </Stack>
    </Modal>
  )
}

export default LeveledUpModal
