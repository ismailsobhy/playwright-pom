import type { Page, Locator, FrameLocator} from 'playwright';
import { expect } from 'playwright/test';
export class PaymentPage {
    readonly page: Page;
    readonly form: FrameLocator;
    readonly emailField: string;
    readonly cardNumberField: string;
    readonly expiryDateField: string;
    readonly cvcField: string;
    readonly billingZipField: string;
    readonly payButton: string;


    constructor(page: Page) {
        this.page = page;
        this.form = page.frameLocator('form.checkoutView');
        this.emailField = 'div.paymentView #email';
        this.cardNumberField = '#card_number'
        this.expiryDateField = '#cc-exp'
        this.cvcField = '#cc-csc'
        this.billingZipField = '#billing-zip'
        this.payButton = '#submitButton'
                
    }

    // fill stripe payment form with user details
    async fillStipePaymentForm(user) {
        
        const stripeFrame = this.page.frameLocator('iframe').first();

        await stripeFrame.locator(this.emailField).fill(user.email);
        await stripeFrame.locator(this.expiryDateField).fill(user.expiry);
        await stripeFrame.locator(this.cvcField).fill(user.cvc);
        await stripeFrame.locator(this.cardNumberField).fill(user.cardnumber);
        await stripeFrame.locator(this.payButton).click()
      }

    async checkPaymentSuccess(){

      await expect(this.page.getByText('PAYMENT SUCCESS')).toBeVisible();


    }
}