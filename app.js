moment.locale('es');

getCountries();
getDatosByCountry();

function getCountries() {

    let url_countries = 'https://api.covid19api.com/countries';
    let countries = document.getElementById('countries');

    let data = '';

    fetch(url_countries)
        .then(resp => resp.json())
        .then(resp => {

            resp.forEach(elem => {
                data += `<option value="${elem.Country}">${elem.Country}</option>`;
            });

            countries.innerHTML = data;
        });
}

function getLastCountCasesByCountry(country, status, divStatus, divUpdateDate) {

    let url_data_by_country = `https://api.covid19api.com/total/country/${country}/status/${status}`;
    let div_status = document.getElementById(divStatus);
    let div_update_date = document.getElementById(divUpdateDate);

    fetch(url_data_by_country)
        .then(resp => resp.json())
        .then(resp => {
            div_status.innerHTML = JSON.stringify(resp[resp.length - 1].Cases);

            let date = resp[resp.length - 1].Date.substring(0, 10);
            div_update_date.innerHTML = moment(date).format('D [de] MMMM [a las] h:mm A');
            // format('D [de] MMMM [del] YYYY, h:mm:ss A');
        });
}

function getDatosByCountry() {
    let country = document.getElementById('countries').value;
    let title = document.getElementById('country');

    if (country == 0) {
        country = 'Afghanistan';
    }

    // title.innerHTML = country;

    getLastCountCasesByCountry(country, 'confirmed', 'confirmed', 'date_confirmed');
    getLastCountCasesByCountry(country, 'deaths', 'deaths', 'date_deaths');
    getLastCountCasesByCountry(country, 'recovered', 'recovered', 'date_recovered');
}