// Import dependecies 
const cheerio = require('cheerio');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Path of files used for read and output 
const htmlFilePath = './src/index.html';
const scssFilePath = './build/scss/colors.scss';

// First I want to read the file
fs.readFile(htmlFilePath, function read(err, data) {
    if (err) {
        throw err;
    }
    var content = data;

    /* Invoke the next step here however you like
       I imported cheerio to parse the HTML then transformit back to html(this is a bit rendundant but the fastest way i tought of to have a proper html file);    
    */
    const html = cheerio.load(content);
    const page = html.html();
    // Parse the html page file to JSDOM to create the virtual DOM and it's functions so it can be parsed as a normal HTML DOM
    const dom = new JSDOM(page);
    // Get all select options from the dropdownlist and parse each of them
    dom.window.document.querySelectorAll('option').forEach((element) => {
        // get color rgb value
        const color = element.style.background;
        // get color name
        const colorName = element.textContent;
        // Needed this as the html file I had made has some weird names of colors in it :)
        // so i needed a custom logic to parse it 
        let newColorName = colorName.toLowerCase();
        // Skip the first option with `Select a Color` as this is not a color ovb ;) 
        if(!colorName.includes('Select')){
            // If color name had spaces in it replace it with a dash to be a valid css class name
            if(colorName.includes(' ')){
                newColorName = colorName.split(' ').join('-').toLowerCase();
                // same thing if it had other markings which it had?... :)
                if(newColorName.includes('/-')){
                    newColorName = newColorName.replace('/-','').toLowerCase();
                } else if(newColorName.includes("'")){
                    newColorName = newColorName.replace("'",'').toLowerCase();
                }
            }
            
            // create a scss class component
            const textToWrite = `
.${newColorName}{
    &-bg{
        background-color:${color}
    };
    color:${color}
};`
        // write to file
        fs.appendFile(scssFilePath, textToWrite, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
        
        fs.appendFile('./colors.txt',`
        ${newColorName}
        ` , function(err) {
            if(err) {
                return console.log(err);
            }
        });
        
        }
        
    })
});
