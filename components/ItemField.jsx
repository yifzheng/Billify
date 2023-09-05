import React from 'react'

const ItemField = ( { item, index } ) => {
    return (
        <label >
            <span className='font-satoshi font-semibold text-lg text-gray-700 '>
                Item <i>#{ index }</i>
            </span>
            <section className='item-field flex-col '>
                <section className='flex-start gap-2'>
                    <label className="w-full">
                        <span className='font-satoshi font-medium text-sm text-gray-700'>Name</span>
                        <input
                            type="text"
                            placeholder='Name: Omurice'
                            name='description'
                            value={ item.description }
                            className='form_input'
                        />
                    </label>
                    <label className="w-1/4">
                        <span className='font-satoshi font-medium text-sm text-gray-700'>Quantity</span>
                        <input
                            type="number"
                            placeholder='Quanity: 2'
                            name='quantity'
                            className='form_input'
                            value={ item.quantity }
                        />
                    </label><label className="w-1/4">
                        <span className='font-satoshi font-medium text-sm text-gray-700'>Price</span>
                        <input
                            type="number"
                            placeholder='Price: $12'
                            name='price'
                            className='form_input'
                            value={ item.price }
                        />
                    </label>
                </section>
                <section>
                    <label className="w-full">
                        <span className='font-satoshi font-medium text-sm text-gray-700'>Owners</span>
                        <input
                            type="text"
                            placeholder='John Doe, Jane Doe, ...'
                            name='owners'
                            value={ "" }
                            className='form_input'
                        />
                    </label>
                </section>
            </section>
        </label>

    )
}

export default ItemField