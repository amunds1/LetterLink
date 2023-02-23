import {
  Alert,
  Button,
  Checkbox,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { upperFirst, useToggle } from '@mantine/hooks'
import { getAuth } from 'firebase/auth'
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGithub,
} from 'react-firebase-hooks/auth'
import firebase from '../../firebase/clientApp'

export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register'])

  const [signInWithGithub] = useSignInWithGithub(getAuth(firebase))
  const [signInWithFacebook, user, loading, error] = useSignInWithFacebook(
    getAuth(firebase)
  )
  const [
    createUserWithEmailAndPassword,
    userRegisterEmail,
    loadingRegisterEmail,
    errorRegisterEmail,
  ] = useCreateUserWithEmailAndPassword(getAuth(firebase))

  const [
    signInWithEmailAndPassword,
    userLoginEmail,
    loadingLoginEmail,
    errorLoadingEmail,
  ] = useSignInWithEmailAndPassword(getAuth(firebase))

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => {
        if (val.length <= 6) {
          return 'Password should include at least 6 characters'
        }

        return null
      },
    },
  })

  const onClickLogin = () => {
    signInWithEmailAndPassword(form.values.email, form.values.password)
  }

  const onClickRegister = () => {
    createUserWithEmailAndPassword(form.values.email, form.values.password)
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="xl" pb="md" weight={500}>
        Welcome to LetterLink
      </Text>

      {/* <Text size="lg" pt="sm">
        Sign in with
      </Text>
      <Group grow mb="md" mt="md" onClick={() => signInWithFacebook()}>
        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>
      <Group grow mb="md" mt="md" onClick={() => signInWithGithub()}>
        <GithubButton radius="xl">GitHub</GithubButton>
      </Group> */}

      {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

      {errorLoadingEmail?.code && (
        <Alert mb="lg" color="red">
          Wrong email or password
        </Alert>
      )}

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {/* {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
            />
          )} */}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
          />
          {/* <Link href="/resetpassword">
            <Anchor size="sm" color="red.6">
              Forgot password?
            </Anchor>
          </Link> */}

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          {/* <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor> */}
          <Button
            type="submit"
            loading={loadingLoginEmail}
            onClick={() => {
              type === 'register' && onClickRegister()
              type === 'login' && onClickLogin()
            }}
          >
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
