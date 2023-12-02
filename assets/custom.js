document.addEventListener('DOMContentLoaded', function () {
  var element = document.querySelector('.article-template__content');
  var text = element.innerHTML;
  var regex = /\[product="(.*?)"/g;
  var productSkus = [];
  var modifiedText = text;

  var replaceProduct = function (sku) {
    var storefront = ShopifyBuy.buildClient({
      domain: 'assesmentcenter38.myshopify.com',
      storefrontAccessToken: 'd4949e66cf17b40633c85292b2fd93c7'
    });
    console.log(sku);
    productSkus.push(sku);

    return new Promise(function (resolve, reject) {
      function fetchData(sku) {
        var skuplain = sku.replaceAll('<span>', '').replaceAll('</span>', '');
        console.log(skuplain)
        return storefront.product.fetchQuery({ query: '\"' + skuplain + '\"' })
          .then(products => {
            if (products && products.length > 0) {
              resolve({ sku: sku, template: productTemplate });
            } else {
              reject(sku);
            }
          })
          .catch(error => {
            console.error('Error:', error);
            reject(sku);
          });
      }
      fetchData(sku);
    });
  };
  
  var promises = [];
  var match;
  while (match = regex.exec(text)) {
    var sku = match[1];
    console.log(sku);
    promises.push(replaceProduct(sku));
  }

  Promise.all(promises)
    .then(function (results) {
      results.forEach(function (result) {
        var regex = new RegExp('\\[product="' + result.sku + '"]', 'g');
        modifiedText = modifiedText.replace(regex, result.template);
        console.log("result= " + JSON.stringify(result));
      });
      element.innerHTML = modifiedText;
    })
    .catch(function (failedSku) {
      console.log("Failed to fetch product with SKU: " + failedSku);
    });
});