const captureBtn = document.getElementById('captureBtn')
const storageBtn = document.getElementById('storageBtn')
const tabList = document.getElementById('tabList')

captureBtn.addEventListener('click', function(){
    chrome.tabs.query({currentWindow: true}, function(tabs){
        console.log(`tabs: ${JSON.stringify(tabs)}`)
        
        tabs.forEach(element => {
            const lielement = document.createElement('li')
            lielement.textContent = `url: ${JSON.stringify(tabs)}`
            tabList.appendChild(lielement)
        });
        const lenElement = document.createElement('p')
        lenElement.textContent = tabs.length
        document.body.appendChild(lenElement)

    })
})

storageBtn.addEventListener('click', function(){
    chrome.tabs.create({url: 'storage.html'})
})

