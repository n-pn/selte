<script>
    import Home from './routes/Home.svelte'
    import About from './routes/About.svelte'
    import Blog from './routes/Blog.svelte'

    import Router, { route, match_route } from './components/Router.svelte'

    const routes = [
        route('/', Home),
        route('/about', About),
        route('/blog/:name', Blog),
    ]

    // Used for SSR. A falsy value is ignored by the Router.
    export let url = '/'

    const [component, params] = match_route(routes, url)
</script>

<style lang="scss">

</style>

<svelte:head>
    <title>Rolte</title>
</svelte:head>

<Router {url} {routes} {component} {params}>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/blog/hello">Blog - Hello</a>
        <a href="/blog/world">Blog - World</a>
    </nav>
</Router>
