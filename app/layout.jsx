'use client'

import '@styles/globals.css'
import Provider from '@components/Provider'
import Nav from '@components/Nav'
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@utils/ServerActions";

export const metadata = {
    title: 'Splittr',
    description: "Follow AA and split your bills evenly",
    icons: {
        icon: '/icon?<generated>'
    }
}

const RootLayout = ( { children } ) => {

    const [ isVerified, setIsVerified ] = useState( false )

    const handleVerification = async ( token ) => {
        await verifyCaptcha( token )
            .then( () => setIsVerified( true ) )
            .catch( () => setIsVerified( false ) )
    }
    return (
        <html lang="en">
            <Provider>
                <body>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <div className="app">
                        {
                            !isVerified ?
                                (
                                    <section className='flex-center flex-col text-center sm:mt-[30%] mt-[50%] gap-10'>
                                        <h1 className='head_text blue_gradient sm:h-24 h-50 '>Verify Your Humanity</h1>
                                        <ReCAPTCHA
                                            sitekey={ '6LcZYxYoAAAAAAwiRjVeymHjbHxTj4LfjirQEDsJ' }
                                            onChange={ handleVerification }
                                        />
                                    </section>
                                )
                                : ( <>
                                    <Nav />
                                    { children }
                                </> ) }
                    </div>
                </body>
            </Provider>
        </html>
    )
}

export default RootLayout