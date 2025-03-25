let cart = []; // Sepetteki ürünleri tutacak dizi
let totalPrice = 0; // Toplam fiyat

// Sepete ürün ekleme fonksiyonu
function addToCart(productName, productPrice) {
    // Sepette aynı üründen var mı kontrol et
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        // Eğer aynı ürün varsa, adeti 1 artır
        existingProduct.quantity += 1;
        totalPrice += productPrice; // Toplam fiyatı güncelle
    } else {
        // Eğer ürün daha önce eklenmemişse, yeni ürün ekle
        const productImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHI0Sl4f0BHOZKbB2vAa2OYm1ipRs1jqiJJw&s";
        cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
        totalPrice += productPrice; // Toplam fiyatı güncelle
    }

    // Sepetteki ürünleri listele
    displayCart();
}

// Sepeti görüntüleme fonksiyonu
function displayCart() {
    const cartItems = document.querySelector(".cart-list");
    const totalPriceElement = document.getElementById("toplam-fiyat");

    // Sepet içeriğini temizle
    cartItems.innerHTML = '';

    // Sepetteki her ürünü listele
    cart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.style.display = "flex"; // Ürünler yan yana dizilsin
        listItem.style.alignItems = "center"; // Görsel ve metin hizalanması için

        // Ürün görselini ekle
        const productImage = document.createElement("img");
        productImage.src = item.image;
        productImage.alt = item.name;
        productImage.style.width = "30px"; // Küçük bir görsel boyutu
        productImage.style.height = "30px";
        productImage.style.marginRight = "10px"; // Görsel ile metin arasına boşluk

        // Ürün metni
        const productInfo = document.createElement("span");
        productInfo.textContent = `${item.name} - ${item.price}$ x ${item.quantity}`;

        // Silme butonunu oluştur
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Sil";
        deleteButton.style.marginLeft = "40px"; // Butona biraz boşluk bırak
        deleteButton.style.marginTop = "5px"; // Butona biraz boşluk bırak
        deleteButton.addEventListener("click", () => {
            removeFromCart(item.name); // Ürünü ismine göre sil
        });

        // List item'a görsel, metin ve silme butonunu ekle
        listItem.appendChild(productImage);
        listItem.appendChild(productInfo);
        listItem.appendChild(deleteButton);
        cartItems.appendChild(listItem);
    });

    // Toplam fiyatı güncelle
    totalPriceElement.textContent = `${totalPrice}$`;
}

// Sepetten ürün silme fonksiyonu
function removeFromCart(productName) {
    // Ürünün sepet içinde indeksini bul
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        // Eğer ürün sepet içinde varsa, adeti bir azalt
        const product = cart[productIndex];

        if (product.quantity > 1) {
            product.quantity -= 1; // Adeti bir azalt
            totalPrice -= product.price; // Toplam fiyatı güncelle
        } else {
            // Adet 1 ise, ürünü tamamen sepetten sil
            cart.splice(productIndex, 1);
            totalPrice -= product.price; // Toplam fiyatı güncelle
        }
    }

    displayCart(); // Sepeti tekrar görüntüle
}
