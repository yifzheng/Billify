'use client'

import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import Form from '@components/Form'
import useEditReceiptStore from '@context/editReceiptStore'
import { calculateContributions } from '@utils/contribution'


const UpdateReceipt = () => {
    const { editReceipt, members, setResturantName, setItems, setTax, setTip, setTotal, setContribution, reset } = useEditReceiptStore()
    const router = useRouter()
    const { data: session } = useSession()
    const params = useParams()
    const { id } = params

    // handle item change
    const handleItemChange = ( index, item ) => {

        const updatedItems = [ ...editReceipt.items ]

        updatedItems[ index ] = { ...item }

        setItems( updatedItems )
    }

    // add another item to state
    const handleAddItem = () => {
        setItems( [ ...editReceipt.items, { name: '', amount: undefined, quantity: 1, members: [] } ] );
    };

    // remove item from state
    const handleRemoveItem = ( item ) => {
        const updatedItems = editReceipt.items.filter( ( i ) => i !== item );
        setItems( updatedItems );
    };

    const handleBack = () => {
        router.push( `/edit-receipt/${id}/members` )
    }

    // reset creation process
    const handleCancel = () => {
        reset()
        router.push( "/" )
    }

    // create the receipt and save to state if not logged in
    const handleUpdate = async ( e ) => {
        e.preventDefault()
        if ( !id ) return alert( "Receipt ID not available" )
        // if there are members available, to prevent any manual url routing
        if ( members.length > 0 && id ) {
            const contribution = calculateContributions( editReceipt, members )

            editReceipt.contribution = contribution
            // setContribution( contribution )

            // router.push( `/edit-receipt/${id}/contributions` )
            // if user is logged in post the receipt to database
            if ( session?.user.id ) {
                await updateReceipt( editReceipt )
            }
        }
    }

    const updateReceipt = async ( receipt ) => {
        try {
            const response = await fetch( `/api/receipt/${session?.user.id}/${receipt._id}`, {
                method: 'PATCH',
                body: JSON.stringify( { ...editReceipt, userId: session?.user.id } )
            } )
            if ( response.ok ) {

                setTimeout( () => router.push( `/edit-receipt/${id}/contributions` ), 1500 )
            }
        } catch ( error ) {
            console.log( error )
        }
    }

    return (
        <Form
            members={ members }
            resturantName={ editReceipt.resturantName }
            setResturantName={ setResturantName }
            items={ editReceipt.items }
            tax={ editReceipt.tax }
            setTax={ setTax }
            tip={ editReceipt.tip }
            setTip={ setTip }
            total={ editReceipt.total }
            setTotal={ setTotal }
            type={ "Update" }
            handleItemChange={ handleItemChange }
            handleAddItem={ handleAddItem }
            handleRemoveItem={ handleRemoveItem }
            handleSubmit={ handleUpdate }
            handleCancel={ handleCancel }
            handleBack={ handleBack }
        />
    )
}

export default UpdateReceipt