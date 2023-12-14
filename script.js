const captureBtn = document.getElementById('captureBtn')
const storageBtn = document.getElementById('storageBtn')
const tabList = document.getElementById('tabList')

captureBtn.addEventListener('click', function(){

    var currentDate = new Date()
    currentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
    console.log(`current Date ${currentDate}`)
    chrome.storage.local.get(currentDate, (result)=>{
        console.log(`result: `,JSON.stringify(result))
        var keys = Object.keys(result)

        console.log(`keys: ${keys}`)
        if(result[0]){
            //append the new data to current data.

        } else {
            
            console.log('else section')
            getTabs(function (resultData) {
                const setData = 
                {
                    [currentDate]: JSON.stringify(resultData)
                }
                console.log('setData')
                console.log(setData)
                chrome.storage.local.set(setData, () => {
                    console.log(`Data saved${JSON.stringify(setData)}`)
                })
                chrome.storage.local.get(currentDate,(result_)=>{
                    console.log('After storing')
                    console.log(result_)
                })
            })

        }
        console.log('after else section')
        
        // var keyExists = keys.some((key)=>{
        //     return (
        //         currentDate.getDate() === key.getDate() &&
        //         currentDate.getMonth() === key.getMonth() &&
        //         currentDate.getFullYear() === key.getFullYear()
        //       );
        // })
        // if(keyExists){
            
        // }
    })


    function getTabs(callback) {
       
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
            var tab = tabs.map(tab => {
                return ({
                    title: tab.title,
                    url: tab.url
                })
            })
            callback(tab)
        })
    }

    function getCurrentDate(){
        
    }
    chrome.tabs.query({currentWindow: true}, function(tabs){
        var tab = tabs.map(tab => {
            // console.log({title: tab.title, url: tab.url})
            return({
                title: tab.title,
                url: tab.url
            })
        })
        console.log(`tab: ${JSON.stringify(tab)}`)
        
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



//When capture button is pressed
    // 1. get current date
    // 2. check whether it's already there or not.
    // 3. if not, add the date and the associated url.
    // 4. if already exists, append the urls. 