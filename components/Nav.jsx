'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import Logo from "../public/icons/bill.png"
import Create from "../public/icons/compose.png"
import Exit from "../public/icons/exit.png"

const Nav = () => {
    const session = true;
    //const { data: session } = useSession()
    // login providers such as Google and etc...
    const [ providers, setProviders ] = useState( null )
    const [ toggleDropDown, setToggleDropDown ] = useState( false )


    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={ "/" } className='flex gap-2 flex-center' >
                <Image
                    src={ Logo }
                    width={ 45 }
                    height={ 45 }
                    alt='billify_logo'
                    className='object-contain'
                />
                <span className='logo_text'>Billify</span>
            </Link>

            {/* Desktop Navigation (When min width is greater than 640px display flex else hidden) */ }
            <div className="sm:flex hidden">
                {
                    session ? (
                        <div className="flex gap-3 md:gap-5 items-center">
                            <Link href={ "/create-receipt" } className='green_btn'>
                                <Image
                                    src={ Create }
                                    width={ 25 }
                                    height={ 25 }
                                    alt='Create Receipt'
                                />
                            </Link>
                            <button type="button" onClick={ signOut } className='outline_btn'>
                                <Image
                                    src={ Exit }
                                    width={ 25 }
                                    height={ 25 }
                                    alt='Create Receipt'
                                />
                            </button>
                            <Link href={ "/profile" }>
                                <Image
                                    src={ Logo }
                                    width={ 37 }
                                    height={ 37 }
                                    className='rounded-full'
                                    alt='profile'
                                />
                            </Link>
                        </div>
                    )
                        :
                        (
                            <>
                                { providers &&
                                    Object.values( providers ).map( ( provider ) => (
                                        <button type='button' key={ provider.name } onClick={ () => signIn( provider.id ) } className='green_btn'>
                                            Sign In
                                        </button>
                                    ) ) }
                            </>
                        )
                }
            </div>

            {/* Mobile Navigation (When min screen width is greater than 640px: hidden) */ }
            <div className="sm:hidden flex">
                {
                    session ?
                        (
                            <div className='flex'>
                                <Image
                                    src={ Logo }
                                    width={ 37 }
                                    height={ 37 }
                                    className='rounded-full cursor-pointer'
                                    alt='profile'
                                    onClick={ () => setToggleDropDown( ( prev ) => !prev ) }
                                />
                                { toggleDropDown && (
                                    <div className="dropdown">
                                        <Link
                                            href={ "/profile" }
                                            className='dropdown_link'
                                            onClick={ () => setToggleDropDown( false ) }
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href={ "/profile" }
                                            className='dropdown_link'
                                            onClick={ () => setToggleDropDown( false ) }
                                        >
                                            Create Receipt
                                        </Link>
                                        <button type="button" onClick={ () => {
                                            setToggleDropDown( false )
                                            signOut();
                                        } }
                                            className='mt-5 w-full signout_btn'
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) }
                            </div>
                        )
                        :
                        (
                            <>
                                { providers &&
                                    Object.values( providers ).map( ( provider ) => (
                                        <button type='button' key={ provider.name } onClick={ () => signIn( provider.id ) } className='green_btn'>
                                            Sign In
                                        </button>
                                    ) ) }
                            </>
                        )
                }
            </div>
        </nav>
    )
}

export default Nav