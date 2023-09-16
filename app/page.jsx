'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@utils/ServerActions";
import useCaptchaStore from "@context/captchaStore";

const Home = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { isVerified, setIsVerified } = useCaptchaStore()

  const handleVerification = async ( token ) => {
    await verifyCaptcha( token )
      .then( () => {

        setIsVerified( true )
      } )
      .catch( () => setIsVerified( false ) )
  }

  return (
    <>
      {
        !isVerified ?
          (
            <section className='flex-center flex-col text-center sm:mt-[12%] mt-[6vh] gap-6 glassmorphism h-[30%]'>
              <h1 className='head_text blue_gradient sm:h-24 h-fit '>Verify Humanity</h1>
              <span className="desc2">Please help us ensure the security of our website by verifying that you are a human and not a robot. This helps us protect against automated spam and unauthorized access.</span>
              <span className='sm:w-1/2'>Click the "I'm not a robot" checkbox below to prove you are a human. You may be presented with additional challenges if our system detects unusual activity.</span>
              <ReCAPTCHA
                sitekey={ process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LcZYxYoAAAAAAwiRjVeymHjbHxTj4LfjirQEDsJ' }
                onChange={ handleVerification }
              />
            </section>
          )
          : ( <section className="flex-center flex-col text-center mt-[10%]">
            <h1 className="head_text blue_gradient">Welcome to Splittr</h1>
            <span className="desc w-full">
              Generate receipts and identify the contributions of each of your acquaintances during gatherings and dining occasions.
            </span>
            {/* { !session && <span className="desc w-full"><b>Sign in</b> to continue</span> }
      <br /> */}
            <button className="start_btn mt-[20%]" onClick={ () => router.push( '/create-receipt/members' ) }>Create Now</button>
          </section> )
      }
    </>
  );
};

export default Home;
