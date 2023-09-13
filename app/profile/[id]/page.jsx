'use client'

import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile from "@components/Profile"

const ProfilePage = () => {
    const [ receipts, setReceipts ] = useState( [] )
    const { data: session } = useSession()
    const params = useParams()
    const { id } = params
    const router = useRouter()

    // check if the current logged in user is viewing their own profile page
    if ( session?.user.id !== id ) {
        router.push( "/" )
    }

    useEffect( () => {
        const fetchReceipts = async () => {
            const response = await fetch( `/api/user/${session?.user.id}/receipts` )
            const data = await response.json()
            // sort the data
            const sortedData = data.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) )
            setReceipts( sortedData )
        }
        if ( id ) fetchReceipts()
    }, [ id ] )

    const handleDelete = async ( receipt ) => {
        const hadConfirmed = confirm( "Are you sure you want to delete this receipt?" )
        if ( hadConfirmed ) {
            try {
                // delete receipt
                await fetch( `/api/receipt/${receipt._id}`, {
                    method: 'DELETE'
                } )
                // filter old receipt from state
                const filteredReceipts = receipts.filter( ( rec ) => rec._id !== receipt._id )
                setReceipts( filteredReceipts )
            } catch ( error ) {
                console.log( error )
            }
        }
    }

    return (
        <Profile
            receipts={ receipts }
            handleDelete={ handleDelete }
        />
    )
}

export default ProfilePage