document.addEventListener("DOMContentLoaded", function () {
  var element = document.querySelector(".article-template__content");
  var text = element.innerHTML;
  var regex = /\[product="(.*?)"/g;
  var productSkus = [];
  var modifiedText = text;
  const ShopifyBuy = window.ShopifyBuy;

  var replaceProduct = function (sku) {
    var storefront = ShopifyBuy.buildClient({
      domain: "assesmentcenter38.myshopify.com",
      storefrontAccessToken: "d4949e66cf17b40633c85292b2fd93c7",
    });
    productSkus.push(sku);

    return new Promise(function (resolve, reject) {
      function fetchData(sku) {
        // var skuplain = sku.replaceAll('<span>', '').replaceAll('</span>', '');
        // return storefront.product.fetchQuery({ query: '\"' + skuplain + '\"' })
        return storefront.product
          .fetchQuery({ query: '"' + sku + '"' })
          .then((products) => {
            if (products && products.length > 0) {
              const product = products[0];
              const variant = product.variants[0];
              console.log(product);
              console.log(variant);
              var variantUrl =
                "https://assesmentcenter38.myshopify.com/products/" +
                product.handle +
                "?variant=" +
                variant.id;
              console.log(variant.id);
              console.log(product.id);
              const productId = product.id.split("/").pop(); // Extracts the last part after the last '/'
              const variantId = product.variants[0].id.split("/").pop(); // Extracts the last part after the last '/'
              // var productTemplate = `
              //  <div class="product-wrap">
              //    <a href="${variantUrl}"> <img src="${product.images[0].src}" /></a>
              //    <a href="${variantUrl}">   <h4>${product.title}</h4> </a>
              //      <p class="price">${parseFloat(product.variants[0].priceV2.amount).toFixed(2)} ${product.variants[0].priceV2.currencyCode}</p>
              //      <a pid="${variant.id}" class="btn" href="#" onclick="addProductToCart(event, '${variantUrl}', '${product.id}')">In den Warenkorb</a>
              //   </div>`;
              const productTemplate = `
                <div class="art_prod">
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
                                id="StandardCardNoMediaLink-template--${productId}__main-8903969079581"
                                class="full-unstyled-link"
                                aria-labelledby="StandardCardNoMediaLink-template--${productId}__main-8903969079581 NoMediaStandardBadge-template--${productId}__main-8903969079581"
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
                          <h3 class="card__heading h5" id="title-template--${productId}__main-8903969079581">
                            <a
                              href="/products/${product.handle}"
                              id="CardLink-template--${productId}__main-8903969079581"
                              class="full-unstyled-link"
                              aria-labelledby="CardLink-template--${productId}__main-8903969079581 Badge-template--${productId}__main-8903969079581"
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
                              id="quick-add-template--${productId}__main-8903969079581"
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
                                id="quick-add-template--${productId}__main-8903969079581-submit"
                                type="submit"
                                name="add"
                                class="quick-add__submit button button--full-width button--secondary"
                                aria-haspopup="dialog"
                                aria-labelledby="quick-add-template--${productId}__main-8903969079581-submit title-template--${productId}__main-8903969079581"
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
                </div>
                `;
              resolve({ sku: sku, template: productTemplate });
            } else {
              reject(sku);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            reject(sku);
          });
      }

      fetchData(sku);
    });
  };

  var promises = [];
  var match;
  while ((match = regex.exec(text))) {
    var sku = match[1];
    promises.push(replaceProduct(sku));
  }

  Promise.all(promises)
    .then(function (results) {
      results.forEach(function (result) {
        var regex = new RegExp('\\[product="' + result.sku + '"]', "g");
        // console.log("Regex: ", regex);
        // console.log(result);
        modifiedText = modifiedText.replace(regex, result.template);
        // console.log("result= " + JSON.stringify(result));
      });
      element.innerHTML = modifiedText;
    })
    .catch(function (failedSku) {
      console.log("Failed to fetch product with SKU: " + failedSku);
    });
});
