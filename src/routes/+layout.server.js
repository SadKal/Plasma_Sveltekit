export async function load({ cookies }) {
    const response = await fetch('http://localhost:4000/users');
    const users = await response.json();

    const user = users.find(user => user.id === "1");

    cookies.set('user', user, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
    });

    return user;
} 