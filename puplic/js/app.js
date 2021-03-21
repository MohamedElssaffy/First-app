const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const myLocation = document.querySelector('#myLocation')


const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// const chooseUnit = document.querySelectorAll('input[type="radio"]')
const chooseUnit = document.getElementsByName('unit')
const unit = []
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    for (i=0; i<3; i++) {
        if (chooseUnit[i].checked === true) {
            unit[0] = chooseUnit[i].value
        }
    }
    messageOne.textContent = 'Loadding...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location + '&unit=' + unit[0]).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.locationCountry + ', ' + data.locationRegion
            messageTwo.textContent = data.forecast
        }
    })
})
})

myLocation.addEventListener('click', () => {
    messageOne.textContent = 'Loadding...'
    messageTwo.textContent = ''

    for (i=0; i<3; i++) {
        if (chooseUnit[i].checked === true) {
            unit[0] = chooseUnit[i].value
        }
    }

    if(!navigator.geolocation) {
        return alert('Your Browser Dont Support This Option')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        fetch(`/weather?address=${location.latitude}|${location.longitude}&unit=${unit[0]}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.locationCountry + ', ' + data.locationRegion
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
})