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
app.listen(port, () => {
    console.log(`server is up on ${port}`)
})
