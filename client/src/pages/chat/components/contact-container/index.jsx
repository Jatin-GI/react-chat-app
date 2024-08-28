import React from 'react'
import Logo from "@/components/logo"
import Title from "@/components/Title"
import ProfileInfo from './profile-info'
import NewDM from './newdm'

const ContactContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
    <div className="pt-3">
    <Logo></Logo>
    </div>
    <div className="my-3">
      <div className="flex items-center justify-between pr-10">
        <Title text="Direct Messages"/>
        <NewDM></NewDM>
      </div>
    </div>
    <div className="my-3">
      <div className="flex items-center justify-between pr-10">
        <Title text="Channels"/>
      </div>
    </div>
  <ProfileInfo></ProfileInfo>
  </div>
  )
}

export default ContactContainer
