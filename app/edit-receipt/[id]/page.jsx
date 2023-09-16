'use client'

import useCaptchaStore from "@context/captchaStore"
import useEditReceiptStore from "@context/editReceiptStore"
import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"


const EditReceipt = () => {
  const { setMembers, setEditReceipt } = useEditReceiptStore()
  const router = useRouter()
  const { data: session } = useSession()
  const params = useParams()
  const { id } = params

  const { isVerified } = useCaptchaStore()

  // check if verified move back to home for verification and prevent verifications skipping
  if ( !isVerified ) {
    router.push( "/" )
  }


  useEffect( () => {
    const fetchReceipt = async () => {
      const response = await fetch( `/api/receipt/${session?.user.id}/${id}` )
      const data = await response.json()

      setEditReceipt( data )
      // map through contributions and update members
      const membersList = data.contribution.map( ( contribution ) => ( { name: contribution.member } ) )
      setMembers( membersList )
    }
    if ( id ) fetchReceipt()
  }, [ id ] )

  return (
    <section className='w-full sm:mt-16 flex-start flex-col'>
      <h1 className='head_text blue_gradient'>Edit Receipt</h1>
      <span className="desc3 text-gray-700">Follow the steps below to edit your receipt</span>
      <br />
      <br />
      <h2 className="title_text blue_gradient">Step 1: Update Participants</h2>
      <h2 className="title_text blue_gradient">Step 2: Update Receipt</h2>
      <br />
      <div>
        <div className="flex gap-4 items-center mt-16">
          <span className="red_gradient text-lg font-medium cursor-pointer" onClick={ () => router.push( `/profile/${session?.user.id}` ) }>Cancel</span>
          <button className="black_btn font-medium" onClick={ () => router.push( `/edit-receipt/${id}/members` ) }>Continue</button>
        </div>
      </div>
    </section>
  )
}

export default EditReceipt