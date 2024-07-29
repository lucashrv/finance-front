const actions = {
    updateEntity: (state, { payload }) => {
        return { ...state, entity: { ...state.entity, ...payload } }
    },
    clearEntity: (state) => {
        return { ...state, entity: {} }
    },
    updateEntityErrors: (state, { payload }) => {
        return { ...state, entityErrors: { ...state.entityErrors, ...payload } }
    },
    clearEntityErrors: (state) => {
        return { ...state, entityErrors: {} }
    }
}

export default actions
