import App from './App.svelte'

new App({
    target: document.getElementById('app'),
    hydrate: true,
    props: {
        url: window.location.pathname,
    },
})
