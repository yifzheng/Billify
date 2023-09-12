'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'


const CreateReceipt = () => {
    const { data: session } = useSession()
    const router = useRouter()


    return (
        <Form
            type={ 'Create' }
            onSubmit={ () => { } }
        />
    )
}

export default CreateReceipt