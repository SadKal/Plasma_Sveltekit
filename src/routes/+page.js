export const load = async () => {
	const response = await fetch('http://localhost:4000/games');
	const games = await response.json();

    let gamesData = [];
    let randomIndex;
    let randomObject; 
    
    let i=0;
    while(i<10){
        //Saco un indice aleatorio y un objeto aleatorio del json
        randomIndex = Math.floor(Math.random() * games.length);
        randomObject = games[randomIndex];
        //Sigo sacando hasta que encuentro uno que no esté en el array
        if(!gamesData.includes(randomObject)){
            gamesData.push(randomObject);
            i++;
        };
    };

	return { gamesData };
};