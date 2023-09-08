'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ItemField from './ItemField'
import Image from 'next/image'
import Add from "../public/icons/add.png"
import Remove from "../public/icons/remove.png"

const Form = ( { type } ) => {
    const [ items, setItems ] = useState( [
        {
            description: '', price: undefined, quantity: 1, owners: []
        }
    ] )
    const router = useRouter()

    // add another item to state
    const handleAddItem = () => {
        setItems( [ ...items, { description: '', price: undefined, quantity: 1, owners: [] } ] );
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
                    <input type="text" required className='form_input' placeholder='Akira&#39;s Omurice' />
                </label>
                { items.map( ( item, index ) => ( <ItemField key={ index } item={ item } index={ index + 1 } /> ) ) }
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
                                type="text"
                                placeholder='Tax: $10.98'
                                name='tax'

                                className='form_input'
                            />
                        </label>
                        <label className="w-full">
                            <span className='font-satoshi font-semibold text-lg text-gray-700'>Tips</span>
                            <input
                                type="number"
                                placeholder='Tip: $11.00'
                                name='tip'
                                className='form_input'
                            />
                        </label>
                        <label className="w-full">
                            <span className='font-satoshi font-semibold text-lg text-gray-700'>Total</span>
                            <input
                                type="number"
                                placeholder='Total: $24.35'
                                name='total'
                                className='form_input'
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