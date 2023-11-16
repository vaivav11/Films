const baseUrl = `localhost:3000`;

export const loadFilm = () => {
    return fetch(baseUrl).then((res) => res.json());
}

export const getFilm = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());

}

export const createFilm = (film) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: film.title,
            compeleted: film.compeleted
        })
    }).then((res) => res.json());
}

export const updateFilm = (film) => {
    return fetch(`${baseUrl}/${film.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: film.id,
            title: film.title,
            compeleted: film.compeleted
        })
    }).then((res) => res.json());
}

export const deleteFilm = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    }).then((res) => res.json());
}