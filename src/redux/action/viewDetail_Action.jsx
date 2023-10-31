
export const viewDetail_Action = (data) => {
    return {
        type: "viewDetail_Action__Type",
        payload: data
    }
}

export const setSortingAction = (column, order) => {
    return {
        type: "SET_SORTING_ACTION_TYPE",
        payload: { column, order },
    };
};