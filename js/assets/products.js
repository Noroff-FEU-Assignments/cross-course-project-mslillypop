const baseURL = "https://api.noroff.dev/api/v1/rainy-days/"

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
      productImage.src = product.image;
      productImage.alt = product.title;

      const productTitle = document.createElement('h2');
      productTitle.classList.add('product-title');
      productTitle.textContent = product.title;

      const productPrice = document.createElement('p');
      productPrice.classList.add('product-price');
      productPrice.textContent = `£${product.price.toFixed(2)}`;

      productImage.dataset.productID = product.id;

      productItem.append(productImage);
      productItem.append(productTitle);
      productItem.append(productPrice);
      productGrid.append(productItem);

      productImage.addEventListener('click', (e) => {
        const currentTarget = e.target;     
        const productID = currentTarget.dataset.productID;
        
        if (productItem) {

          window.location.href = `product.html?id=${productID}`;
          }
      
        
      
      });
    });
  }) .catch(error => productGrid.innerHTML = `<p>Oops! Something went wrong</p>`); {
    
  };
  
  
  
}
