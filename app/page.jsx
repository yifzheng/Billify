'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <section className="flex-center flex-col text-center mt-[10%]">
      <h1 className="head_text blue_gradient">Welcome to Billify</h1>
      <span className="desc w-full">
        Create receipts and find each of your friends contributions
        between meals and parties.
      </span>
      { !session && <span className="desc w-full"><b>Sign in</b> to continue</span> }
      <br />
      { session && <button className="start_btn mt-[20%]" onClick={ () => router.push( '/create-receipt/members' ) }>Create Now</button> }
    </section>
  );
};

export default Home;
