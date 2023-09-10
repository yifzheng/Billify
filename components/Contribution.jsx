'use client'

import useReceiptStore from "@context/receiptStore"
import { useRouter } from "next/navigation"
import ContributionField from "./ContributionField"

const Contribution = () => {
    const router = useRouter()
    const { contribution } = useReceiptStore()

    return (
        <section className='w-full max-w-full flex-start flex-col mb-16'>
            <h1 className='head_text text-left'><span className='orange_gradient'>Step 3: Contributions</span></h1>
            <br />
            <br />
            <div className='flex-start flex-col gap-3 sm:w-[50%] w-full glassmorphism'>
                <header className='flex justify-between w-full mb-4'>
                    <span className='sm:text-2xl text-base'><b>Member Name</b></span>
                    <span className='sm:text-2xl text-base'><b>Amount ($)</b></span>
                </header>
                { contribution.map( ( member, index ) => (
                    <ContributionField key={ index } name={ member.name } amount={ member.contribution } />
                ) ) }
            </div>
            <div className="flex-start my-10 w-1/2">
                <div className="black_btn cursor-pointer" onClick={ () => router.push( "/" ) }>Finish</div>
            </div>
        </section>
    )
}

export default Contribution