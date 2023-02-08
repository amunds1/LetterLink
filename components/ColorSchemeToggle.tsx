import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons'

const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? <IconSun /> : <IconMoonStars />}
      </ActionIcon>
    </Group>
  )
}

export default ColorSchemeToggle
