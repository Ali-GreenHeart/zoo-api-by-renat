import express from 'express'
import port from '../utils/port.js'
import animals from './db/animals.js'
const app = express()


app.get('/animals', (req, res) => {
    res.status(200).json(animals)
})
app.get('/animals/:id', (req, res) => {
    const animal = animals.find(({ id }) => id === req.params.id)
    if (animal) {
        res.status(200).json(animal)
    } else {
        res.status(404).json({ message: 'Animal Not Found' })
    }
})

app.get('/animals/type/:type', (req, res) => {
    const animalsByType = animals.filter(({ type }) => type === req.params.type)
    if (animalsByType.length > 0) {
        res.status(200).json(animalsByType)
    } else {
        res.status(404).json({ message: 'No such type of animals', searchedType: req.params.type })
    }
})
app.get('/animals/count/:type', (req, res) => {
    const animalsCountByType = animals.filter(({ type }) => type === req.params.type).length
    if (animalsCountByType > 0) {
        res.status(200).json(animalsCountByType)
    } else {
        res.status(404).json({ message: 'No such type of animals', searchedType: req.params.type })
    }
})
app.get('/animals/calculateAverageAge/:type', (req, res) => {
    const animalsByType = animals.filter(({ type }) => type === req.params.type)
    const animalsByTypeLength = animalsByType.length
    if (animalsByTypeLength == 0) {
        res.status(404).json({ message: 'No such type of animals', searchedType: req.params.type })
        return;
    }
    const sumOfAges = animalsByType.reduce((a, b) => a + b.age, 0)
    const average = (sumOfAges / animalsByTypeLength).toFixed(1)
    res.status(200).json({ type: req.params.type, average })
})

// post  -> siz yazacaqsiniz
// put -> siz yazacaqsiniz

app.put('/animals/hbd/:id', (req, res) => {
    // let isFound = false;  // flag variable
    let animalName = ''  // flag variable
    animals = animals.map((animal) => {
        if (animal.id === req.params.id) {
            animalName = animal.name
            return { ...animal, age: animal.age + 1 }
        }
        return animal;
    })
    if (animalName.length > 0) {
        res.status(200).json({ message: `HBD to you dear ${animalName}` })
    } else {
        res.status(404).json({ message: 'No such animal' })
    }
})
app.listen(port, () => {
    console.log(`server is up on ${port}`)
})
