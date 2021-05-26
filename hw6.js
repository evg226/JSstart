// Домашняя работа №6
// п.1.2.3 галлерея товаров
function makeGallery() {
    var goods = [ //пусть нам дана база товаров 
        { name: "lexus Bike", price: 300, big_pictures: ["big00", "big10", "big20", "big30"] },
        { name: "Mountin Trike", price: 200, big_pictures: [] },
        { name: "Stels", price: 150, big_pictures: ["big02", "big12", "big22"] }
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
    cartOpenForm.setAttribute("cart", "true"); //принадлежность в форме корзины
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
    for (var i = 0; i < goods.length; i++) { //добавляем маленькие карточки товра
        goods[i].imageIconSrc = `img/small${i}.jpg`;// добавим информацию о местонахождении картинок товара - маленьких
        // goods[i].imageSrc = `img/big0${i}.jpg`; // и больших
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
    galleryTopPrice.innerText = goods[currentGood].price + "$";
    galleryTopPrice.classList.add("gallery__top_price");
    galleryTop.append(galleryTopPrice);
    var cartButton = document.createElement("div"); //кнопка добавления в корзину
    cartButton.classList.add("gallery__top_cart");
    cartButton.innerHTML = "&#129530; Добавить в корзину";
    cartButton.addEventListener("click", addToCart); // обработчик кнопки добавления в корзину
    galleryTop.append(cartButton);
    var imgBox = document.createElement("div");
    imgBox.classList.add("gallery__top_img-box");
    galleryTop.append(imgBox);
    var buttonImgLeft = document.createElement("div");
    buttonImgLeft.classList.add("gallery__top_img-arrow");
    buttonImgLeft.innerHTML = "<";
    buttonImgLeft.id = "arrowLeft";
    buttonImgLeft.addEventListener("click", browsePic);
    imgBox.append(buttonImgLeft);
    var galleryTopImage = document.createElement("img"); //большой рисунок
    // *************************************
    //к п.1 Проверка наличия большого рисунка
    // **************************************
    galleryTopImage.onerror = function showDefaultPic(event) { //если возникает ошибка при загрузке большого рисурка (н-р его нету),
        galleryTopImage.src = "img/default.jpg"; // то вставляется маленький рисунок (возможно загрузка какого-нибудь дефолтного рисунка)
    };
    galleryTopImage.setAttribute("picId", "0"); //текущая большая картинка - с 0-номером из массива картинок текущего товара
    galleryTopImage.src = `img/${goods[currentGood].big_pictures[0]}.jpg`;
    imgBox.append(galleryTopImage);
    var buttonImgRight = document.createElement("div");
    buttonImgRight.classList.add("gallery__top_img-arrow");
    buttonImgRight.innerHTML = ">";
    buttonImgRight.id = "arrowRight"
    imgBox.append(buttonImgRight);
    buttonImgRight.addEventListener("click", browsePic);

    var cartForm = document.createElement("div"); // контейнер для вывода содержимого корзины
    cartForm.classList.add("gallery__top_cart-form");
    cartForm.setAttribute("cart", "true");
    // gallery.append(cartForm);        //вначале контейнер не добавлен на страницу (не виден)
    var cartItemCaption = document.createElement("div");//заглавие корзины
    cartItemCaption.classList.add("gallery__top_cart-form-caption");
    cartItemCaption.innerText = "Корзина";
    cartItemCaption.setAttribute("cart", "true");
    cartForm.append(cartItemCaption);
    var cartBox = document.createElement("div"); //Контейнер для элементов товара
    cartBox.classList.add("gallery__top_cart-form-item");
    cartBox.setAttribute("cart", "true");
    cartForm.append(cartBox);
    var cartTotal = document.createElement("div");//итого корзины
    cartTotal.classList.add("gallery__top_cart-form-total");
    cartTotal.setAttribute("cart", "total");
    cartTotal.innerText = "ИТОГО: " + "$";
    cartForm.append(cartTotal);
    var cartButtonBuy = document.createElement("div"); //Кнопка совершения покупки
    cartButtonBuy.classList.add("gallery__top_cart-form-buy");
    cartButtonBuy.setAttribute("cart", "true");
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
        price.innerText = good.price + "$";
        icon.append(price);
        return icon;
    }

    function iconClick() { // обработчик выбора текущего товара
        currentGood = this.id.slice(-1);
        galleryTopImage.src = `img/${goods[currentGood].big_pictures[0]}.jpg`;
        galleryTopCaption.innerText = goods[currentGood].name;
        galleryTopPrice.innerText = goods[currentGood].price + "$";
    }

    // *************************************
    //к п.2 Добавление товара в корзину
    // **************************************
    function addToCart() { //обработчик кнопки добавления в корзину
        for (var index in cart) {
            if (cart[index].id === parseInt(currentGood)) { // если товар найден в корзине, то
                cart[index].count++; //1.его количество в корзине прибавится
                return;                                //2. и добавления товара  не происходит
            }
        }
        cart.push({    // товар добавляется в корзину.
            id: parseInt(currentGood),
            count: 1
        });
        cartOpenFormAfter.innerHTML = cart.length;//количество товаров в корзине (над кнопкой корзина) отображается
    }

    // *************************************
    //к п.2 Просмотр корзины, суммы покупки и покупка
    // **************************************
    function openCart() {
        var total = 0;//сумма корзины
        cartBox.innerHTML = "";
        for (index = 0; index < cart.length; index++) { //создаем елементы для размещения коризны в контенере корзины
            var goodIndex = cart[index].id;
            var itemCost = goods[goodIndex].price * cart[index].count;
            total += itemCost;
            var cartItemDel = document.createElement("div"); //Кнопка удаления
            cartItemDel.classList.add("gallery__top_cart-form-item-del");
            cartItemDel.innerText = "-";
            cartItemDel.setAttribute("cart", goodIndex);
            cartItemDel.onclick = function (e) {
                var cartId = e.target.getAttribute("cart");
                var elementsToDel = document.querySelectorAll(`[cart='${cartId}']`);
                for (var item of elementsToDel) {
                    item.remove();
                }
                document.querySelector(`div[cart='${e.target.getAttribute("cart")}cost']`).remove();
                for (var i in cart) {
                    if (cart[i].id === parseInt(cartId)) {
                        cart.splice(i,1);
                    }    
                }
                console.log(cart);
                cartSum();
            }
            cartBox.append(cartItemDel);
            var cartItemName = document.createElement("div");
            cartItemName.innerText = goods[goodIndex].name;
            cartItemName.setAttribute("cart", goodIndex);
            cartBox.append(cartItemName);
            var cartItemPrice = document.createElement("div");
            cartItemPrice.innerText = goods[goodIndex].price + "$ ";
            cartItemPrice.setAttribute("cart", goodIndex);
            cartBox.append(cartItemPrice);
            var cartItemCount = document.createElement("input");
            cartItemCount.type = "number";
            cartItemCount.value = cart[index].count;
            cartItemCount.setAttribute("cart", goodIndex);
            cartItemCount.onchange = function (e) {
                if (e.target.value < 1) {
                    e.target.value = 1;
                }
                var idThis=e.target.getAttribute("cart");
                for (var index in cart) {
                    if (cart[index].id ==idThis) { 
                        cart[index].count = parseInt(e.target.value);
                        break;
                    }
                }
                document.querySelector(`div[cart='${e.target.getAttribute("cart")}cost']`).innerHTML = (goods[idThis].price * e.target.value) + "$";
                cartSum();
            }
            cartBox.append(cartItemCount);
            var cartItemCost = document.createElement("div");
            cartItemCost.setAttribute("cart", goodIndex+"cost");
            cartItemCost.innerText = itemCost + "$";
            cartBox.append(cartItemCost);
           
        };
        cartTotal.innerText = "ИТОГО: " + total + "$";
        gallery.append(cartForm); //добавлем контейнер корзины в верстку (отображем)
        cartButtonBuy.onclick = function () {
            if (total > 0) {
                if (cartSum()>0) alert("Покупка будет выслана в ближайшее время!");
                cart = [];
                cartOpenFormAfter.innerHTML = "0";
                cartBox.innerHTML = "";
                cartTotal.innerText = "ИТОГО: 0" + "$";
                total = 0;
            }
        }
        var doc = document.querySelector("body");
        doc.onclick = function (e) {//и добавляем обработчик для закрытия (удаления из верстки) контейнера корзины
            if (!(e.target.getAttribute("cart") != null)) { // при клике в любом месте, кроме контейнера корзины
                cartForm.remove();
                doc.onclick = null;

            }
        }
    }

    function cartSum() {
        var result = 0;
        for (var index = 0; index < cart.length; index++){
            result += cart[index].count * goods[cart[index].id].price;
        }
        document.querySelector(`div[cart='total']`).innerHTML = `ИТОГО: ${result}$`;
        return result;
    }

    // *************************************
    //к п.3 Листаем гарелею картинок выбранного товара
    // **************************************
    function browsePic(e) {
        var pictures = goods[currentGood].big_pictures; //Массив картинок текущего товара
        if (pictures.length < 1) { //если он пустой, то выход
            return;
        }
        // var currentPic = galleryTopImage.src; //путь к текущей картинке текущего товара
        // currentPic = currentPic.slice(currentPic.indexOf("/img/") + 5, currentPic.indexOf(".jpg")); //имя файла текущей картинки текущего товара
        // var picturesCurrent = pictures.indexOf(currentPic); //находим индекс этой картинки в массиве картинок текущего товара
        // // если была нажата кнопка влево, то след.картиной будет картинка на единицу меньше, иначе - на единицу больше
        var picturesCurrent = parseInt(galleryTopImage.getAttribute("picId")); // считываем код текущей картинки у большого рисунка
        var nextPic = (e.target.id == "arrowLeft") ? --picturesCurrent : ++picturesCurrent; // новый номер картинки текущего товара
        if (nextPic >= pictures.length) { // если достигнут конец массива картинок
            nextPic = 0;                  //  , то переходим к первой
        } else if (nextPic < 0) {           // // если достигнуто начало массива картинок
            nextPic = pictures.length - 1;    //  , то переходим к последней
        }
        galleryTopImage.setAttribute("picId", nextPic); // записываем новый номер картинки 
        galleryTopImage.src = `img/${goods[currentGood].big_pictures[nextPic]}.jpg`; //загружаем картинку по номеру из массива картинок текущего товара
    }

}