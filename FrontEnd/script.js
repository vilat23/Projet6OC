// console.log("test connection script")

const urlApi = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");



async function getWorks() {

    const reponse = await fetch(urlApi)
    return reponse.json()

        .then(function (data) {
            console.log(data)
            for (works in data) {
                gallery.innerHTML += `<figure>
            <img src="${data[works].imageUrl}" alt="${data[works].title}">
            <figcaption>${data[works].title}</figcaption>
        </figure>`
            }

        })
}

getWorks()