import { pageObjects } from "./pageSolution";
const pages = new pageObjects(); 

class Intern {
    name: string; 
    phone: number; 
    title: string; 

    constructor(name:string, phone: number, title: string){
        this.name= name; 
        this.phone = phone; 
        this.title = title; 
    }; 
}; 

let newInterns: Array<Intern> = [
    new Intern("Noel", 8018018801, "Host"), 
    new Intern("Prue", 8018018801, "Judge"),
    new Intern("Matt", 8018018801, "Host"),
    new Intern("Paul", 8018018801, "Handshake Master")
];

let addInterns = async (newInterns) => {
    await pages.click(pages.addEm); 
    await pages.click(pages.newEm); 
    await pages.setInput(pages.namInp, newInterns.name); 
    await pages.setInput(pages.phoInp, newInterns.phone); 
    await pages.setInput(pages.titleInp, newInterns.title); 
    await pages.click(pages.saveBtn); 
    await pages.driver.sleep(3000); 
};

test('can add the bake off crew',async () => {
    await pages.navigate(); 
    await pages.getElement(pages.addEm); 
    for(let i= 0; i < newInterns.length; i ++){
        await addInterns(newInterns[i]); 
    }; 
    await pages.driver.quit(); 
})