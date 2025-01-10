export const mapRoutesByRole = (routes, role) => {
  return routes.filter((route) => route.roles.includes(role))
}
