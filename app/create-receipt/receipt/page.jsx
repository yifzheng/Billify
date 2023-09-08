import Form from '@components/Form'
import React from 'react'

const CreateReceipt = () => {
    const { data: session } = useSession()
    const router = useRouter()

    if ( !session ) {
        router.push( "/" )
        return false
    }

    return (
        <Form
            type={ 'Create' }
        />
    )
}

export default CreateReceipt