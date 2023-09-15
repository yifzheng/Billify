'use client'

import Contribution from "@components/Contribution"
import useReceiptStore from "@context/receiptStore"

const Contributions = () => {
    const { contribution, reset } = useReceiptStore()
    return (
        <Contribution
            contribution={ contribution }
            reset={ reset }
        />
    )
}

export default Contributions