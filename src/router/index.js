import { createWebHistory, createRouter } from 'vue-router';
import routes from './routes'

const Router = createRouter({
    history: createWebHistory(
        process.env.NODE_ENV === 'production'
            ? '/dnd-char/'
            : '/'
    ),
    routes
})

export default Router
