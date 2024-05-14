import React, { useState } from 'react'
import { ProfileTab } from './ProfileTab'

export const MenuUser = () => {


  const [isProfile, setIsProfile] = useState(false);


  return (
    <>
      {
        isProfile
        &&
        <ProfileTab setIsProfile={setIsProfile} isProfile={isProfile} />
      }
    </>
  )
}
