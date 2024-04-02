import type { Page, Locator} from 'playwright';
import { expect } from 'playwright/test';
export class ProductPage {
    readonly page: Page;
    readonly allProductCardElements: Locator;
    readonly addToCartButtons: string;
    readonly goToCartButton: Locator;
    readonly productPriceParagraph: string;
    readonly productNameParagraph: string;
    readonly cartSpan: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.allProductCardElements = page.locator('div.text-center');
      this.addToCartButtons = 'button.btn-primary';
      this.goToCartButton = page.locator('button.nav-link');
      this.productPriceParagraph = 'p:nth-child(3)';
      this.productNameParagraph = 'p:nth-child(2)';
      this.cartSpan = page.locator('#cart');
    }

    // Get minumum value for this cateogry, click on add button and return title and price
    // The type can be for example Aloe or Almond
    async addProductToCart(type) {

       await this.page.waitForLoadState('domcontentloaded');
       // Get the the product card of the type to be Aloe and Almond
       const productCardElementsWithType = await this.allProductCardElements.filter({ hasText: type});
       
        let priceList: number[]=[];
        
        // Loop through each product card with the type
        for (let i = 0; i < await productCardElementsWithType.count(); i++) {
          const productCardElement = productCardElementsWithType.nth(i);
          const priceParagraph = await productCardElement.locator(this.productPriceParagraph);
          const fullPriceText = await priceParagraph.textContent();
        
          if(fullPriceText!=null){
            const numbers = fullPriceText.match(/\d+/g);
            if (numbers) {
                const price = parseInt(numbers[0], 10);
                // store price in the list for finding minumum later
                priceList.push(price)
            }
          }
            
        
        }
      
        const buttons = await productCardElementsWithType.locator(this.addToCartButtons);
        // Get minumum price from the price list
        let minValue =Math.min(...priceList);
        // Get minumum index in the price lise
        let minIndex = priceList.indexOf(minValue);
        // Get text from the title
        let title= await productCardElementsWithType.locator(this.productNameParagraph).nth(minIndex).textContent();
        await buttons.nth(priceList.indexOf(minValue)).click();
        // Return for further and comparison in checkout page
        return [minValue,title];
    }
    // Verify on the items count in the added on cart button
    async verifyCountAddedToCart(count){

      const cartSpanText = await this.cartSpan.innerText();

      expect(cartSpanText).toContain(`${count} item(s)`);
    }

    
    async goToCart() {
      
     await this.goToCartButton.click()
    }
      
      
   
}