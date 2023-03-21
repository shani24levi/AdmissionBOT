/*
 * Because the class&Id for the desired elements on the page are dynamic and changing, 
 * accessing the element are by the fixed element of data-*
 */

function(jsonString) {
    const jsonObj = JSON.parse(jsonString);

    for (let i = 0; i < jsonObj.length; i++) {
        //click add contact
        let addNewContact = document.querySelector('[data-unique-id="Ribbon-8501"]')
        addNewContact.click();

        //fill the form of the contact 
        document.querySelector('[data-automation="Name.firstName"]').innerText = jsonObj[i]["Name"];
        document.querySelector('[data-automation="Work.company"]').innerText = jsonObj[i]["Role"];
        document.querySelector('[data-automation="Notes.notes"]').innerText = jsonObj[i]["Url"];

        //adding the contact 
        let submit = document.querySelector('[data-automation="LPESave"]')
        submit.click();
    }
}
