const express = require('express')

const app = express()
app.use(express.json())
const PORT = 5050
/*1) /delete-recept -> 
   - Обращаясь по этому эндпоинту, должно происходить удаление рецепта по его индексу в массиве .
для этого эндпоинта использовать http метод DELETE*/

let receptArray = [
    {
        name: 'Медовое печенье с корицей',
        ingerdient: ["Яйца - 2 шт", "Сахар - 130 г", "Мед - 2 ст.л", "Сода - 0,5 ч.л",
            "Корица - 1 ст.л. (по вкусу) ", "Мука - 1,5 стакана"],
        kol: "10шт"
    }
]
function DeletRecept(req, res) {
    got = req.body
    console.log(got)
    let IndexArray = got.index
    for (let i = 0; i < receptArray.length; i++) {
        let ingerdientArray = receptArray[i].ingerdient
        let new_ingerdiet = ingerdientArray.splice(IndexArray, 1)
        console.log("Результат после удаление:", ingerdientArray)
    }
    res.status(201).json("received index ")
}
app.post("/index", DeletRecept)
/*2) /edit-recept
   - Обращаюсь по этому эндпоинту, должно происходить изменение рецепта (например его название), 
поиск необходимого рецепта для непосредственного изменения можно сделать по его индексу в массиве .
для этого эндпоинта использовать http метод PATCh*/
function edit_receptArray(req, res) {
    NEW_NAME = req.body
    const edit_name = NEW_NAME.name
    const index_recepts = NEW_NAME.index
    receptArray[index_recepts].name = edit_name
    console.log(receptArray)
    res.status(201).json("Baking name changed")

}
app.patch("/edit_name", edit_receptArray)
/*3) По мимо всего прочего, текущее создание рецепта createRecept добавляет рецепт в конец массива 
и когда мы запрашиваем все рецепты (DB_RECEPTS), новые созданные рецепты, в ответе стоят в самом 
конце, нужно сделать чтобы новые были в начале, а старые в конце ! */
function createRecept(req, res) {
    const creat = req.body
    let g = receptArray.push(creat)
    console.log("ALL_RECEPTS", receptArray)
    console.log("---------------------------------------------------------------------------------------------")

    console.log(receptArray.reverse())
    res.status(201).json("Successfully created")
}
app.post("/creatRecept", createRecept)


app.listen(PORT, () => {
    console.log("Приложение запущено на порту:", PORT)
})
