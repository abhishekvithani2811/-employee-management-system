const initialState = {
    data: [],
    sortOrder: 'ascending',
    sortColumn: '', 
};
const viewDetail_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "viewDetail_Action__Type":
            return { ...state, data: action.payload };

        case "SET_SORTING_ACTION_TYPE":
            return {
                ...state,
                sortOrder: action.payload.order,
                sortColumn: action.payload.column,
            };

        default:
            return state;
    }
};


export default viewDetail_Reducer;

