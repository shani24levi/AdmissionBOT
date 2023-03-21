const fs = require('fs');
const { isEmpty } = require('./helpers');

// Write the string to a file
function writeStringObjToFile(jsonString, filePath) {
    fs.writeFile(filePath, jsonString, (err) => {
        if (err) return false;
        else return true;
    });
}

// @desc      Threading of HTML elements from the parent element to the desired element
// @parent    input of html element    
// @elements  array of numbers , Each number represents the next child in the tree
// @output    returns the html element in the dom tree or null
function validElement(parent, elements) {
    if (isEmpty(elements) && !parent) return parent;
    if (!isEmpty(elements) && !parent) {
        switch (elements[0]) {
            case 1:
                parent = parent.firstChild
                break;
            case 2:
                parent = parent.childNodes[1]
                break;
            default:
                break;
        }

        if (!isEmpty(elements))
            validElement(parent, elements.shift())
    }
    return null;
}


function(element, input) {
    // Get the parent element
    let parentElement = document.querySelector("#main");
    let childSearchListUl = validElement(parentElement, [1, 2, 2, 1, 1])
    if (!childSearchListUl) return null;

    let dataJson = {
        /*type of :
        name, url, role,company
         */
    };

    childSearchListUl.forEach(i => {
        let item = { name='', url='', role='', company='' }

        let childSearchListLi = childSearchListUl.childNodes[i];
        let firstSectionChild = validElement(childSearchListLi, [1, 1, 2, 1])
        if (firstSectionChild) {
            let url = firstSectionChild.firstChild.getAttributeNode('href');
            let childSpen = url.firstChild;
            let name = childSpen.firstChild.textContent;
            //set var in object item
            item.name = name;
            item.url = url.slice(0, indexOf("?"));
        }

        let secSectionChild = validElement(firstSectionChild, [1, 1, 1, 1])
        if (secSectionChild) {
            let childLinkedArea = secSectionChild.childNodes[1];
            let role = childLinkedArea.childNodes[0].textContent;
            let company = childLinkedArea.childNodes[1].textContent;
            //set var in object item
            item.role = role;
            item.company = company;
        }
        if (item.name !== '')
            dataJson.push(item);
        //else continue to next item with out pussing the existing one
    })

    //Convert the JSON object to a string
    const jsonString = JSON.stringify(dataJson);
    //write to text file :
    let extractToFile = writeStringObjToFile(jsonString, './textFile.txt')
    // Retune data if extract is secsseful 
    if (extractToFile) return jsonString
    return null;
}