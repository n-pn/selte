<script>
    import _, { goto } from '../components/Router.svelte'
</script>

<h1>Home</h1>
<p>Welcome to my website</p>

<button on:click={() => goto('/blog/me')}>Me!</button>
