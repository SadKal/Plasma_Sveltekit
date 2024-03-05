<script>
</script>

<div class="deleteUser__container">
	<div class="deleteUser__textAndForm">
		<h1>¿Estas seguro de que realmente quieres borrar tu usuario?</h1>
		<div class="deleteUser__form">
			<form method="POST">
				<button type="submit" name="deleteUser" value="deleteUser">Si, quiero borrar este usuario.</button>
				<a href="/profile">No, me lo he pensado mejor.</a>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	.deleteUser {
		&__container {
			height: 70vh;
            width: 100%;
		}
        &__textAndForm{
            width: 70%;
            text-align: center;
            margin: 0 auto;
            position: relative;
            top: 30%;
            padding: 30px 90px;
            background-color: var(--text-color);
            color: white;
            clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);

            h1 {
                font-size: 2rem;
            }
        }
        &__form{
            form  {
                display: flex;
                justify-content: space-around;
                margin-top: 20px;
                
                button, a {
                    background-color: var(--search-mobile-focus-color);
                    padding: 10px 30px;
                    color: white;
                    clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
                }
            }
        }

    }
</style>
