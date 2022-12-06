import { Center, Stack } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import ChangeUsername from '../components/settings/ChangeUsername'
import fetchUID from '../firebase/fetchUID'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const uid = await fetchUID(ctx)

    return {
      props: {
        uid,
      },
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
}

const Settings = ({ uid }: { uid: string }) => {
  return (
    <>
      <ChangeUsername uid={uid} />
    </>
  )
}

export default Settings
