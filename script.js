let modalQt = 1

const q = (el) => document.querySelector(el)
const qs = (el) => document.querySelectorAll(el)

//Listagem das Pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = q(".models .pizza-item").cloneNode(true)

    pizzaItem.setAttribute("data-key", index)
    pizzaItem.querySelector(".pizza-item--img img").src = item.img
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$${item.price.toFixed(2)}`
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description

    //Abrir o modal
    pizzaItem.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault()
        let key = index
        modalQt = 1

        q(".pizzaBig img").src = pizzaJson[key].img
        q(".pizzaInfo h1").innerHTML = pizzaJson[key].name
        q(".pizzaInfo .pizzaInfo--desc").innerHTML = pizzaJson[key].description
        q(".pizzaInfo .pizzaInfo--actualPrice").innerHTML = `R$${pizzaJson[key].price.toFixed(2)}`
        
        q(".pizzaInfo--size.selected").classList.remove("selected")

        qs(".pizzaInfo--size").forEach((size, sizeindex) => {
        if (sizeindex == 2) {
            size.classList.add("selected")
        }
        
        size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeindex]
        })

        q(".pizzaInfo--qt").innerHTML = modalQt
        
        q(".pizzaWindowArea").style.opacity = 0
        q(".pizzaWindowArea").style.display = "flex"
        setTimeout(() => {
            q(".pizzaWindowArea").style.opacity = 1, 2000
        })
    })


    q(".pizza-area").append(pizzaItem)

})  


//Eventos do Modal

function closeModal() { 
    q(".pizzaWindowArea").style.opacity = 0
    setTimeout(() => {
    q(".pizzaWindowArea").style.display = "none"     
}, 500
)}

//Adicionando a função closeModal no botão de cancelar e mo botão de adicionar ao carrinho
document.querySelector(".pizzaInfo--cancelButton", ".pizzaInfo--cancelMobileButton").addEventListener("click", closeModal)
document.querySelector(".pizzaInfo--addButton").addEventListener("click", closeModal)
