import React from 'react'

type Props = {}

const useCurrentUser = async ({}: Props) => {

    const currentUser = await fetch("/api/current");

  return {
    currentUser
  }
}

export default useCurrentUser;