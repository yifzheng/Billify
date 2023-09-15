'use client'

import Image from 'next/image'
import { useState } from 'react'
import Down from "../public/icons/down.png"
import Up from "../public/icons/up.png"

const ReceiptCard = ( { receipt, handleDelete, handleEdit } ) => {
  const [ expanded, setExpanded ] = useState( false )
  const date = new Date( receipt.createdAt )
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const toggleExpanded = () => {
    setExpanded( ( prevState ) => !prevState )
  }

  return (
    <section /* className={ `flex flex-col bg-white rounded-lg shadow-lg p-6 h-${expanded ? 'auto' : 200} transition-max-full sm:w-1/3 w-full font-inter` } */ className='receipt_card'>
      <span className='flex-end mb-0 text-base text-gray-700'>{ month }/{ day }/{ year }</span>
      <h2 className='sm:text-2xl text-xl font-semibold font-inter text-gray-800'>{ receipt.resturantName }</h2>
      <div className="flex justify-between">
        <p className='text-gray-700 text-base font-inter'><b>Total:</b> ${ receipt.total.toFixed( 2 ) }</p>
      </div>

      { expanded &&
        (
          <section className="extra sm:text-base text-sm text-gray-700 font-inter ">
            <hr className='h-1 bg-black my-1' />
            <section className='items flex justify-between gap-2 items-start font-inter'>
              <section className='flex flex-col justify-between w-1/4 font-inter'>
                <span><b>Quanity</b></span>
                { receipt.items.map( ( item, index ) =>
                (
                  <span key={ index } className='pl-1'>{ item.quantity }</span>
                ) ) }
              </section>
              <section className='flex flex-col justify-between font-inter'>
                <span><b>Description</b></span>
                { receipt.items.map( ( item, index ) =>
                (
                  <span key={ index }>{ item.name }</span>
                ) ) }
              </section>
              <section className='flex-end flex-col justify-between w-1/4 font-inter'>
                <span><b>Amount</b></span>
                { receipt.items.map( ( item, index ) =>
                (
                  <span key={ index }>${ item.amount === 0 ? 0 : item.amount.toFixed( 2 ) }</span>
                ) ) }
              </section>
            </section>
            <hr className='h-1 bg-black my-2' />
            <section className='flex justify-between items-start font-inter'>
              <section className='flex flex-col justify-between w-1/4 font-inter'>
                <span><b>Name</b></span>
                { receipt.contribution.map( ( item, index ) =>
                (
                  <span key={ index } className='pl-1'>{ item.member }</span>
                ) ) }
              </section>
              <section className='flex-end flex-col justify-between w-1/4 font-inter'>
                <span><b>Amount</b></span>
                { receipt.contribution.map( ( item, index ) =>
                (
                  <span key={ index } className=''>${ item.contribution.toFixed( 2 ) }</span>
                ) ) }
              </section>
            </section>
            <hr className='h-1 bg-black my-2' />
            <section className='flex justify-between'>
              <span className='font-inter'><b>Tax</b></span>
              <span className='pr-4 font-inter'>${ receipt.tax === 0 ? 0 : receipt.tax.toFixed( 2 ) }</span>
            </section>
            <section className='flex justify-between mb-7'>
              <span className='font-inter'><b>Tip</b></span>
              <span className='pr-4 font-inter'>${ receipt.tip === 0 ? 0 : receipt.tip.toFixed( 2 ) }</span>
            </section>
          </section>
        ) }
      <div className="flex justify-between items-center mt-1">
        <div className="flex gap-2">
          <span className='font-inter green_gradient cursor-pointer text-sm font-semibold' onClick={ handleEdit }>Edit</span>
          <span className='font-inter red_gradient cursor-pointer text-sm font-semibold' onClick={ handleDelete }>Delete</span>
        </div>
        <button onClick={ toggleExpanded }>
          <Image
            src={ expanded ? Up : Down }
            width={ 25 }
            height={ 25 }
            alt='expand'
          />
        </button>
      </div>
    </section>
  )
}

export default ReceiptCard
/* 
[
  {
    _id: '64ffcc87ac31d8929b851b7f',
    resturantName: 'Abiko Curry',
    items: [
      {
        name: 'Curry Rice',
        amount: 43.96,
        quantity: 4,
        members: [
          { name: 'eric', _id: '64ffcc87ac31d8929b851b81' },
          { name: 'yifeng', _id: '64ffcc87ac31d8929b851b82' },
          { name: 'annie', _id: '64ffcc87ac31d8929b851b83' },
          { name: 'fion', _id: '64ffcc87ac31d8929b851b84' }
        ],
        _id: '64ffcc87ac31d8929b851b80'
      }
    ],
    tax: 1,
    tip: 1,
    total: 45.96,
    creator: {
      _id: '64fa78763a22c133336643d9',
      email: 'yifengzheng6789@gmail.com',
      username: 'yifengzheng',
      image: 
        'https://lh3.googleusercontent.com/a/AAcHTtf8_EX7uyV2f3SKhtF66na0STneQkvjGE5P6MM3a0IU0M4=s96-c',
      __v: 0
    },
    contribution: [
      {
        member: 'eric',
        contribution: 11.49,
        _id: '64ffcc87ac31d8929b851b85'
      },
      {
        member: 'yifeng',
        contribution: 11.49,
        _id: '64ffcc87ac31d8929b851b86'
      },
      {
        member: 'annie',
        contribution: 11.49,
        _id: '64ffcc87ac31d8929b851b87'
      },
      {
        member: 'fion',
        contribution: 11.49,
        _id: '64ffcc87ac31d8929b851b88'
      }
    ],
    __v: 0
  }
]
*/