export function apiServices() {
    async function fetchPoke(url) {
        const resp = await fetch(url, {
            mode: 'cors',
        });
        return resp.json();
    }

    async function addPoke(url, body) {
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-type': 'application/json',
            }),
        });
        return resp.json();
    }

    async function removePoke(url) {
        const resp = await fetch(url, {
            method: 'DELETE',
        });
        return resp.json();
    }

    return {
        fetchPoke,
        addPoke,
        removePoke,
    };
}
