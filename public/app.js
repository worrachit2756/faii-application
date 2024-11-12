import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBJNvkc3g4w0oSYbgpWRsSxtLDSRZvFFSo",
    authDomain: "lotto-6e388.firebaseapp.com",
    projectId: "lotto-6e388",
    storageBucket: "lotto-6e388.appspot.com",
    messagingSenderId: "1049963461205",
    appId: "1:1049963461205:web:c150f04915c31ed3dd32dc"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const table = document.getElementById("table")
const form = document.getElementById("addForm")

async function handleSubmit(e) {
    console.log('function handleSubmit')
    e.preventDefault()
    try {
        const docRef = await addDoc(collection(db, 'employees'), {
            name: form.name.value,
            age: form.age.value
        })
        alert("Created Success")
        const newEmployee = await getDoc(docRef)
        showData(newEmployee)
        form.reset()
    } catch (error) {
        console.error("Created Fail ", error)
    }
}

form.addEventListener('submit', handleSubmit)

async function getEmployees(db) {
    console.log('function getEmployees')
    const empCol = collection(db, 'employees')
    const empSnapshot = await getDocs(empCol)
    return empSnapshot
}

function showData(employee) {
    console.log('function showData')
    const row = table.insertRow(-1)
    row.setAttribute('data-id', employee.id)

    const nameCol = row.insertCell(0)
    const ageCol = row.insertCell(1)
    const deleteCol = row.insertCell(2)
    const editCol = row.insertCell(3)

    nameCol.innerHTML = employee.data().name
    ageCol.innerHTML = employee.data().age

    let deleteBtn = document.createElement('button')
    deleteBtn.textContent = "Delete"
    deleteBtn.setAttribute('class', 'btn btn-danger')
    deleteBtn.setAttribute('data-id', employee.id)
    deleteCol.appendChild(deleteBtn)

    deleteBtn.addEventListener('click', async () => {
        try {
            await deleteDoc(doc(db, 'employees', deleteBtn.getAttribute('data-id')))
            row.remove()
            alert("Deleted Success")
        } catch (error) {
            console.error("Deleted Fail : ", error)
        }
    })

    let editBtn = document.createElement('button')
    editBtn.textContent = "Edit"
    editBtn.setAttribute('class', 'btn btn-primary')
    editBtn.setAttribute('data-id', employee.id)
    editCol.appendChild(editBtn)

    editBtn.addEventListener('click', () => {
        populateEditForm(employee)
    })
}

async function updateEmployee(employeeId, newData) {
    console.log('function updateEmployee')
    const employeeRef = doc(db, 'employees', employeeId)
    await setDoc(employeeRef, newData, { merge: true })

    const row = table.querySelector(`[data-id='${employeeId}']`)
    row.cells[0].innerHTML = newData.name
    row.cells[1].innerHTML = newData.age
}

function populateEditForm(employee) {
    console.log('function populateEditForm')
    form.name.value = employee.data().name
    form.age.value = employee.data().age

    form.querySelector('button[type="submit"]').textContent = "Update"

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateEmployee(employee.id, {
                name: form.name.value,
                age: form.age.value
            })
            alert("Updated Success")
            form.reset()
            form.querySelector('button[type="submit"]').textContent = "Save"
            form.removeEventListener('submit', handleUpdate)
            form.addEventListener('submit', handleSubmit)
            
        } catch (error) {
            console.error("Created Fail : ", error)
        }
    }

    form.removeEventListener('submit', handleSubmit)
    form.addEventListener('submit', handleUpdate)
}

async function init() {
    console.log('function init')
    const data = await getEmployees(db)
    data.forEach(employee => {
        showData(employee)
    })
}

init()
