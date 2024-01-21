export async function load({ cookies }) {
    const response = await fetch('http://localhost:4000/users');
    const users = await response.json();
    //????????????????????????????????????????????????????
    //const user = users.find(user => user.id === "1");
    const user = cookies.get('user');
    console.log(cookies.get('user'));
    let slug = "?id=";
    for (const game of user.games) {
        let toConcat = `${game.id}&id=`;
        slug = slug + toConcat;
    }
    slug = slug.substring(0, slug.length - 4);

    const responseGames = await fetch(`http://localhost:4000/games${slug}`);
    const games = await responseGames.json();

    user.games = user.games.map((userGame) => { return { ...games.find((game) => userGame.id === game.id), ...userGame } });

    return user;
}