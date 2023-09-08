import { create } from 'zustand';

const useReceiptStore = create( ( set ) => ( {
    members: [ { name: '' } ],
    resturantName: "",
    items: [ {
        name: '', price: undefined, quantity: 1, members: []
    } ],
    tax: undefined,
    tip: undefined,
    total: undefined,
    setMembers: ( members ) => set( { members } ),
    setResturantName: ( resturantName ) => set( { resturantName } ),
    setItems: ( items ) => set( { items } ),
    setTax: ( tax ) => set( { tax } ),
    setTip: ( tip ) => set( { tip } ),
    setTotal: ( total ) => set( { total } ),
    reset: () => set( {
        members: [ { name: '' } ],
        resturantName: "",
        items: [ {
            name: '', price: undefined, quantity: 1, members: []
        } ],
        tax: undefined,
        tip: undefined,
        total: undefined,
    } )
} ) );

export default useReceiptStore;