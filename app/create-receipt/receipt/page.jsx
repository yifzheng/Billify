'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'
import useReceiptStore from '@context/receiptStore'
import { calculateContributions } from '@utils/contribution'

const CreateReceipt = () => {
    const { members, resturantName, setResturantName, items, setItems, tax, setTax, tip, setTip, total, setTotal, setContribution, reset } = useReceiptStore()
    const router = useRouter()
    const { data: session } = useSession()

    // handle item change
    const handleItemChange = ( index, item ) => {
        const updatedItems = [ ...items ]
        updatedItems[ index ] = { ...item }
        setItems( updatedItems )
    }

    // add another item to state
    const handleAddItem = () => {
        setItems( [ ...items, { name: '', amount: undefined, quantity: 1, members: [] } ] );
    };

    // remove item from state
    const handleRemoveItem = ( item ) => {
        const updatedItems = items.filter( ( i ) => i !== item );
        setItems( updatedItems );
    };

    // reset creation process
    const handleCancel = () => {
        reset()
        router.push( "/" )
    }

    // create the receipt and save to state if not logged in
    const handleCreate = async ( e ) => {
        e.preventDefault()
        // if there are members available, to prevent any manual url routing
        if ( members.length > 0 ) {
            const receipt = {
                resturantName,
                items,
                tax,
                tip,
                total
            }
            const contribution = calculateContributions( receipt, members )
            receipt.contribution = contribution;
            console.log( receipt )
            setContribution( contribution )

            // if user is logged in post the receipt to database
            if ( session?.user.id ) {
                await postReceipt( receipt )
            }
            else {
                // else, just navigate to contributions page
                router.push( "/create-receipt/contributions" )
            }
        }
    }

    const postReceipt = async ( receipt ) => {
        try {
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
        }
    }

    return (
        <Form
            resturantName={ resturantName }
            setResturantName={ setResturantName }
            items={ items }
            tax={ tax }
            setTax={ setTax }
            tip={tip}
            setTip={setTip}
            total={total}
            setTotal={setTotal}
            type={ 'Create' }
            handleItemChange={ handleItemChange }
            handleAddItem={ handleAddItem }
            handleRemoveItem={ handleRemoveItem }
            handleSubmit={ handleCreate }
            handleCancel={ handleCancel }
        />
    )
}

export default CreateReceipt