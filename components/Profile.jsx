
import ReceiptCard from './ReceiptCard'

const Profile = ( { receipts, handleDelete } ) => {

    return (
        <section className="flex-start flex-col gap-6 w-full max-w-full">
            <h1 className='head_text orange_gradient'>My Receipts</h1>
            <div className="receipts flex-start gap-4 sm:colums-3 xl:columns-2 flex-wrap sm:max-w-[80%] w-full">
                { receipts.map( ( receipt ) => ( <ReceiptCard key={ receipt._id } receipt={ receipt } handleDelete={ () => handleDelete && handleDelete( receipt ) } /> ) ) }
            </div>
        </section>
    )
}

export default Profile