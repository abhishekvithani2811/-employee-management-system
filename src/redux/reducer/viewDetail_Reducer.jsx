
// const initialState = {
//     data: [],
// }

// const viewDetail_Reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "viewDetail_Action__Type":
//             return { ...state, data: action.payload };
        
        
//         default:
//             return state
//     }
// }



// export default viewDetail_Reducer
// In your reducer file (viewDetail_Reducer.js)

// In your reducer file (viewDetail_Reducer.js)




const initialState = {
    data: [],
    sortOrder: 'ascending',
    sortColumn: '', // Add a field to store the current sort column
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

