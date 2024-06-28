if(!localStorage.getItem("lottery"))
    localStorage.setItem("lottery", JSON.stringify({
        competitors: [],
        awards: [],
        winners: [],
        registeredCompetitors: false,
        registeredAwards: false,
        lottery: false
    }))

const _LOTTERY_ = JSON.parse(localStorage.getItem("lottery"))

const $ = (selector) => document.querySelector(selector)

document.getElementsByTagName("form")[0].addEventListener("submit", (event) => {
    event.preventDefault()
})


const token = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let token = ""
    for(let i = 0; i < 10; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return token
}