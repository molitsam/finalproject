 alert('Im Connected')

/*Home Page Events Toggle & Display */
const getEvents = async () => {
    const response = await fetch('/api/events')
    const { name, location, dates, hours } = await response.json()
    document.querySelector('.Events .Etitle').textContent = name
    document.querySelector('.Events .Elocation' ).textContent = location
    document.querySelector('.Events .Edates').textContent = dates
    document.querySelector('.Event .Etime').textContent = hours
}
getEvents()
document.querySelector('.Events button').addEventListener('click',getEvents)



/* after Submit is hit on the contact page java will redirect you to home */

/*Program admin page- Get the endpoints from data base to connect to the admin form  */