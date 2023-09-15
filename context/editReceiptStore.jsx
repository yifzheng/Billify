import { create } from 'zustand'

const useEditReceiptStore = create( ( set ) => ( {
    editReceipt: {
        resturantName: '',
        items: [],
        tax: undefined,
        tip: undefined,
        total: undefined,
        contribution: []
    },
    members: [ { name: '' } ],
    setMembers: ( members ) => set( { members } ),
    // Setter methods for the keys in editReceipt
    setRestaurantName: ( restaurantName ) =>
        set( ( state ) => ( { editReceipt: { ...state.editReceipt, restaurantName } } ) ),
    setItems: ( items ) =>
        set( ( state ) => ( { editReceipt: { ...state.editReceipt, items } } ) ),
    updateItem: ( updatedItem ) =>
        set( ( state ) => ( {
            editReceipt: {
                ...state.editReceipt,
                items: state.editReceipt.items.map( ( item ) =>
                    item.id === updatedItem.id ? updatedItem : item
                ),
            },
        } ) ),
    setTax: ( tax ) => set( ( state ) => ( { editReceipt: { ...state.editReceipt, tax } } ) ),
    setTip: ( tip ) => set( ( state ) => ( { editReceipt: { ...state.editReceipt, tip } } ) ),
    setTotal: ( total ) =>
        set( ( state ) => ( { editReceipt: { ...state.editReceipt, total } } ) ),
    setContribution: ( contribution ) =>
        set( ( state ) => ( { editReceipt: { ...state.editReceipt, contribution } } ) ),
    setEditReceipt: ( newEditReceipt ) =>
        set( ( state ) => ( { editReceipt: { ...state.editReceipt, ...newEditReceipt } } ) ),
    reset: () => set( {
        resturantName: '',
        items: [],
        tax: undefined,
        tip: undefined,
        total: undefined,
        contribution: []
    } )
} ) )

export default useEditReceiptStore