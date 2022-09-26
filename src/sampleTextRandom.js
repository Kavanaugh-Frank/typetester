//currently this gives a random sentece from the array every time the page is reloaded
    //something to work on is the "gameplay" loop so that a refresh is not needed to continue

export default function sampleText(){
    //random number generator  v   that number controls what it is through e.g. 0-9 if that number is 10
    
    let array = [
        "Sphinx of black quartz, judge my vow ",
        "Glib jocks quiz nymph to vex dwarf ",
        "Jackdaws love my big sphinx of quartz ",
        "The five boxing wizards jump quickly ",
        "Two driven jocks help fax my big quiz ",
    ]
    let arrayIndex = Math.floor(Math.random() * array.length)
    return array[arrayIndex]
}