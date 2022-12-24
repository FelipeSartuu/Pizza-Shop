let cart = []
let modalQt = 1
let modalKey = 0

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
        modalKey = key

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

document.querySelectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item) => {
    item.addEventListener("click", closeModal)
})




q(".pizzaInfo--qtmenos").addEventListener("click", ()=> {
    
    if (modalQt > 1) {
        modalQt = modalQt - 1 
        q(".pizzaInfo--qt").innerHTML = modalQt
    }
})

q(".pizzaInfo--qtmais").addEventListener("click", ()=> {
    modalQt = modalQt + 1
    q(".pizzaInfo--qt").innerHTML = modalQt
})

//seleção de tamanho no modal

qs(".pizzaInfo--size").forEach((size, sizeindex) => {
    size.addEventListener("click", (e) => {
        q(".pizzaInfo--size.selected").classList.remove("selected")
        size.classList.add("selected")
    })
})


//Adicionar ao carrinho

q(".pizzaInfo--addButton").addEventListener("click", () => {
    let size = parseInt(q(".pizzaInfo--size.selected").getAttribute("data-key"))


    let identifier = pizzaJson[modalKey].id+"@"+size
    let key = cart.findIndex((item) => item.identifier == identifier)

    if (key > -1) {
        cart[key].qt += modalQt
    } else{

        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        })
        //Fechando  o modal depois de adicionar o item ao carrinho
        
    }

    closeModal()
    updateCart()
    
})

q(".menu-openner").addEventListener("click", () => {
    if (cart.length > 0) {
        q("aside").style.left = "0"
    }

    q(".menu-closer").addEventListener("click", () => {
        q("aside").style.left = "100vw"
    })
})

function updateCart() {

    q(".menu-openner span").innerHTML = cart.length

    if(cart.length > 0) {
        q('aside').classList.add('show');
        q('.cart').innerHTML = '';

        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt

            let cartItem = q('.models .cart--item').cloneNode(true);
            let pizzaSizeName
            
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = "P"
                    break;
                case 1:
                    pizzaSizeName = "M"
                    break
                case 2:
                    pizzaSizeName = "G"
                    break
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            q('.cart').append(cartItem);

            cartItem.querySelector("img").src = pizzaItem.img
            cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName
            cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt
            cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--
            } else { 
                cart.splice(i, 1)
            }
            updateCart()
        })
        cartItem.querySelector(".cart--item-qtmais").addEventListener("click", () => {
            cart[i].qt++
            updateCart()
            })
            
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        q(".subtotal span:last-child").innerHTML = `R$${subtotal.toFixed(2)}`
        q(".desconto span:last-child").innerHTML = `R$${desconto.toFixed(2)}`
        q(".total span:last-child").innerHTML = `R$${total.toFixed(2)}`
    

    } else {
        q('aside').classList.remove('show');
        q("aside").style.left = "100vw"
    }
}