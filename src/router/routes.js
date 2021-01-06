export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'Список персонажей'
        }
    },
    {
        path: '/char/:charID',
        name: 'char',
        component: () => import('@/views/Char.vue'),
        meta: {
            title: 'Grut'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: {
            title: 'О нас'
        }
    },
    {
        path: '/404',
        name: 'Not Found',
        component: () => import('@/views/404.vue'),
        meta: {
            title: 'Страница не найдена'
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404'
    }
]
