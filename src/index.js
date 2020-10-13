const url = 'http://localhost:3000/dogs'
const tableBody = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')
const dogName = document.querySelector('#dog-name')
const dogBreed = document.querySelector('#dog-breed')
const dogSex = document.querySelector('#dog-sex')



document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs () {
    fetch(url)
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => buildDog(dog)))
}

function patchDog(e, dog) {
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            name: e.target[0].value,
            breed: e.target[1].value,
            sex: e.target[2].value
        })
    })
    .then(res => res.json())
    .then(() => {
        tableBody.innerHTML = ''
        getDogs()
    })
}

function buildDog(dog) {
    let tr = handleDog(dog)
    tableBody.appendChild(tr)
    tr.querySelector('button').addEventListener('click', () => editDog(dog))
}

function editDog (dog) {
    dogName.value = dog.name
    dogBreed.value = dog.breed
    dogSex.value = dog.sex
    dogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        patchDog(e, dog)
    })
}

function handleDog (dog) {
    let tr = document.createElement('tr')
    let nameTd = document.createElement('td')
    let breedTd = document.createElement('td')
    let genderTd = document.createElement('td')
    let btn = document.createElement('button')
    nameTd.innerText = dog.name
    breedTd.innerText = dog.breed
    genderTd.innerText = dog.sex
    btn.innerText = "Edit"
    btn.style = "width:100%"
    tr.appendChild(nameTd)
    tr.appendChild(breedTd)
    tr.appendChild(genderTd)
    tr.appendChild(btn)
    return tr
}