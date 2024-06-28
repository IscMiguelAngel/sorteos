if (_LOTTERY_.registeredCompetitors === true && _LOTTERY_.registeredAwards === false && _LOTTERY_.lottery === false)
    window.location.href = "/awards.html"

if (_LOTTERY_.registeredCompetitors === true && _LOTTERY_.registeredAwards === true && _LOTTERY_.lottery === false)
    window.location.href = "/lottery.html"

if (_LOTTERY_.registeredCompetitors === true && _LOTTERY_.registeredAwards === true && _LOTTERY_.lottery === true)
    window.location.href = "/finished.html"


const listOfCompetitors = $("#list-of-competitors")
const _COMPETITORS_ = _LOTTERY_.competitors

const deleteCompetitor = (id) => {
    const element = $(`#${id}`)
    _COMPETITORS_.filter(competitor => {
        if(competitor.token === id)
            _COMPETITORS_.splice(_COMPETITORS_.indexOf(competitor), 1)
    })

    localStorage.setItem("lottery", JSON.stringify({
        ..._LOTTERY_,
        competitors: _COMPETITORS_
    }))

    element.remove()

    if(_COMPETITORS_.length === 0) {
        localStorage.setItem("lottery", JSON.stringify({
            ..._LOTTERY_,
            registeredCompetitors: false
        }))
        $("#btn-competitors").disabled = true
        window.location.reload()
    }    
}

_COMPETITORS_.forEach(competitor => {
    listOfCompetitors.innerHTML += `<li id="${ competitor.token }">${competitor.value}<button onclick="deleteCompetitor('${ competitor.token }')">&times;</button></li>`
})

if(_COMPETITORS_.length > 0)
    $("#btn-competitors").disabled = false

$("#form-competitor").addEventListener("submit", (e) => {
    const competitor = $("#competitor")
    const _token_ = token()

    if(competitor.value.trim() !== "") {
        listOfCompetitors.innerHTML += `<li id="${ _token_ }">${competitor.value.toUpperCase()}<button onclick="deleteCompetitor('${ _token_ }')">&times;</button></li>`
        _COMPETITORS_.push({
            token: _token_,
            value: competitor.value.toUpperCase()
        })
        localStorage.setItem("lottery", JSON.stringify({
            ..._LOTTERY_,
            competitors: _COMPETITORS_
        }))
        competitor.value = ""
        $("#btn-competitors").disabled = false
    }
})

$("#btn-competitors").addEventListener("click", () => {
    if(_COMPETITORS_.length > 0) {
        localStorage.setItem("lottery", JSON.stringify({
            ..._LOTTERY_,
            registeredCompetitors: true
        }))
        window.location.href = "/awards.html"
    } else
        alert("No hay competidores registrados")
})