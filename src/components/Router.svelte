<script context="module">
    const ROUTE_RE = /(:|\*)([a-z_]+)/g

    export function route(route, component) {
        let regexp = route.replace(/^\/|\/$/g, '')
        let params = []
        let matched = null

        while ((matched = ROUTE_RE.exec(route))) {
            let param = matched[2]
            params.push(param)

            let replace = matched[1] === ':' ? '([^/]+)' : '(.+?)'
            regexp = regexp.replace(matched[0], replace)
        }

        return [new RegExp('^/?' + regexp + '/?$'), component, params]
    }

    export function match_route(routes, href) {
        const url = href.split(/\/?\?/)[0]
        // TODO: parse query + hash

        for (let [route, component, param_names] of routes) {
            let matched = url.match(route)
            if (matched) {
                let params = {}

                for (let i = 0; i < param_names.length; i++) {
                    let name = param_names[i]
                    params[name] = matched[i + 1]
                }

                return [component, params]
            }
        }

        return [null, {}]
    }

    export function goto(url) {
        var popStateEvent = new PopStateEvent('popstate', { state: url })
        dispatchEvent(popStateEvent)
    }
</script>

<script>
    import { onMount } from 'svelte'

    export let url = ''
    export let routes = []
    export let component = null
    export let params = {}

    function change_route(url) {
        let matched = match_route(routes, url)

        component = matched[0]
        params = matched[1]

        if (component) {
            history.pushState({ params }, '', url)
            return true
        }
        return false
    }

    function handleClick(evt) {
        const target = evt.target
        if (target.nodeName !== 'A') return
        url = target.getAttribute('href') || ''
        if (change_route(url)) evt.preventDefault()
    }

    function handlePopstate(evt) {
        url = evt.state
        if (!change_route(url)) window.location.href = url
    }
</script>

<svelte:window on:popstate={handlePopstate} />

<div class="router" on:click={handleClick}>
    <slot />
    <svelte:component this={component} bind:url bind:params {...$$props} />
</div>
