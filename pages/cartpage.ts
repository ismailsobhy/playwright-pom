import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  
    readonly page: Page;
    readonly table: Locator;
    readonly rowsProductLocator: Locator
    readonly totalPriceParagraph: Locator
    readonly payButton: Locator

    
    constructor(page: Page) {
        this.page = page;
        this.table = page.locator('table.table-striped');
        this.totalPriceParagraph = page.locator('#total');
        this.rowsProductLocator = page.locator("table.table-striped tr");
        this.payButton = page.locator("button[class*='stripe-button']")
        
    }

  // Check product details- title and price, in the table row
  // product[0] is price and product[1] and is name
  async checkProductDetails(row,product) {
    const price=product[0]
    const name=product[1]
    
    await this.page.waitForLoadState('domcontentloaded');
   
    const title_col = await this.rowsProductLocator.nth(row).locator("td").nth(0).textContent();
    const price_col = await this.rowsProductLocator.nth(row).locator("td").nth(1).textContent();
    await expect(title_col).toContain(name+''); 
    await expect(price_col).toContain(price+''); 
    
  }
  // Check total price
  async checkTotalPrice(total) {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.totalPriceParagraph).toContainText(total);
   
  }

  // click on pay button
  async clickPayButton(){
    await this.payButton.click()
  }
}
