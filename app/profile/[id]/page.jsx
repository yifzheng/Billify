'use client'

import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile from "@components/Profile"
import axios from 'axios'

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
            const response = await axios.get( `/api/user/${session?.user.id}/receipts`, { params: { userId: session?.user.id } } )

            const data = await response.data
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
                await fetch( `/api/receipt/${session?.user.id}/${receipt._id}`, {
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

    const handleEditReceipt = (receiptId) => {
        router.push(`/edit-receipt/${receiptId}`)
    }

    return (
        <Profile
            receipts={ receipts }
            handleDelete={ handleDelete }
            handleEdit={handleEditReceipt}
        />
    )
}

export default ProfilePage