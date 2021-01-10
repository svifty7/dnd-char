export default {
    setChars(state, payload) {
        state.charList = payload
    },

    setChar(state, payload) {
        state.character = state.charList.find(item => item.id === payload)
    }
}
