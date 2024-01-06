import games from "$lib/data/games.json";

export async function load({ params }) {
    const id = +params.gameId;

	const game = games.data.find( (game) => game.id == id);

    return { game };
}
