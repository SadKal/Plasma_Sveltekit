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

export async function addGameToUser(userToUpdate, game) {
    try {
        const responseUser = await fetch(`http://localhost:4000/users/${userToUpdate.id}`);
        const user = await responseUser.json();
        try {
            const currentDate = new Date().getTime() / 1000;
            const newGame = {
                id: game.id,
                hoursplayed: 0,
                buydate: currentDate
            };
            let games;
            if (game.category == 1 || game.category == 2) {
                let newGames = user.games.map(userGame => {
                    console.log(userGame);
                    if (userGame.id === game.parent_game.id) {
                        console.log("GOtcha")
                        return { ...userGame, dlcs: newGame }
                    }
                    else {
                        return userGame;
                    }
                });
                console.log(newGames);
                games = newGames;
            } else {
                games = [...user.games, newGame];
            }

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


