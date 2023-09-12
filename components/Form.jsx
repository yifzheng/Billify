'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ItemField from './ItemField'
import Image from 'next/image'
import Add from "../public/icons/add.png"
import Remove from "../public/icons/remove.png"
import useReceiptStore from '@context/receiptStore'
import { calculateContributions } from '@utils/contribution'

const Form = ( { type } ) => {
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
        const receipt = {
            resturantName,
            items,
            tax,
            tip,
            total,
            creator: session?.user.id
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
            setTimeout( () => router.push( "/create-receipt/contributions" ), 1500 )
        }

    }

    const postReceipt = async ( receipt ) => {
        try {
            const response = await fetch( '/api/create-receipt/new', {
                method: 'POST',
                body: JSON.stringify( receipt )
            } )

            if ( response.ok ) {
                setTimeout( () => router.push( "/create-receipt/contributions" ), 1500 )
            }
        } catch ( error ) {
            console.log( error )
        }
    }

    /* 
        {
            resturantName: 'Toto\'s',
            items: [
                {
                name: '12321',
                amount: '31',
                quantity: '3',
                members: [
                    { name: 'yifeng' },
                    { name: 'eric' },
                    { name: 'annie' },
                    { name: 'fion' }
                ]
                }
            ],
            tax: '22',
            tip: '10',
            total: '70',
            creator: undefined,
            contribution: [
                { name: 'yifeng', contribution: '15.75' },
                { name: 'eric', contribution: '15.75' },
                { name: 'annie', contribution: '15.75' },
                { name: 'fion', contribution: '15.75' }
            ]
        }
    */

    return (
        <section className='w-full max-w-full flex-start flex-col mb-16'>
            <h1 className='head_text text-left'><span className='orange_gradient'>Step 2: { type } Receipt</span></h1>
            <form
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
                onSubmit={ e => handleCreate( e ) }
            >
                <label htmlFor="">
                    <span className='font-satoshi font-semibold text-lg text-gray-700'>
                        Restaurant Name
                    </span>
                    <input type="text" required className='form_input' name="name" placeholder='Akira&#39;s Omurice' value={ resturantName } onChange={ ( e ) => setResturantName( e.target.value ) } />
                </label>
                { items.map( ( item, index ) => ( <ItemField key={ index } item={ item } index={ index + 1 } handleItemChange={ handleItemChange } /> ) ) }
                <div className="buttons flex max-w-full gap-1">
                    <button type='button' onClick={ handleAddItem } className='green_btn flex gap-1 w-1/2'>
                        <Image
                            src={ Add }
                            width={ 27 }
                            height={ 27 }
                            alt='add_icon'
                        />
                        <span className='font-medium'>Add More Items</span>
                    </button>
                    { items.length > 1 &&
                        <button type='button' onClick={ () => handleRemoveItem( items[ items.length - 1 ] ) } className={ `remove_btn flex gap-1 w-1/2` }>
                            <Image
                                src={ Remove }
                                width={ 27 }
                                height={ 27 }
                                alt='remove_icon'
                            />
                            <span className='font-medium'>Remove Item</span>
                        </button> }
                </div>
                <div className='item-field flex-col '>
                    <div className='flex-start gap-2'>
                        <label className="w-full">
                            <span className='font-satoshi font-semibold text-lg text-gray-700'>Tax</span>
                            <input
                                type="number"
                                placeholder='10.98'
                                name='tax'
                                value={ tax }
                                step={ 0.01 }
                                onChange={ ( e ) => setTax( e.target.value ) }
                                className='form_input'
                            />
                        </label>
                        <label className="w-full">
                            <span className='font-satoshi font-semibold text-lg text-gray-700'>Tips</span>
                            <input
                                type="number"
                                placeholder='11.00'
                                name='tip'
                                className='form_input'
                                step={ 0.01 }
                                value={ tip }
                                onChange={ ( e ) => setTip( e.target.value ) }
                            />
                        </label>
                        <label className="w-full">
                            <span className='font-satoshi font-semibold text-lg text-gray-700'>Total</span>
                            <input
                                type="number"
                                placeholder='24.35'
                                name='total'
                                className='form_input'
                                step={ 0.01 }
                                value={ total }
                                onChange={ ( e ) => setTotal( e.target.value ) }
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button type='button' onClick={ () => router.push( "/create-receipt/members" ) } className={ `outline_btn flex gap-1` }>
                        <span className='font-medium'>Back</span>
                    </button>
                    <div className="buttons flex-end w-1/2 max-w-1/2 gap-4 float-right">
                        <span className='font-medium' onClick={ handleCancel }>Cancel</span>


                        <button type='submit' className={ `green_btn flex gap-1` }>
                            <span className='font-medium'>Create</span>
                        </button>
                    </div>
                </div>

            </form>
        </section >
    )
}

export default Form