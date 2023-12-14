// console.log("test connection script")

const url = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");



const getWorks = () => {
    fetch(url)
        .then(function (response) {
            return response.json()
        })

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