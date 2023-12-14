const captureBtn = document.getElementById('captureBtn')
const storageBtn = document.getElementById('storageBtn')
const deleteBtn = document.getElementById('deleteBtn')
const tabList = document.getElementById('tabList')



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

function getCurrentDate() {
    var currentDate = new Date()
    currentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
    return currentDate
}

captureBtn.addEventListener('click', function () {
    //When capture button is pressed
    // 1. get current date                              -- Done
    // 2. check whether it's already there or not.      -- Done
    // 3. if not, add the date and the associated url.
    // 4. if already exists, append the urls. \

    // var currentDate = getCurrentDate()
    var currentDate = '16/12/2023'
    chrome.storage.local.get(currentDate, (result) => {
        var keys = Object.keys(result)

        if (keys.length) {
            //append the new data to current data.
            getTabs(function(resultData){
                value = JSON.parse(result[currentDate])

                // resultData = JSON.stringify(resultData)

                value.push(resultData)
                const setData = {
                    [currentDate]: JSON.stringify(value)
                }
                chrome.storage.local.set(setData, ()=>{
                    console.log(`Data appended!!`)
                })

            })

        } else {

            getTabs(function (resultData) {
                const setData =
                {
                    [currentDate]: JSON.stringify(resultData)
                }
                chrome.storage.local.set(setData, () => {
                    console.log(`Data saved${JSON.stringify(setData)}`)
                })
                chrome.storage.local.get(currentDate, (result_) => {
                    console.log(result_)
                })
            })

        }
    })





    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        var tab = tabs.map(tab => {
            return ({
                title: tab.title,
                url: tab.url
            })
        })

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

storageBtn.addEventListener('click', function () {
    chrome.tabs.create({ url: 'storage.html' })
})



deleteBtn.addEventListener('click', function(){
    chrome.storage.local.clear(()=>{
        console.log('all deleted')
    })
})