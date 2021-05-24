// Домашняя работа №6

// п.1.2.3 галлерея товаров

function makeGallery() {

    var goods = [ //пусть нам дана база товаров 
        { name: "lexus Bike", price: 300 },
        { name: "Mountin Trike", price: 200 },
        { name: "Stels", price: 150 },
    ];

    var cart = []; //- корзина
    var cartForm;
    
    var gallery = document.createElement("div"); //Создаем элемент для галереи товаров
    gallery.classList.add("gallery");
    activeHW.insertAdjacentElement("beforeend", gallery);

    var cartGoCutton = document.createElement("div");
    cartGoCutton.classList.add("gallery__top_cart");
    cartGoCutton.classList.add("gallery__top_cart-goto");
    cartGoCutton.setAttribute("cart", "1");
    cartGoCutton.innerHTML = `Перейти в корзину`;
    cartGoCutton.addEventListener('click', openCart);

    var cartGoCuttonAfter = document.createElement("div");
    cartGoCuttonAfter.classList.add("gallery__top_cart-goto-after");
    cartGoCuttonAfter.innerHTML = `0`;
    cartGoCutton.append(cartGoCuttonAfter);
        
    gallery.append(cartGoCutton);

    var galleryBottom = document.createElement("div"); // создаем поле для маленьких карточек
    galleryBottom.classList.add("gallery__bottom");
    gallery.append(galleryBottom);
    
    for (var i = 0; i < goods.length; i++){
        goods[i].imageIconSrc = `img/small${i}.jpg`;// Добавим информацию о местонахождении картиное товара - маленьких
        goods[i].imageSrc = `img/big${i}.jpg`; // и больших
        var currentIcon = createIcon(goods[i]); // создаем интерфейсные элементы карточен товара (маленьких)
        currentIcon.id = "icon" + i;
        galleryBottom.append(currentIcon); //помещаем карточку в контейнер для карточек
    }

    var currentGood = 0; //Товар по умолчания для отображения в большом формате
  
    var galleryTop = document.createElement("div"); //создаем элемент для размещения выбранного товара
    galleryTop.classList.add("gallery__top");
    gallery.append(galleryTop);

    var galleryTopCaption = document.createElement("div"); //Размещаем заглавие
    galleryTopCaption.innerText = goods[currentGood].name;
    galleryTopCaption.classList.add("gallery__top_caption");
    galleryTop.append(galleryTopCaption);

    var galleryTopPrice = document.createElement("div"); //Размещаем цену
    galleryTopPrice.innerText = goods[currentGood].price+"$";
    galleryTopPrice.classList.add("gallery__top_price");
    galleryTop.append(galleryTopPrice);

    var cartButton = document.createElement("div"); //Создаем кнопку добавления в корзину
    cartButton.classList.add("gallery__top_cart");
    cartButton.innerHTML = "&#129530; Добавить в корзину";
    cartButton.addEventListener("click", addToCart);
    galleryTop.append(cartButton);

    // *************************************
    //п.1 Проверка наличия большого рисунка
    // **************************************

    var galleryTopImage = document.createElement("img"); //большой рисунок
    galleryTopImage.onerror = function () { //если возникает ошибка при загрузке большого рисурка (н-р его нету),
        galleryTopImage.src = goods[currentGood].imageIconSrc; // то вставляется маленький рисунок. Можно придумать и другую обработку события
    };  
    galleryTopImage.src = goods[currentGood].imageSrc;
    galleryTop.append(galleryTopImage);

    function createIcon(good) {
        var icon = document.createElement("div");
        icon.classList.add("gallery__bottom_icon");
        icon.addEventListener("click", iconClick);
        var caption = document.createElement("h3");
        caption.classList.add("gallery__bottom_heading");
        caption.innerText = good.name;
        icon.append(caption);
        var img = document.createElement("img");
        img.src = good.imageIconSrc;
        icon.append(img);
        var price = document.createElement("div");
        price.classList.add("gallery__bottom_price");
        price.innerText = good.price+"$";
        icon.append(price);

        return icon;
    }


    function iconClick() {
        
        currentGood = this.id.slice(-1);
        galleryTopImage.src = goods[currentGood].imageSrc;
        galleryTopCaption.innerText = goods[currentGood].name;
        galleryTopPrice.innerText = goods[currentGood].price + "$";
        // console.log(this);
    }

     // *************************************
    //п.2 Добавление товара в корзину
    // **************************************
    
    function addToCart() {
        var isInCart;
        // console.log(cart.length);
        cart.forEach(function (item) {
            // console.log(item.id, currentGood);
            isInCart = (item.id == parseInt(currentGood)) ? true : false;
            }
        );
        // console.log(isInCart);

        if (isInCart) {
            cart[parseInt(currentGood)].count++;
        } else {
            cart.push({
                id: parseInt(currentGood),
                count: 1
            });
        }
        cartGoCuttonAfter.innerHTML =cart.length;
        // console.log(cart);
    }

     // *************************************
    //п.2 Просмотр корзины, суммы покупки и покупка
    // **************************************

    function openCart() {
        if ((cart.length > 0)&&(cartForm==null)) { //Создаем форму для корзины

            cartForm = document.createElement("div");
            cartForm.classList.add("gallery__top_cart-form");
            cartForm.setAttribute("cart", "1");
            gallery.append(cartForm);

            var cartItemCaption = document.createElement("div");
            cartItemCaption.classList.add("gallery__top_cart-form-caption");
            cartItemCaption.innerText = "Корзина";
            cartItemCaption.setAttribute("cart", "1");
            cartForm.append(cartItemCaption);

            var cartItem = document.createElement("div");
            cartItem.classList.add("gallery__top_cart-form-item");
            cartItem.setAttribute("cart", "1");
            cartForm.append(cartItem);
            var total = 0;
            
            for (index = 0; index < cart.length;index++){
                
                var goodIndex = cart[index].id;
                var itemCost = goods[goodIndex].price * cart[index].count;
                total += itemCost;

                var cartItemName = document.createElement("div");
                cartItemName.innerText = goods[goodIndex].name;
                cartItemName.setAttribute("cart", "1");
                cartItem.append(cartItemName);
                var cartItemPrice = document.createElement("div");
                cartItemPrice.innerText = goods[goodIndex].price + "$ ";
                cartItemPrice.setAttribute("cart", "1");
                cartItem.append(cartItemPrice);

                var cartItemCount = document.createElement("div");
                cartItemCount.innerText = cart[index].count;
                cartItemCount.setAttribute("cart", "1");
                cartItem.append(cartItemCount);

                var cartItemCost = document.createElement("div");
                cartItemCost.setAttribute("cart", "1");
                cartItemCost.innerText = itemCost+"$";
                cartItem.append(cartItemCost);
            };
            
            var cartItemTotal = document.createElement("div");
            cartItemTotal.classList.add("gallery__top_cart-form-total");
            cartItemTotal.setAttribute("cart", "1");
            cartItemTotal.innerText = "ИТОГО: "+total+"$";
            cartForm.append(cartItemTotal);

            var cartButtonBuy = document.createElement("div");
            cartButtonBuy.classList.add("gallery__top_cart-form-buy");
            cartButtonBuy.setAttribute("cart", "1");
            cartButtonBuy.innerText = "Купить";
            cartButtonBuy.onclick = function () {
                alert("Покупка будет выслана в ближайшее время!")
            }
            cartForm.append(cartButtonBuy);
            
            var body = document.querySelector("body");
            
            //Выход из корзины по нажатию в бюбое место вне формы корзины
            body.onclick = function (e) {
                if (!(e.target.getAttribute("cart") == 1)) {
                    cartForm.remove();
                    cartForm = null;
                    body.onclick = null;
                }
            }
            
        }

    }
   
}