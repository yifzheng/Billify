'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ItemField from './ItemField'
import Image from 'next/image'
import Add from "../public/icons/add.png"
import Remove from "../public/icons/remove.png"
import useReceiptStore from '@context/receiptStore'

const Form = ( { type } ) => {
    const { resturantName, setResturantName, items, setItems, tax, setTax, tip, setTip, total, setTotal } = useReceiptStore()
    const router = useRouter()
    console.log( items )
    // handle item change
    const handleItemChange = ( e, index, item ) => {
        const { name, value } = e.target; // deconstructing the name of input and value of input
        const updatedItems = [ ...items ]
        updatedItems[ index ] = { ...item, [ name ]: value }
        setItems( updatedItems )
    }
    // add another item to state
    const handleAddItem = () => {
        setItems( [ ...items, { name: '', price: 0, quantity: 1, owners: [] } ] );
    };
    // remove item from state
    const handleRemoveItem = ( item ) => {
        const updatedItems = items.filter( ( i ) => i !== item );
        setItems( updatedItems );
    };

    return (
        <section className='w-full max-w-full flex-start flex-col mb-16'>
            <h1 className='head_text text-left'><span className='orange_gradient'>Step 2: { type } Receipt</span></h1>
            <form
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
                <label htmlFor="">
                    <span className='font-satoshi font-semibold text-lg text-gray-700'>
                        Restaurant Name
                    </span>
                    <input type="text" required className='form_input' placeholder='Akira&#39;s Omurice' value={ resturantName } onChange={ ( e ) => setResturantName( e.target.value ) } />
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
                        <Link href={ "/" }>
                            <span className='font-medium'>Cancel</span>
                        </Link>


                        <button type='button' onClick={ () => { } } className={ `green_btn flex gap-1` }>
                            <span className='font-medium'>Create</span>
                        </button>
                    </div>
                </div>

            </form>
        </section >
    )
}

export default Form