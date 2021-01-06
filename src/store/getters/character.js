export default {
    getChars: state => state.charList,

    getChar: state => id => state.charList.find(charList => charList.id === id)
}
