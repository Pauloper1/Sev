// const linkPreview = require('link-preview-js');

function collectData(callback) {
    chrome.storage.local.get(null, (result) => {
        console.log(result)
        callback(result)
    })
}

collectData(function (result) {

    const storedData = Object.entries(result).reverse()
    storedData.forEach(([key, value])=>{
        
        const Container = document.createElement('div')
        Container.classList = 'container'
        
        //Date
        const header2 = document.createElement('h2')
        header2.textContent = key
        Container.appendChild(header2)

        //section line
        const section = document.createElement('hr')
        Container.appendChild(section)

        //Saved ulrs
        const boxWrapper = document.createElement('div')
        boxWrapper.classList = 'boxWrapper'

        value = JSON.parse(value)   
        value.map(async(eachVal) => {

            const result = await window._.getLinkPreview(eachVal.url)
           

            const box = createBox({...eachVal, result})

            // anchor.appendChild(box)
            boxWrapper.appendChild(box)
           
        })
        Container.appendChild(boxWrapper)
        document.body.appendChild(Container)
    })

})


//HTML Components

//Boxes for each urls
function createBox(value) {
    
    const boxContainer = document.createElement('div')
    boxContainer.classList = 'boxContainer'
    // boxContainer.style.display = 'block'


    const imageContainer = document.createElement('div');
    imageContainer.classList = 'imageContainer'
    const anchor = document.createElement('a');
    anchor.classList = 'link'
    anchor.href = value.url

    imageContainer.style.backgroundImage = `url('${value.result.images[0]}')`

    boxContainer.style.transition = 'transform 0.3s ease-in-out';

    const textBox = document.createElement('div')
    textBox.classList = 'textBox'
    const heading4 = document.createElement('h4')
    heading4.classList = 'title'
    heading4.textContent = value.title
    textBox.appendChild(heading4)

    boxContainer.appendChild(imageContainer)
    boxContainer.appendChild(textBox)
    
    

    // Hover effect
    boxContainer.addEventListener('mouseenter', function () {
        boxContainer.style.cursor = 'pointer';
        boxContainer.style.transform = 'scale(1.1)'; 
    });

    boxContainer.addEventListener('mouseleave', function () {
        boxContainer.style.cursor = 'default';
        boxContainer.style.transform = 'scale(1)';

    });

    boxContainer.addEventListener('click', function () {
        window.location.href = anchor.href
    });
  
    return boxContainer;
  }