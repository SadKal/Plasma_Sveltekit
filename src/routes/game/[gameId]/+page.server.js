export async function load({ params }) {
    const { gameId } = params;  
    const response = await fetch(`http://localhost:4000/games/${gameId}`);
    const game = await response.json();

    return { game };
}
