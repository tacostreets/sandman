'use strict'
// let authors = [
//     { firstName : 'Neil', 
//       lastName : 'Gaiman', 
//       favOne : 'American Gods', 
//       favTwo : 'Coraline' },

//     { firstName : 'Robert', 
//       lastName : 'Heinlein', 
//       favOne : 'The Moon is a Harsh Mistress', 
//       favTwo : 'For Us, The Living' },

//     { firstName : 'Isaac', 
//       lastName : 'Asimov', 
//       favOne : 'I, Robot', 
//       favTwo : 'Foundation' },

//     { firstName : 'Ursula K.', 
//       lastName : 'LeGuin', 
//       favOne : 'A Wizard of Earthsea', 
//       favTwo : 'The Tombs of Atuan'},

//     { firstName : 'Neal', 
//       lastName : 'Stephenson', 
//       favOne : 'Seveneves', 
//       favTwo : 'Anathem'}
//     ];
//adding getAll property to the dictionary named exports. getAll is equal to authors function
exports.getAll = () => authors;
// getItem property to the dictionary. getItem is calling the item by lastName
exports.getItem = (lastName) => { 
    let author;
    let result = undefined; //result fails with invalid book request
    for(let i = 0; i < authors.length; i++) {
        author = authors[i];
        if(author.lastName == lastName) {
            result = author; //result returns requested book
            break;
        }
    }
    return result;
    
}; 
exports.addItem = (newAuthor) => {
    let author;
    let result = undefined;
   // add the item 
    if (newAuthor.hasOwnProperty('firstName')) {
        authors.push(newAuthor);
        for(let i = 0; i < authors.length; i++) {
            author = authors[i];
            if(author.lastName == newAuthor.lastName) {
                result = author; //result returns requested book
                break;
            }
            //if add results is the same number as authors.length
            
        }

    }
    return result;
}
exports.deleteItem = (author) => {
    let result = false;
    let oldLength = authors.length;
    authors = authors.filter((item) => { //filter cycles thru each item in the array to check if it's true
      return item.lastName !== author.lastName;
    })
    if (oldLength > authors.length) {
      result = true;
    }
    return result;
}
