'use client'

import Contribution from "@components/Contribution"
import useReceiptStore from "@context/receiptStore"

const Contributions = () => {
    const { total, contribution, reset } = useReceiptStore()
    
    return (
        <Contribution
            total={ total }
            contribution={ contribution }
            reset={ reset }
        />
    )
}

export default Contributions