export async function load({ params }) {
    const response = await fetch("http://localhost:4000/games");
    const games = await response.json();

    let id = params.gameId;
	const game = games.find( (game) => game.id == id);

    
    return { game };
}
