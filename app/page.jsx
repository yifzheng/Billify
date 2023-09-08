'use client'

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter()
    return (
        <section className="flex-center flex-col text-center mt-[10%]">
            <h1 className="head_text blue_gradient">Welcome to [BRAND NAME]</h1>
            <span className="desc w-full">
                Create receipts and find each of your friends contributions
                between meals and parties.
            </span>
            <br />
            <button className="start_btn mt-[20%]" onClick={() => router.push('/create-receipt/members')}>Create Now</button>
        </section>
    );
};

export default Home;
