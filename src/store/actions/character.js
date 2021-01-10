import axios from 'axios';

export default {
    getChars(context) {
        return new Promise((resolve, reject) => {
            axios.get('/json/characters.json')
                .then(res => {
                    if (res.status === 200) {
                        context.commit('setChars', res.data)

                        resolve(res.data)
                    } else {
                        context.commit('setChars', [])

                        reject()
                    }
                });
        });
    },

    setChar(context, payload) {
        context.commit('setChar', payload)
    }
}
