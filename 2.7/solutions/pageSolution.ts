import { BasePage } from "../basePage";
import {By} from 'selenium-webdriver'; 

export class pageObjects extends BasePage {
    addEm: By = By.name('addEmployee'); 
    newEm: By = By.xpath('//li[text()="New Employee"]');
    namInp: By = By.xpath('(//input[@class="materialInput"])[1]'); 
    phoInp: By = By.name('phoneEntry'); 
    titleInp: By = By.name('titleEntry'); 
    saveBtn: By = By.id('saveBtn'); 

    constructor(){
        super({url: 'https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html'});
    };
};