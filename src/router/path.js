export const routes = [
    {
        path: '/',
        name: 'landing',
        component: () => import('@/views/index.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/signin',
        name: 'loginHome',
        component: () => import('@/views/authViews/login-view.vue'),
        alias: '/login' // allternative name for url or duplicate name
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/adminViews/dashboard.vue'),
        meta: { requiresAuth: true },
        alias: '/dashboard'
    },
    {
        path: '/home-*',
        name: 'homerror',
        component: () => import('@/views/error/404.vue'),
        alias: '*'
    }
]