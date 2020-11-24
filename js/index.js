document.addEventListener("DOMContentLoaded", () => {
    
    let nextPage = 1 
    const monsterContainer = document.getElementById("monster-container")

    getMonsters()
    buildCreateForm()
    buttons()

    function getMonsters(value = ""){
        monsterContainer.innerHTML = ""
        if (value == "next"){
            nextPage += 1
        }
        else if (value == "back" && nextPage == 1){
            nextPage = 1
        }
        else if (value == "back")
        {
            nextPage -=1
        }

        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${nextPage}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => buildMonster(monster)))
    }

    function buttons(){
        const forward = document.getElementById("forward")
        forward.addEventListener("click", () => getMonsters("next"))

        const back = document.getElementById("back")
        back.addEventListener("click", ()=> getMonsters("back"))
    }


    function buildMonster(monster){
       

        const monsterDiv = document.createElement("div")

        const name = document.createElement("h2")
        name.textContent = monster.name

        const age = document.createElement("h4")
        age.textContent = `Age: ${monster.age}`

        const bio = document.createElement("p")
        bio.textContent = `Bio: ${monster.description}`

        monsterDiv.append(name, age, bio)
        
        monsterContainer.appendChild(monsterDiv)
    }


    function createMonster(e){
        e.preventDefault()
        
        const newMonster = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newMonster)
        }

        fetch("http://localhost:3000/monsters",configObj)
        .then(resp => resp.json())
        .then(getMonsters())

    }

    function buildCreateForm(){
        buildForm()
        let form = document.getElementById("monster-form")
        form.addEventListener("submit", (e) => createMonster(e))
    }

    function buildForm(){
        const formCointainer = document.getElementById("create-monster")
        
        const form = document.createElement("form")
        form.id = "monster-form"

        const submit = document.createElement("button")
        submit.textContent = "Create"
        submit.type = "submit"
        
        formItems = ["name", "age", "description"]
        formItems.forEach(item => {

            let input = document.createElement("input")
            input.placeholder = item
            input.name = item

            form.append(input)
        })
    form.appendChild(submit)
    formCointainer.appendChild(form)
    }

})