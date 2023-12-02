document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector(".article-template__content");
  const text = element.innerHTML;
  const regex = /\[product="(.*?)"/g;
  let modifiedText = text;

  const replaceProduct = function (sku) {
    const storefront = window.ShopifyBuy.buildClient({
      domain: "assesmentcenter38.myshopify.com",
      storefrontAccessToken: "d4949e66cf17b40633c85292b2fd93c7",
    });
    return new Promise(function (resolve, reject) {
        return storefront.product
          .fetchQuery({ query: '"' + sku + '"' })
          .then((products) => {
            if (products && products.length > 0) {
              const product = products[0];
              const productTemplate =  getProductTemplateFromProduct(product;
              resolve({ sku: sku, template: productTemplate });
            } else {
              reject(sku);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            reject(sku);
          });
    });
  };

  const promises = [];
  let match;
  while ((match = regex.exec(text))) {
    const sku = match[1];
    promises.push(replaceProduct(sku));
  }

  Promise.all(promises)
    .then(function (results) {
      results.forEach(function (result) {
        const regex = new RegExp('\\[product="' + result.sku + '"]', "g");
        modifiedText = modifiedText.replace(regex, result.template);
      });
      element.innerHTML = modifiedText;
    })
    .catch(function (failedSku) {
      console.log("Failed to fetch product with SKU: " + failedSku);
    });
});

function getProductTemplateFromProduct(product) {
  const productId = product.id.split("/").pop();
  const variantId = product.variants[0].id.split("/").pop(); 
  return `<link href="//assesmentcenter38.myshopify.com/cdn/shop/t/4/assets/component-rating.css?v=24573085263941240431701187368" rel="stylesheet" type="text/css" media="all">
   
          <div class="card-wrapper product-card-wrapper underline-links-hover">
            <div class="card card--standard card--media" style="--ratio-percent: 100%">
              <div class="card__inner color-background-2 gradient ratio" style="--ratio-percent: 100%">
                <div class="card__media">
                  <div class="media media--transparent media--hover-effect">
                    <img
                      src="${product.images[0].src}"
                      sizes="(min-width: 1600px) 367px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
                      alt="${product.images[0].altText}"
                      class="motion-reduce"
                      loading="lazy"
                      width="${product.images[0].width}"
                      height="${product.images[0].height}"
                    />
                  </div>
                </div>
                <div class="card__content">
                  <div class="card__information">
                    <h3 class="card__heading">
                      <a
                        href="/products/${product.handle}"
                        id="StandardCardNoMediaLink-template--${productId}"
                        class="full-unstyled-link"
                        aria-labelledby="StandardCardNoMediaLink-template--${productId} NoMediaStandardBadge-template--${productId}"
                      >
                        ${product.title}
                      </a>
                    </h3>
                  </div>
                  <div class="card__badge bottom left"></div>
                </div>
              </div>
              <div class="card__content">
                <div class="card__information">
                  <h3 class="card__heading h5" id="title-template--${productId}">
                    <a
                      href="/products/${product.handle}"
                      id="CardLink-template--${productId}"
                      class="full-unstyled-link"
                      aria-labelledby="CardLink-template--${productId} Badge-template--${productId}"
                    >
                      ${product.title}
                    </a>
                  </h3>
                  <div class="card-information">
                    <span class="caption-large light"></span>
                    <div class="price">
                      <div class="price__container">
                        <div class="price__regular">
                          <span class="visually-hidden visually-hidden--inline">Regular price</span>
                          <span class="price-item price-item--regular">${product.variants[0].price.amount} ${product.variants[0].price.currencyCode}</span>
                        </div>
                        <div class="price__sale">
                          <span class="visually-hidden visually-hidden--inline">Regular price</span>
                          <s class="price-item price-item--regular"> </s>
                          <span class="visually-hidden visually-hidden--inline">Sale price</span>
                          <span class="price-item price-item--sale price-item--last">${product.variants[0].price.amount} ${product.variants[0].price.currencyCode}</span>
                        </div>
                        <small class="unit-price caption hidden">
                          <span class="visually-hidden">Unit price</span>
                          <span class="price-item price-item--last">
                            <span></span>
                            <span aria-hidden="true">/</span>
                            <span class="visually-hidden">&nbsp;per&nbsp;</span>
                            <span> </span>
                          </span>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="quick-add no-js-hidden">
                  <product-form>
                    <form
                      method="post"
                      action="/cart/add"
                      id="quick-add-template--${productId}"
                      accept-charset="UTF-8"
                      class="form"
                      enctype="multipart/form-data"
                      novalidate="novalidate"
                      data-type="add-to-cart-form"
                    >
                      <input type="hidden" name="form_type" value="product" />
                      <input type="hidden" name="utf8" value="✓" />
                      <input type="hidden" name="id" value="${variantId}" />
                      <button
                        id="quick-add-template--${productId}-submit"
                        type="submit"
                        name="add"
                        class="quick-add__submit button button--full-width button--secondary"
                        aria-haspopup="dialog"
                        aria-labelledby="quick-add-template--${productId}-submit title-template--${productId}"
                        aria-live="polite"
                        data-sold-out-message="true"
                      >
                        <span>Add to cart </span>
                        <span class="sold-out-message hidden"> Sold out </span>
                        <div class="loading-overlay__spinner hidden">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            class="spinner"
                            viewBox="0 0 66 66"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                          </svg>
                        </div>
                      </button>
                      <input type="hidden" name="product-id" value="${productId}" />
                    </form>
                  </product-form>
                </div>
                <div class="card__badge bottom left"></div>
              </div>
            </div>
          </div>
          `;
}
