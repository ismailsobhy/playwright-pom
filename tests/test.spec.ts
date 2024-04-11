import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { ProductPage } from '../pages/productpage';
import { CartPage } from '../pages/cartpage';
import { PaymentPage } from '../pages/paymentpage';
// Test data coming from json file fixture
const testData = JSON.parse(JSON.stringify(require('../test-data/data.json')));


test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  await page.goto('/');
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`${testInfo.title} finshed with status ${testInfo.status}`);
});


test('Weather Shopper- buy moisturizers or sunscreens', async ({ page }) => {
    const homepage = new HomePage(page);
    const productpage = new ProductPage(page);
    const cartpage = new CartPage(page)
    const paymentpage = new PaymentPage(page)
    // Click on moisturizers or sunscreens depending on temp and return the category
    const category = await homepage.clickMainCategory(testData['lowtemplimit'],testData['hightemplimit']);
    let product1;
    let product2;
    let totalPrice=0
    
     if (category) {
        // Get the products corresponding to this category from testdata
        // Get minumum prices for first cateogry
        product1=await productpage.addProductToCart(testData[category][0]);
        // Get minumum prices for second cateogry
        product2=await productpage.addProductToCart(testData[category][1]);
        // Get total price by adding both prices
        totalPrice=Number(product1[0]) + Number(product2[0]);
        
      } 
      // Verify on how many items added to the cart
      await productpage.verifyCountAddedToCart(2);
      // Go to the cart
      await productpage.goToCart();
      // Check total price in the cart 
      await cartpage.checkTotalPrice(''+totalPrice);
      
      // Check details for both products name and price
      await cartpage.checkProductDetails(1,product1);
      await cartpage.checkProductDetails(2,product2);
      
      await cartpage.clickPayButton();

      // Pay with stripe payment method with user details from test data
      await paymentpage.fillStipePaymentForm(testData['paymentdata']);

      await paymentpage.checkPaymentSuccess();

  });
