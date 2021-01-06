import axios from 'axios';

export default {
    setChars(context) {
        axios.get('/json/characters.json')
            .then(res => {
                if (res.status === 200) {
                    context.commit('changeChars', res.data)
                } else {
                    context.commit('changeChars', [])
                }
            });
    }
}
