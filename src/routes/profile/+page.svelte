<script>
import Profile from "$lib/components/profile/Profile.svelte"; 
export let data;
export let { username, email } = data;

</script>

<Profile {username} {email}/>

