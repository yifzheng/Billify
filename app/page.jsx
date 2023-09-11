'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@utils/ServerActions";

const Home = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [ isVerified, setIsVerified ] = useState( false )

  const handleVerification = async ( token ) => {
    await verifyCaptcha( token )
      .then( () => setIsVerified( true ) )
      .catch( () => setIsVerified( false ) )
  }

  return (
    <section className="flex-center flex-col text-center mt-[10%]">
      <h1 className="head_text blue_gradient">Welcome to Splittr</h1>
      <span className="desc w-full">
        Generate receipts and identify the contributions of each of your acquaintances during gatherings and dining occasions.
      </span>
      {/* { !session && <span className="desc w-full"><b>Sign in</b> to continue</span> }
      <br /> */}
      <button className="start_btn mt-[20%]" onClick={ () => router.push( '/create-receipt/members' ) }>Create Now</button>
    </section>
  );
};

export default Home;
