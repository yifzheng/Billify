'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const EditReceipt = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <section className='w-full flex-start flex-col'>
      <h1 className='head_text blue_gradient'>Edit Receipt</h1>
      <span className="desc3 text-gray-700">Follow the steps below to edit your receipt</span>
      <br />
      <br />
      <h2 className="title_text blue_gradient">Step 1: Update Members</h2>
      <h2 className="title_text blue_gradient">Step 2: Update Receipt</h2>
      <h2 className="title_text blue_gradient">Step 3: Save Receipt </h2>

      <div>
        <div className="flex gap-4 items-center mt-16">
          <span className="red_gradient text-lg font-medium cursor-pointer" onClick={ () => router.push( `/profile/${session?.user.id}` ) }>Cancel</span>
          <button className="black_btn font-medium">Continue</button>
        </div>
      </div>
    </section>
  )
}

export default EditReceipt