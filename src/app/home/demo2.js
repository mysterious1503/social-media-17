
//to work as typscript we added manual checks

function deposit(amount) {
    if (typeof amount !== 'number') {
        throw new Error('Amount must be a number!')
    }

}