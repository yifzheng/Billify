'use client'

import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile from "@components/Profile"

const ProfilePage = () => {
    const [ receipts, setReceipts ] = useState( [] )
    const { data: session } = useSession()
    const router = useParams()
    const { id } = router

    useEffect( () => {
        const fetchReceipts = async () => {
            const response = await fetch( `/api/user/${session?.user.id}/receipts` )
            const data = await response.json()
            setReceipts( data )
        }
        return () => {
            fetchReceipts()
        }
    }, [ id ] )

    return (
        <Profile
            receipts={ receipts } 
        />
    )
}

export default ProfilePage