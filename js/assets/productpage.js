const baseURL = "https://api.noroff.dev/api/v1/rainy-days/";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const idURL = baseURL + id;

export async function fetchProductDetail() {
  try {
    const response = await fetch(idURL);
    const product = await response.json();
    productPage.innerHTML = "";
    createHtml(product);
  } catch(error) {
    console.log(error);
    productPage.innerHTML = `<p>Oops! Something went wrong</p>`;
  }
}

const productPage = document.querySelector('.product-page');

function createHtml(product) {
  productPage.innerHTML = `
    <h1>${product.title}</h1>
    <div class="productPage-image"><img src="${product.image}"> </div>
    <div class="productPage-description">${product.description}</div>
    <div class="productPage-price">£${product.price.toFixed(2)}</div>
  `;
}


fetchProductDetail()