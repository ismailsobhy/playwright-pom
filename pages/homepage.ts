import type { Page, Locator} from 'playwright';
export class HomePage {
    readonly page: Page;
    readonly temperatureSpan: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.temperatureSpan = page.locator('#temperature');
    
    }


    // Check temperature if less than 19 then moisturizers and above 34 then sunscreens
    async clickMainCategory(lowtemp,hightemp) {
        const temperatureText = await this.temperatureSpan.textContent();
    
        if (temperatureText) {
            const temp=parseInt(temperatureText, 10);
            let category ='';
            if(temp < lowtemp)
                category = 'moisturizers'
            if(temp > hightemp)
                category = 'sunscreens';
            await this.page.click(`text=Buy ${category}`);
            return category;
        }
        
        return null;
      }
}