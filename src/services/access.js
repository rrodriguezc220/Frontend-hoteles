
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

export async function postRegister(FormData) {

    const rawFormData = {
        firstname: FormData.get("firstname"),
        lastname: FormData.get("lastname"),
        username: FormData.get("username"),
        password: FormData.get("password"),
        rol: "ADMIN",
    }

    try {
        const response = await fetch(`${PATH}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-version": "1"
            },
            body: JSON.stringify(rawFormData)
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
