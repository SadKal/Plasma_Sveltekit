const baseURL = 'http://localhost:4000';

export function getGamePrice(id) {
	const price = Math.round((Math.log(id) + 1) * 4) - 0.01;
	return parseFloat(price);
}

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
			const currentDate = new Date().getTime();
			const newGame = {
				id: game.id,
				hoursplayed: 0,
				buydate: currentDate
			};

			let games;
			if (game.category == 1 || game.category == 2) {
				let newGames = user.games.map((userGame) => {
					if (userGame.id === game.parent_game.id) {
						return { ...userGame, dlcs: [...(userGame.dlcs || []), newGame] };
					} else {
						return userGame;
					}
				});
				games = newGames;
			} else {
				games = [...user.games, newGame];
			}
			const response = await fetch(`${baseURL}/users/${userToUpdate.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					games: games
				})
			});

			return response.json();
		} catch (err) {
			console.error('Error updating user:', err);
		}
	} catch (error) {
		console.error('Error fetching user:', error);
	}
}

export async function deleteGameAndReviewsFromUser(userToUpdate, game) {
	try {
		const responseUser = await fetch(`http://localhost:4000/users/${userToUpdate.id}`);
		const responseReviews = await fetch(`http://localhost:4000/reviews`);
		const user = await responseUser.json();
		const reviews = await responseReviews.json();
		try {
			try {
				let updateReviews;
				for (let reviewGame of reviews) {
					reviewGame = reviewGame.reviews.filter(
						(delReviews) => delReviews.name !== userToUpdate.username
					);
                    console.log(">>>>>>>>", reviewGame.reviews);
					updateReviews = await fetch(`http://localhost:4000/reviews/${reviewGame.id}`, {
						method: 'PATCH',
						body: JSON.stringify({ reviews: reviewGame.reviews }),
						headers: {
							'Content-Type': 'application/json'
						}
					});
                    console.log("<<<<<<", updateReviews);
				}
			} catch (error) {
				console.error('Error deleting reviews from user:', error);
			}

			let games = [...user.games];
			games = games.filter((updGames) => updGames.id !== game.id);

			const response = await fetch(`${baseURL}/users/${userToUpdate.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					games: games
				})
			});

			return response.json();
		} catch (err) {
			console.error('Error updating user:', err);
		}
	} catch (error) {
		console.error('Error fetching user:', error);
	}
}
