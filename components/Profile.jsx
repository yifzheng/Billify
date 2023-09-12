
import ReceiptCard from './ReceiptCard'

const Profile = ( { receipts } ) => {

    return (
        <section className="flex-start flex-col gap-6 w-full max-w-full">
            <h1 className='head_text orange_gradient'>My Receipts</h1>
            <div className="receipts flex-start row-auto w-full">
                { receipts.map( ( receipt ) => ( <ReceiptCard key={ receipt._id } receipt={ receipt } /> ) ) }
            </div>
        </section>
    )
}

export default Profile