function collectData(callback) {
    chrome.storage.local.get(null, (result) => {
        console.log(result)
        callback(result)
    })
}

collectData(function (result) {
    Object.entries(result).forEach(([key, value])=>{
        
        const header3 = document.createElement('h3')
        header3.textContent = key
        document.body.appendChild(header3)

        const ul = document.createElement('ul')
        document.body.appendChild(ul)
        value = JSON.parse(value)
        value.map((eachVal) => {
            const li = document.createElement('li')
            li.textContent = eachVal.title
            ul.appendChild(li)
        })
    })
})
