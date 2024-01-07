export async function load(){
    const response = await fetch("http://localhost:4000/games");
    const responseGenres = await fetch("http://localhost:4000/genres");
    
    const games = await response.json();
    const genres = await responseGenres.json();

    //Most sold games
    let mostSold = [];
    let randomIndex;
    let randomObject; 
    let i=0; 
    
    while(i<6){
        randomIndex = Math.floor(Math.random() * games.length);
        randomObject = games[randomIndex];
        if(!mostSold.includes(randomObject)){
            mostSold.push(randomObject);
            i++;
        }
    }

    return { mostSold, genres }
}