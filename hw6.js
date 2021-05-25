// Домашняя работа №6
// п.1.2.3 галлерея товаров
function makeGallery() {
    var goods = [ //пусть нам дана база товаров 
        { name: "lexus Bike", price: 300 },
        { name: "Mountin Trike", price: 200 },
        { name: "Stels", price: 150 },
    ];
    var currentGood = 0; //Товар по умолчанию для отображения
    var cart = []; //- корзина, изначально пустая
   
    //Создаем верстку
    var gallery = document.createElement("div"); //элемент для галереи товаров
    gallery.classList.add("gallery");
    activeHW.insertAdjacentElement("beforeend", gallery);

    var cartOpenForm = document.createElement("div");//кнопка открытия корзины
    cartOpenForm.classList.add("gallery__top_cart");
    cartOpenForm.classList.add("gallery__top_cart-goto");
    cartOpenForm.setAttribute("cart", "1"); //принадлежность в форме корзины
    cartOpenForm.innerHTML = `Перейти в корзину`;
    cartOpenForm.addEventListener('click', openCart);//создаем обработчик для открытия формы корзины
    gallery.append(cartOpenForm);
    var cartOpenFormAfter = document.createElement("div");//Для отображения количества товаров в корзине
    cartOpenFormAfter.classList.add("gallery__top_cart-goto-after");
    cartOpenFormAfter.innerHTML = "0";
    cartOpenForm.append(cartOpenFormAfter);

    var galleryBottom = document.createElement("div"); // Контейнер для маленьких карточек товара
    galleryBottom.classList.add("gallery__bottom");
    gallery.append(galleryBottom);
    for (var i = 0; i < goods.length; i++){ //добавляем маленькие карточки товра
        goods[i].imageIconSrc = `img/small${i}.jpg`;// добавим информацию о местонахождении картинок товара - маленьких
        goods[i].imageSrc = `img/big${i}.jpg`; // и больших
        var currentIcon = createIcon(goods[i]); // создаем интерфейсные элементы карточен товара (маленьких)
        currentIcon.id = "icon" + i;
        galleryBottom.append(currentIcon); //помещаем карточку в контейнер для карточек
    } 
    var galleryTop = document.createElement("div"); //создаем элемент для размещения выбранного товара (с большим рисунком)
    galleryTop.classList.add("gallery__top");
    gallery.append(galleryTop);
    var galleryTopCaption = document.createElement("div"); //название товара
    galleryTopCaption.innerText = goods[currentGood].name;
    galleryTopCaption.classList.add("gallery__top_caption");
    galleryTop.append(galleryTopCaption);
    var galleryTopPrice = document.createElement("div"); //цена товара
    galleryTopPrice.innerText = goods[currentGood].price+"$";
    galleryTopPrice.classList.add("gallery__top_price");
    galleryTop.append(galleryTopPrice);
    var cartButton = document.createElement("div"); //кнопка добавления в корзину
    cartButton.classList.add("gallery__top_cart");
    cartButton.innerHTML = "&#129530; Добавить в корзину";
    cartButton.addEventListener("click", addToCart); // обработчик кнопки добавления в корзину
    galleryTop.append(cartButton);
    var galleryTopImage = document.createElement("img"); //большой рисунок
    // *************************************
    //к п.1 Проверка наличия большого рисунка
    // **************************************
    galleryTopImage.onerror = function () { //если возникает ошибка при загрузке большого рисурка (н-р его нету),
        galleryTopImage.src = goods[currentGood].imageIconSrc; // то вставляется маленький рисунок (возможно загрузка какого-нибудь дефолтного рисунка)
    };  
    galleryTopImage.src = goods[currentGood].imageSrc;
    galleryTop.append(galleryTopImage);

    var cartForm= document.createElement("div");; // контейнер для вывода содержимого корзины
    cartForm.classList.add("gallery__top_cart-form");
    cartForm.setAttribute("cart", "1");
    // gallery.append(cartForm);        //вначале контейнер не добавлен на страницу (не виден)
    var cartItemCaption = document.createElement("div");//заглавие корзины
    cartItemCaption.classList.add("gallery__top_cart-form-caption");
    cartItemCaption.innerText = "Корзина";
    cartItemCaption.setAttribute("cart", "1");
    cartForm.append(cartItemCaption); 
    var cartBox = document.createElement("div"); //Контейнер для элементов товара
    cartBox.classList.add("gallery__top_cart-form-item");
    cartBox.setAttribute("cart", "1");
    cartForm.append(cartBox);
    var cartTotal = document.createElement("div");//итого корзины
    cartTotal.classList.add("gallery__top_cart-form-total");
    cartTotal.setAttribute("cart", "1");
    cartTotal.innerText = "ИТОГО: "+"$";
    cartForm.append(cartTotal);
    var cartButtonBuy = document.createElement("div"); //Кнопка совершения покупки
    cartButtonBuy.classList.add("gallery__top_cart-form-buy");
    cartButtonBuy.setAttribute("cart", "1");
    cartButtonBuy.innerText = "Купить";
    cartForm.append(cartButtonBuy);


    function createIcon(good) { //создание карточки товара. На входе объект товара - на выходе заполненный объект для верстки
        var icon = document.createElement("div");
        icon.classList.add("gallery__bottom_icon");
        icon.addEventListener("click", iconClick); //на клик по карточке товара сажаем обработчик выбора текущего товара
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

    function iconClick() { // обработчик выбора текущего товара
        currentGood = this.id.slice(-1); 
        galleryTopImage.src = goods[currentGood].imageSrc;
        galleryTopCaption.innerText = goods[currentGood].name;
        galleryTopPrice.innerText = goods[currentGood].price + "$";
    }

    // *************************************
    //к п.2 Добавление товара в корзину
    // **************************************
    function addToCart() { //обработчик кнопки добавления в корзину
        for(var item of cart){
            if (item.id == parseInt(currentGood)){ // если товар найден в корзине, то
                cart[parseInt(currentGood)].count++; //1.его количество в корзине прибавится
                return;                                //2. и добавления товара  не происходит
            }
        }
        cart.push({    // товар добавляется в корзину.
            id: parseInt(currentGood),
            count: 1
        });
        cartOpenFormAfter.innerHTML =cart.length;//количество товаров в корзине (над кнопкой корзина) отображается
    }

     // *************************************
    //к п.2 Просмотр корзины, суммы покупки и покупка
    // **************************************
    function openCart() {
        var total = 0;//сумма корзины
        cartBox.innerHTML = "";
        for (index = 0; index < cart.length; index++){ //создаем елементы для размещения коризны в контенере корзины
            var goodIndex = cart[index].id;
            var itemCost = goods[goodIndex].price * cart[index].count;
            total += itemCost;
            var cartItemName = document.createElement("div");
            cartItemName.innerText = goods[goodIndex].name;
            cartItemName.setAttribute("cart", "1");
            cartBox.append(cartItemName);
            var cartItemPrice = document.createElement("div");
            cartItemPrice.innerText = goods[goodIndex].price + "$ ";
            cartItemPrice.setAttribute("cart", "1");
            cartBox.append(cartItemPrice);
            var cartItemCount = document.createElement("div");
            cartItemCount.innerText = cart[index].count;
            cartItemCount.setAttribute("cart", "1");
            cartBox.append(cartItemCount);
            var cartItemCost = document.createElement("div");
            cartItemCost.setAttribute("cart", "1");
            cartItemCost.innerText = itemCost + "$";
            cartBox.append(cartItemCost);
            };
            cartTotal.innerText = "ИТОГО: " + total + "$";
        gallery.append(cartForm); //добавлем контейнер корзины в верстку (отображем)
        cartButtonBuy.onclick = function () {
            if (total > 0) {
                alert("Покупка будет выслана в ближайшее время!");
                cart = [];
                cartOpenFormAfter.innerHTML = "0";
                cartBox.innerHTML = "";
                cartTotal.innerText = "ИТОГО: 0" + "$";
                total = 0;
            }
        }
        var doc = document.querySelector("body");
        doc.onclick = function (e) {//и добавляем обработчик для закрытия (удаления из верстки) контейнера корзины
            if (!(e.target.getAttribute("cart") == 1)) { // при клике в любом месте, кроме контейнера корзины
                cartForm.remove();
                doc.onclick = null;
                
            }
        }
    }
}