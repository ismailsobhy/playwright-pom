import type { Page, Locator} from 'playwright';
export class HomePage {
    readonly page: Page;
    readonly temperatureSpan: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.temperatureSpan = page.locator('#temperature');
    
    }

    async open() {
        await this.page.goto('/');
    }

    // Check temperature if less than 19 then moisturizers and above 34 then sunscreens
    async clickMainCategory() {
        const temperatureText = await this.temperatureSpan.textContent();
    
        if (temperatureText) {
            const temp=parseInt(temperatureText, 10);
            let category ='';
            if(temp < 19)
                category = 'moisturizers'
            if(temp > 34)
                category = 'sunscreens';
            await this.page.click(`text=Buy ${category}`);
            return category;
        }
        
        return null;
      }
}