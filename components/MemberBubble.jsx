import X from "../public/icons/x.png"
import Image from "next/image";

const MemberBubble = ( { owner, index, onChange } ) => {

    return (
        <section className="flex-start gap-2">
            <div className="bubble flex-center gap-2 bg-zinc-50 rounded-2xl p-3">
                <span>{ owner.name }</span>
                <Image
                    src={ X }
                    width={ 15 }
                    height={ 15 }
                    alt="remove"
                    className="cursor-pointer"
                    onClick={ () => onChange( index ) }
                />
            </div>
        </section>
    )
}

export default MemberBubble