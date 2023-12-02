document.addEventListener('DOMContentLoaded', function () {
  var element = document.querySelector('.article-template__content');
  var text = element.innerHTML;
  console.log("text= " + text);
  // var regex = /\[product="(.*?)"/g;
  // var productSkus = [];
  // var modifiedText = text;

  // var replaceProduct = function (sku) {
  //   var storefront = ShopifyBuy.buildClient({
  //     domain: 'pullup-and-dip.myshopify.com',
  //     storefrontAccessToken: '7ca54e2047a316bddad6cdebc2b85914'
  //   });
  //   productSkus.push(sku);
  //   return new Promise(function (resolve, reject) {
  //     function fetchData(sku) {
  //       var skuplain = sku.replaceAll('<span>', '').replaceAll('</span>', '');
  //       return storefront.product.fetchQuery({ query: '\"' + skuplain + '\"' })
  //         .then(products => {
  //           if (products && products.length > 0) {
  //             const product = products[0];
  //             const variant = product.variants[0];
  //             var variantUrl = 'https://pullup-and-dip.myshopify.com/products/' + product.handle + '?variant=' + variant.id;
  //             var productTemplate = `
  //              <div class="product-wrap">
  //                <a href="${variantUrl}"> <img src="${product.images[0].src}" /></a>
  //                <a href="${variantUrl}">   <h4>${product.title}</h4> </a>
  //                  <p class="price">${parseFloat(product.variants[0].priceV2.amount).toFixed(2)} ${product.variants[0].priceV2.currencyCode}</p>
  //                  <a pid="${variant.id}" class="btn" href="#" onclick="addProductToCart(event, '${variantUrl}', '${product.id}')">In den Warenkorb</a>
  //               </div>`;

  //             resolve({ sku: sku, template: productTemplate });
  //           } else {
  //             reject(sku);
  //           }
  //         })
  //         .catch(error => {
  //           console.error('Error:', error);
  //           reject(sku);
  //         });
  //     }

  //     fetchData(sku);

  //   });
  // };
  
  // var promises = [];
  // var match;
  // while (match = regex.exec(text)) {
  //   var sku = match[1];
  //   promises.push(replaceProduct(sku));
  // }

  // Promise.all(promises)
  //   .then(function (results) {
  //     results.forEach(function (result) {
  //       var regex = new RegExp('\\[product="' + result.sku + '"]', 'g');
  //       modifiedText = modifiedText.replace(regex, result.template);
  //       console.log("result= " + JSON.stringify(result));
  //     });
  //     element.innerHTML = modifiedText;
  //   })
  //   .catch(function (failedSku) {
  //     console.log("Failed to fetch product with SKU: " + failedSku);
  //   });
});
