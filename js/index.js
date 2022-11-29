const TEAM_TLA = "BRA";
const SERVER_URL = "https://cache-wc.4yousee.com.br/";
const API_URL = `${SERVER_URL}v1/wc/${TEAM_TLA}`;
const ENDPOINT = `${API_URL}/game/next`;
const dateFormat = 'pt-br';


$(document).ready(function () {


    function formatDate(gameDate) {
        let weekday = gameDate.toLocaleDateString(dateFormat, { weekday: 'long' }).replace("-feira", "");
        weekday = weekday[0].toUpperCase() + weekday.slice(1);
        let day = gameDate.toLocaleDateString(dateFormat, { day: 'numeric' });
        let month = gameDate.toLocaleDateString(dateFormat, { month: 'long' });
        let date = `${weekday}, ${day} de ${month}`
        let hour = gameDate.toLocaleTimeString(dateFormat, { hour: '2-digit', minute: '2-digit', hour12: false }).replace(":", "h");
        return {
            date,
            hour
        }
    }

    $.ajaxSetup({
        headers:{
            'Secret-Token': "Y2MIB91VTUX885GB41CYUEG4AYSLL3"
        }
     });

    $.get(ENDPOINT, function (data) {
        let game = data.response;
        if (game) {
            let stage = game.stage;
            if (game.stage == "Grupos") {
                stage = `Grupo ${game.group}`
            }
            $("#stage-game").text(stage);
            let gameDate = new Date(game.date);
            let { date, hour } = formatDate(gameDate);
            $("#date").text(date);
            $("#hour-game").text(hour);
            $(".home-team .country-name").text(game.home.shortName.toUpperCase());
            $(".home-team  img.flag-country").attr("src", `./img/flags/${game.home.shortName.toUpperCase()}.svg`);
            $(".away-team .country-name").text(game.away.shortName.toUpperCase());
            $(".away-team  img.flag-country").attr("src", `./img/flags/${game.away.shortName.toUpperCase()}.svg`);
            $("#stadium-game").text(game.stadium)
        }
    });

});
