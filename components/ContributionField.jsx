import React from 'react'

const ContributionField = ( { name, amount } ) => {
    return (
        <section className='flex justify-between w-full bg-slate-50 rounded-lg px-3 py-2'>
            <span className='sm:text-xl text-base text-gray-700'>{ name }</span>
            <span className='sm:text-xl text-base text-gray-700'>${ amount }</span>
        </section>
    )
}

export default ContributionField