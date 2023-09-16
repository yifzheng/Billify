import { create } from 'zustand';

const useReceiptStore = create( ( set ) => ( {
    members: [ { name: '' } ],
    resturantName: "",
    items: [ {
        name: '', amount: undefined, quantity: 1, members: []
    } ],
    tax: 0,
    tip: 0,
    total: 0,
    contribution: [],
    setMembers: ( members ) => set( { members } ),
    setResturantName: ( resturantName ) => set( { resturantName } ),
    setItems: ( items ) => set( { items } ),
    setTax: ( tax ) => set( { tax } ),
    setTip: ( tip ) => set( { tip } ),
    setTotal: ( total ) => set( { total } ),
    setContribution: ( contribution ) => set( { contribution } ),
    reset: () => set( {
        members: [ { name: '' } ],
        resturantName: "",
        items: [ {
            name: '', amount: undefined, quantity: 1, members: []
        } ],
        tax: undefined,
        tip: undefined,
        total: undefined,
        contribution: []
    } )
} ) );

export default useReceiptStore;