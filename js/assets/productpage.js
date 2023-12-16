const baseURL = "https://cms.lillfre.co.uk/wp-json/wc/store/products/";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

if (id) {
  const idURL = baseURL + id;

  async function fetchProductDetail() {
    try {
      const response = await fetch(idURL);

      if (!response.ok) {
        throw new Error(`Failed to fetch product details (HTTP ${response.status})`);
      }

      const product = await response.json();
      productPage.innerHTML = "";
      createHtml(product);
    } catch (error) {
      console.log(error);
      productPage.innerHTML = `<p>Oops! Something went wrong: ${error.message}</p>`;
    }
  }

  const productPage = document.querySelector('.product-page');

  function createHtml(product) {
    productPage.innerHTML = `
      <div class="productPage-image"><img src="${product.images[0].src}"></div>
      <div class="productPage-description">${product.description}</div>
      <div class="productPage-price">£${parseFloat(product.prices.price).toFixed(2)}</div>
    `;
  }

  fetchProductDetail();
} else {
  console.log("No product ID specified.");
}