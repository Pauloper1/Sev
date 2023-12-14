document.addEventListener('DOMContentLoaded', function () {
    const captureBtn = document.getElementById('captureBtn')
    const storageBtn = document.getElementById('storageBtn')
    const deleteBtn = document.getElementById('deleteBtn')
    const tabList = document.getElementById('tabList')
    // const getLinkPreview = require("link-preview-js");



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
        var currentDate = getCurrentDate()
        chrome.storage.local.get(currentDate, (result) => {
            var keys = Object.keys(result)

            if (keys.length) {
                //append the new data to current data.
                getTabs(function (resultData) {
                    value = JSON.parse(result[currentDate])

                    // resultData = JSON.stringify(resultData)

                    value.push(resultData)
                    const setData = {
                        [currentDate]: JSON.stringify(value)
                    }
                    chrome.storage.local.set(setData, () => {
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



    deleteBtn.addEventListener('click', function () {
        chrome.storage.local.clear(() => {
            console.log('all deleted')
        })
    })
})

