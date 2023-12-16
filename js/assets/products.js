const baseURL = "https://cms.lillfre.co.uk/wp-json/wc/store/products/";


const productGrid = document.querySelector('.product-grid');

if (productGrid) {
  // Append product items to productGrid
} else {
  console.error('Could not find .product-grid element');
}

productGrid.innerHTML = "";

export async function fetchProduct() {

  fetch(baseURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');

      const productImage = document.createElement('img');
      productImage.classList.add('product-image');
      productImage.src = product.images[0].src;
      productImage.alt = product.name;

      const productTitle = document.createElement('h2');
      productTitle.classList.add('product-title');
      productTitle.textContent = product.name;

      const productPrice = document.createElement('p');
      productPrice.classList.add('product-price');
      productPrice.textContent = `£${parseFloat(product.prices.price).toFixed(2)}`;

      productImage.dataset.productID = product.id;

      productItem.append(productImage);
      productItem.append(productTitle);
      productItem.append(productPrice);
      productGrid.append(productItem);

      productImage.addEventListener('click', (e) => {
        const currentTarget = e.target;
        const productID = currentTarget.dataset.productID;

        if (productID) {
          window.location.href = `product.html?id=${productID}`;
        }
      });
    });
  })
  .catch(error => {
    productGrid.innerHTML = `<p>Oops! Something went wrong: ${error.message}</p>`;
    console.error(error);
  });
}

