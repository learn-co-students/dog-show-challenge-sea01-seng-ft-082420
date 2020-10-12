document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById('table-body');
    const editForm = document.getElementById('dog-form');
    fetchDogs();

    function fetchDogs(){
        fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(dogs => buildDogTable(dogs))
    }

    function buildDogTable(dogs){
        dogTable.innerHTML = '';
        dogs.forEach(dog => {
            const tableRow = document.createElement('tr');
            const dogName = document.createElement('td');
            const dogBreed = document.createElement('td');
            const dogSex = document.createElement('td');
            const editDog = document.createElement('td');
            const editBtn = document.createElement('button');

            dogName.textContent = dog.name;
            dogBreed.textContent = dog.breed;
            dogSex.textContent = dog.sex;
            editBtn.textContent = 'Edit';

            dogTable.appendChild(tableRow);
            tableRow.appendChild(dogName);
            tableRow.appendChild(dogBreed);
            tableRow.appendChild(dogSex);
            tableRow.appendChild(editDog);
            editDog.appendChild(editBtn);
            editBtn.addEventListener('click', () => {
                updateEditFields(dog);
            });
        })
    }

    function updateEditFields(dog){
        editForm.name.value = dog.name;
        editForm.breed.value = dog.breed;
        editForm.sex.value = dog.sex;
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitEdit(dog);
        });
    }

    function submitEdit(dog){
        const data = {
            name: editForm.name.value,
            breed: editForm.breed.value,
            sex: editForm.sex.value
        }
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(() => {
            editForm.name.value = "";
            editForm.breed.value = "";
            editForm.sex.value = "";
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
            });
            fetchDogs();
        });
    }
})