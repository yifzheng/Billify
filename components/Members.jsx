"use client";

import MemberField from "./MemberField";

const Members = ( { members, type, handleMemberChange, handleRemoveMember, handleEnterKey, handleContinue, handleBack } ) => {

    return (
        <section className="flex-start flex-col gap-4 w-full max-w-full sm:mt-4">
            <h1 className="head_text orange_gradient">Step 1: { type } Participants</h1>
            <span className="desc2 mb-10">
                Who participated in the payment for the receipt? This individual placed an order during the outing.
            </span>
            <div className="glassmorphism sm:w-1/2 w-full">
                { members.map( ( member, index ) => (
                    <MemberField
                        key={ index }
                        member={ member }
                        index={ index }
                        handleEnterKey={ handleEnterKey }
                        handleRemoveMember={ handleRemoveMember }
                        onChange={ handleMemberChange }
                    />
                ) ) }
            </div>
            <div>
                <div className="flex gap-4 items-center mt-10">
                    <span className="red_gradient text-lg font-medium cursor-pointer" onClick={handleBack}>Back</span>
                    <button className="green_btn font-medium" onClick={ handleContinue }>Continue</button>
                </div>
            </div>


        </section>
    );
};

export default Members;
