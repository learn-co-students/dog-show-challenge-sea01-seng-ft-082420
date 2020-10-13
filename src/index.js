document.addEventListener('DOMContentLoaded', () => {

  let tableBody = document.querySelector('#table-body')
  let dogForm = document.querySelector('#dog-form')
  

  fetchDogs()

  function fetchDogs (){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => {
      tableBody.innerHTML =''
      dogs.forEach(dog => showDog(dog))
    })
  }

  function patchDog(dog){
    fetch (`http://localhost:3000/dogs/${dog.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(dog)
    })
    .then (resp => resp.json())
    .then (dog => {
      dogForm.name.value = dog.name,
      dogForm.breed.value = dog.breed,
      dogForm.sex.value = dog.sex

      dogForm.addEventListener('submit', (e)=> {
        e.preventDefault()
        editDog(dog)
      })
    })
  }

  function showDog(dog){
    let row = tableBody.insertRow(0)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    let cell4 = row.insertCell(3)

    cell1.innerText =dog.name
    cell2.innerText = dog.breed
    cell3.innerText = dog.sex
    cell4.innerText = 'Edit Dog'

    cell4.addEventListener('click', () => patchDog(dog))

  }

  function editDog(e){
    let dogInfo = {
      name: dogForm.name.value,
      breed: dogForm.breed.value,
      sex: dogForm.sex.value
    }
    fetch(`http://localhost:3000/dogs/${e.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify (dogInfo)
    })
    .then (resp => resp.json())
    .then ((dog) => {
      dogInfo
      dogForm.addEventListener('submit', (e) => {
         e.preventDefault()
    })
      fetchDogs()
    })
  }

})