export const ROUTES = [
  {
    path: '/',
    name: 'Dashboard',
    icon: 'pi-home',
    component: 'DashboardView',
    roles: ['user', 'admin'],
  },
  {
    path: '/admin',
    name: 'Admin Panel',
    icon: 'pi-home',
    component: 'AdminView',
    roles: ['admin'],
  },
  {
    path: '/product',
    name: 'Product',
    icon: 'pi-home',
    component: 'ProductView',
    roles: ['user', 'admin'],
  },
  {
    path: '/customer',
    name: 'Customer',
    icon: 'pi-user',
    component: 'ProfileView',
    roles: ['user', 'admin'],
  },
  {
    path: '/stock',
    name: 'Stock',
    icon: 'pi-home',
    component: 'StockView',
    roles: ['user', 'admin'],
  },
  {
    path: '/logout',
    name: 'Logout',
    icon: 'pi-home',
    component: 'ProfileView',
    roles: ['user', 'admin'],
  },
]
