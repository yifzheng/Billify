'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import Logo from "../public/icons/bill.png"
import Create from "../public/icons/compose.png"
import Exit from "../public/icons/exit.png"
import Google from "../public/icons/google.png"

const Nav = () => {
    const { data: session } = useSession()
    // login providers such as Google and etc...
    const [ providers, setProviders ] = useState( null )
    const [ toggleDropDown, setToggleDropDown ] = useState( false )

    // on load of page
    useEffect( () => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders( response )
        }
        setUpProviders()
    }, [] )
    
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
                            <Image
                                src={ session?.user.image }
                                width={ 40 }
                                height={ 40 }
                                className='rounded-full border-solid border-2 border-amber-600'
                                alt='profile'
                            />
                        </div>
                    )
                        :
                        (
                            <>
                                { providers &&
                                    Object.values( providers ).map( ( provider ) => (
                                        <button type='button' key={ provider.name } onClick={ () => signIn( provider.id ) } className='black_btn flex items-center justify-center gap-2'>
                                            <Image
                                                src={ provider.name === "Google" && Google }
                                                width={ 25 }
                                                height={ 25 }
                                                alt='google'
                                            />
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
                                    src={ session?.user.image }
                                    width={ 40 }
                                    height={ 40 }
                                    className='rounded-full border-solid border-2 border-amber-600 cursor-pointer'
                                    alt='profile'
                                    onClick={ () => setToggleDropDown( ( prev ) => !prev ) }
                                />
                                { toggleDropDown && (
                                    <div className="dropdown">
                                        <Link
                                            href={ "/create-receipt" }
                                            className='dropdown_link'
                                            onClick={ () => setToggleDropDown( false ) }
                                        >
                                            Create Receipt
                                        </Link>
                                        <button type="button" onClick={ () => {
                                            setToggleDropDown( false )
                                            signOut();
                                        } }
                                            className='mt-5 w-max signout_btn'
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
                                        <button type='button' key={ provider.name } onClick={ () => signIn( provider.id ) } className='black_btn flex items-center justify-center gap-2'>
                                            <Image
                                                src={ provider.name === "Google" && Google }
                                                width={ 25 }
                                                height={ 25 }
                                                alt='google'
                                            />
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