const baseURL = 'http://localhost:4000';

export const getGames = async () => {
    try {
        const response = await fetch(`${baseURL}/games`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Couldn't get games:", error);
    }
};

export async function addGameToUser(userToUpdate, gameId) {
    try {
        const responseUser = await fetch(`http://localhost:4000/users/${userToUpdate.id}`);
        const user = await responseUser.json();
        try {
            const currentDate = new Date().getTime() / 1000;
            const newGame = {
                id: gameId,
                hoursplayed: 0,
                buydate: Math.floor(currentDate)
            };
            const games = [...user.games, newGame];

            const response = await fetch(`${baseURL}/users/${userToUpdate.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    games: games
                })
            }
            );

            return response.json();
        }
        catch (err) {
            console.error('Error updating user:', err);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}


