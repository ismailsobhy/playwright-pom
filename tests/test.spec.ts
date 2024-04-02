import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { ProductPage } from '../pages/productpage';
import { CartPage } from '../pages/cartpage';
import { PaymentPage } from '../pages/paymentpage';
// Test data coming from json file fixture
const testData = JSON.parse(JSON.stringify(require('../test-data/data.json')));


test('Weather Shopper- buy moisturizers or sunscreens', async ({ page }) => {
    const homepage = new HomePage(page);
    const productpage = new ProductPage(page);
    const cartpage = new CartPage(page)
    const paymentpage = new PaymentPage(page)
    await homepage.open();
    // Click on moisturizers or sunscreens depending on temp and return the category
    const category = await homepage.clickMainCategory(testData['lowtemplimit'],testData['hightemplimit']);
    let product1;
    let product2;
    let totalPrice=0
    
     if (category) {
        // Get the products corresponding to this category from testdata
        product1=await productpage.addProductToCart(testData[category][0]);
        product2=await productpage.addProductToCart(testData[category][1]);
        // Get total price by adding both prices
        totalPrice=Number(product1[0]) + Number(product2[0]);
        
      } 
      // Verify on how many items in the cart
      await productpage.verifyCountAddedToCart(2);
      await productpage.goToCart();
      // Check total price in the cart 
      await cartpage.checkTotalPrice(''+totalPrice);
      
      // Check details for both products
      await cartpage.checkProductDetails(1,product1);
      await cartpage.checkProductDetails(2,product2);
      
      await cartpage.clickPayButton();

      // Pay with stripe payment method with user details from test data
      await paymentpage.fillStipePaymentForm(testData['user']);

      await paymentpage.checkPaymentSuccess();

  });
