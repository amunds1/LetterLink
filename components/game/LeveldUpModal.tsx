import {
  Modal,
  Image,
  Stack,
  Text,
  BackgroundImage,
  Group,
} from '@mantine/core'
import { _BackgroundImage } from '@mantine/core/lib/BackgroundImage/BackgroundImage'
import Levels, { ILevels } from '../../constants/Levels'
interface ILevelModalProps {
  openLeveldUpModal: boolean
  closeLeveldUpModal(): Promise<void>
  experiencePoints: number
}

const LeveledUpModal = (props: ILevelModalProps) => {
  const { openLeveldUpModal, closeLeveldUpModal, experiencePoints } = props

  const level = Math.floor(experiencePoints / 50 + 1)
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
          background: 'linear-gradient(75deg, #E6FCF5 0%, #96F2D7 100%)',
        },
        close: {
          background: '#C1C2C5',
          border: '2px solid #909296',
          color: '#1A1B1E',
        },
      }}
    >
      <Stack align={'center'}>
        <Text size={40} weight={800} color="pink.6">
          LEVEL UP!
        </Text>
        <Image src="/icons/leveldUp.svg" width={150} />
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 0 }}>
          <Text color="teal.8" weight={800} size={30} align="center">
            LEVEL {level}
          </Text>
          <Text color="teal.9" weight={400} size={20} align="center" italic>
            {levelName}
          </Text>
        </div>
      </Stack>
    </Modal>
  )
}

export default LeveledUpModal
