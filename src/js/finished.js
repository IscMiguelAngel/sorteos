if (_LOTTERY_.registeredCompetitors === false && _LOTTERY_.registeredAwards === false && _LOTTERY_.lottery === false)
    window.location.href = "/"

const _WINNERS_ = _LOTTERY_.winners
const winnerTableBody = $("#winner-table-body")

_WINNERS_.innerHTML = ""

let htmlWinners = ""
_WINNERS_.forEach(winner => {
    htmlWinners += `
    <tr>
        <td>${ winner.competitor.value }</td>
        <td>${ winner.award.value }</td>
    </tr>
    `.trim()
})

winnerTableBody.innerHTML = htmlWinners

$("#btn-restart").addEventListener("click", () => {
    document.querySelector(".alert").classList.remove("hidden")
})

$("#btn-reset").addEventListener("click", () => {
    localStorage.removeItem("lottery")
    window.location.href = "/"
})

$("#btn-cancel-reset").addEventListener("click", () => {
    document.querySelector(".alert").classList.add("hidden")
})