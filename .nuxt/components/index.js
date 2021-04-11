import { wrapFunctional } from './utils'

export { default as Logo } from '../../components/Logo.vue'
export { default as Navbar } from '../../components/navbar.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyNavbar = import('../../components/navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => wrapFunctional(c.default || c))
