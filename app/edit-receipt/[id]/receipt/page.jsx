'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'
import useEditReceiptStore from '@context/editReceiptStore'


const UpdateReceipt = () => {
    const { editReceipt, members, setResturantName, setTax, setTip, setTotal, setContribution, reset } = useEditReceiptStore()
    const router = useRouter()
    const { data: session } = useSession()

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

    // reset creation process
    const handleCancel = () => {
        reset()
        router.push( "/" )
    }

    // create the receipt and save to state if not logged in
    const handleUpdate = async ( e ) => {
        e.preventDefault()
        // if there are members available, to prevent any manual url routing
        if ( members.length > 0 ) {
            const contribution = calculateContributions( receipt, members )
            setContribution( contribution )

            // if user is logged in post the receipt to database
            if ( session?.user.id ) {
                await updateReceipt( editReceipt )
            }
        }
    }

    const updateReceipt = async ( receipt ) => {
        /* try {
            console.log( 'POSTING' )
            const response = await fetch( '/api/receipt/new', {
                method: 'POST',
                body: JSON.stringify( { ...receipt, userId: session?.user.id } )
            } )
            console.log( response )
            if ( response.ok ) {
                setTimeout( () => router.push( "/create-receipt/contributions" ), 1500 )
            }
        } catch ( error ) {
            console.log( error )
        } */
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
        />
    )
}

export default UpdateReceipt