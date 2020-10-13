// document.addEventListener('DOMContentLoaded', () => {

// })

const table = document.getElementById("table-body")
const editForm = document.getElementById("dog-form")

getDogs()

function getDogs() {
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogs => {
        populateTable(dogs)
    })
}

function populateTable(dogs){
    dogs.forEach(dog => {
        let tr = document.createElement('tr')

        let name = document.createElement("td")
        name.textContent = dog.name

        let breed = document.createElement("td")
        breed.textContent = dog.breed

        let sex = document.createElement("td")
        sex.textContent = dog.sex

        let edit = document.createElement("button")
        edit.textContent = "edit dog"
        edit.addEventListener("click", (e) => {
            editDog(dog)
        })

        tr.append(name, breed, sex, edit)
        table.append(tr)
    })
}

function editDog(dog) {
    editForm.innerHTML = 
    `
    <input type="text" name="name" placeholder="${dog.name}" value="" />
    <input type="text" name="breed" placeholder="${dog.breed}" value="" />
    <input type="text" name="sex" placeholder="${dog.sex}" value="" />
    <input type="submit" value="Submit" />
    `
    editForm.addEventListener("submit", (e) =>{
        fetch(("http://localhost:3000/dogs" + "/" + dog.id), {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify({
                name : e.target.name.value,
                breed : e.target.breed.value,
                sex : e.target.sex.value
            })
        })
        // .then(res => res.json())
        // .then(json => console.log(json))
    })
}