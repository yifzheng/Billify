'use client'

import { useState } from "react";
import MemberBubble from "./MemberBubble";

const ItemField = ( { item, index, handleItemChange, members, calculateTotal,} ) => {

    //const { members } = useReceiptStore() // retrieve members created in previous step
    const [ owners, setOwners ] = useState( item.members || [] )

    // remove names from owner state
    const handleRemoveBubble = ( idx ) => {
        const updatedOwners = [ ...owners ]
        updatedOwners.splice( idx, 1 )
        setOwners( updatedOwners )
        handleItemChange( index - 1, { ...item, members: updatedOwners } )
    }

    // add name to owner state
    const handleAddOwner = ( e ) => {
        const containsValue = owners.some( ( owner ) => owner.name.includes( e.target.value ) )
        if ( !containsValue ) {
            setOwners( [ ...owners, { name: e.target.value } ] )
            handleItemChange( index - 1, { ...item, members: [ ...owners, { name: e.target.value } ] } )
        }
    }

    const handleItemAmount = ( e ) => {
        const newItemAmount = parseFloat( e.target.value );
        handleItemChange( index - 1, { ...item, amount: newItemAmount } );
        calculateTotal();
    }

    return (
        <label>
            <span className="font-satoshi font-semibold text-lg text-gray-700 ">
                Item <i>#{ index }</i>
            </span>
            <section className="item-field flex-col ">
                <section className="flex-start gap-2">
                    <label className="w-full">
                        <span className="font-satoshi font-semibold text-sm text-gray-700">
                            Name
                        </span>
                        <input
                            type="text"
                            placeholder="Omurice"
                            name="name"
                            value={ item.name }
                            onChange={ ( e ) => handleItemChange( index - 1, { ...item, name: e.target.value } ) }
                            className="form_input"
                        />
                    </label>
                    <label className="w-1/3">
                        <span className="font-satoshi font-semibold text-sm text-gray-700">
                            Quantity
                        </span>
                        <input
                            type="number"
                            placeholder="2"
                            name="quantity"
                            className="form_input"
                            value={ item.quantity }
                            onChange={ ( e ) => handleItemChange( index - 1, { ...item, quantity: e.target.value } ) }
                        />
                    </label>
                    <label className="w-1/3">
                        <span className="font-satoshi font-semibold text-sm text-gray-700">
                            Amount
                        </span>
                        <input
                            type="number"
                            placeholder="$12"
                            name="amount"
                            className="form_input"
                            step={ 0.01 }
                            value={ item.amount }
                            onChange={ handleItemAmount }
                        />
                    </label>
                </section>
                <section>
                    <label className="w-full">
                        <span className="font-satoshi font-semibold text-sm text-gray-700">
                            Members
                        </span>
                        <div className="flex-start sm:max-w-full my-2">
                            <div className="flex-start flex-wrap sm:flex-row gap-1">
                                { owners.map( ( owner, idx ) =>
                                (
                                    <MemberBubble key={ idx } owner={ owner } index={ idx } handleRemoveBubble={ handleRemoveBubble } />
                                ) ) }
                            </div>

                        </div>
                        <select
                            placeholder="John Doe, Jane Doe, ..."
                            name="owners"
                            className="form_input"
                            onChange={ ( e ) => handleAddOwner( e ) }
                            required
                        >
                            <option value="" selected>Select all members that ordered this item</option>
                            { members.map( ( member, index ) =>
                            (
                                <option value={ member.name } key={ index } className="text-base py-2">{ member.name }</option>
                            ) ) }
                        </select>
                    </label>
                </section>
            </section>
        </label>
    );
};

export default ItemField;
