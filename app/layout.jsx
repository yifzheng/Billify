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
                                    <section className='flex-center flex-col text-center sm:mt-[22%] mt-[10vh] gap-6 glassmorphism h-[30%]'>
                                        <h1 className='head_text blue_gradient sm:h-24 h-50 '>Verify Your Humanity</h1>
                                        <span className="desc2">Please help us ensure the security of our website by verifying that you are a human and not a robot. This helps us protect against automated spam and unauthorized access.</span>
                                        <span className='sm:w-1/2'>Click the "I'm not a robot" checkbox below to prove you are a human. You may be presented with additional challenges if our system detects unusual activity.</span>
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