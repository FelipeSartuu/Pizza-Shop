const q = (el) => document.querySelector(el)
const qs = (el) => document.querySelectorAll(el)

pizzaJson.map((item, index) => {
    let pizzaItem = q(".models .pizza-item").cloneNode(true)

    pizzaItem.setAttribute("data-key", index)
    pizzaItem.querySelector(".pizza-item--img img").src = item.img
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$${item.price.toFixed(2)}`
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description


    pizzaItem.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault()
        let key = index

        q(".pizzaBig img").src = pizzaJson[key].img
        q(".pizzaInfo h1").innerHTML = pizzaJson[key].name
        q(".pizzaInfo .pizzaInfo--desc").innerHTML = pizzaJson[key].description
        q(".pizzaInfo .pizzaInfo--actualPrice").innerHTML = `R$${pizzaJson[key].price.toFixed(2)}`
        qs(".pizzaInfo--size").forEach((size, sizeindex) => {
            size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeindex]
        })

        
        q(".pizzaWindowArea").style.opacity = 0
        q(".pizzaWindowArea").style.display = "flex"
        setTimeout(() => {
            q(".pizzaWindowArea").style.opacity = 1, 2000
        })
    })


    q(".pizza-area").append(pizzaItem)

})  