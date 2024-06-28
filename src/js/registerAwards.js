if (_LOTTERY_.registeredCompetitors === false && _LOTTERY_.registeredAwards === false && _LOTTERY_.lottery === false)
    window.location.href = "/"

if (_LOTTERY_.registeredCompetitors === true && _LOTTERY_.registeredAwards === true && _LOTTERY_.lottery === false)
    window.location.href = "/lottery.html"

const listOfAwards = $("#list-of-awards")
const _AWARDS_ = _LOTTERY_.awards

const deleteAward = (id) => {
    const element = $(`#${id}`)
    _AWARDS_.filter(award => {
        if(award.token === id)
            _AWARDS_.splice(_AWARDS_.indexOf(award), 1)
    })

    localStorage.setItem("lottery", JSON.stringify({
        ..._LOTTERY_,
        awards: _AWARDS_
    }))

    element.remove()

    if(_AWARDS_.length === 0) {
        localStorage.setItem("lottery", JSON.stringify({
            ..._LOTTERY_,
            registeredAwards: false
        }))
        $("#btn-awards").disabled = true
        window.location.reload()
    }    
}

_AWARDS_.forEach(award => {
    listOfAwards.innerHTML += `<li id="${ award.token }">${award.value}<button onclick="deleteAward('${ award.token }')">&times;</button></li>`
})

if(_AWARDS_.length > 0)
    $("#btn-awards").disabled = false

$("#form-award").addEventListener("submit", (e) => {
    const award = $("#award")
    const _token_ = token()

    if(award.value.trim() !== "") {
        listOfAwards.innerHTML += `<li id="${ _token_ }">${award.value.toUpperCase()}<button onclick="deleteAward('${ _token_ }')">&times;</button></li>`
        _AWARDS_.push({
            token: _token_,
            value: award.value.toUpperCase()
        })
        localStorage.setItem("lottery", JSON.stringify({
            ..._LOTTERY_,
            awards: _AWARDS_
        }))
        award.value = ""
        $("#btn-awards").disabled = false
    }
})

$("#btn-awards").addEventListener("click", () => {
    if(_AWARDS_.length > 0) {
        localStorage.setItem("lottery", JSON.stringify({
            ..._LOTTERY_,
            registeredAwards: true
        }))
        window.location.href = "/awards.html"
    } else
        alert("No hay premios registrados")
})