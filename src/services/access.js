
const PATH = process.env.NEXT_PUBLIC_BACKEND_AUTH;

export async function postLogin(username, password) {
    try {
        const response = await fetch(`${PATH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-version": "1"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
