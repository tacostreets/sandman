
let authors = [
    { firstName : 'Neil', lastName : 'Gaiman', favOne : 'American Gods', favTwo : 'Coraline' },
    { firstName : 'Robert', lastName : 'Heinlein', favOne : 'The Moon is a Harsh Mistress', favTwo : 'For Us, The Living' },
    { firstName : 'Isaac', lastName : 'Asimov', favOne : 'I, Robot', favTwo : 'Foundation' },
    { firstName : 'Ursula', lastName : 'K. LeGuin', favOne : 'A Wizard of Earthsea', favTwo : 'The Tombs of Atuan'},
    { firstName : 'Neal', lastName : 'Stephenson', favOne : 'Seveneves', favTwo : 'Anathem'}
    ];






function getAll() {
    return authors;
}
module.exports = {getAll : getAll}