import Axios from 'axios'

const Client = Axios.create({
    baseURL: 'http://localhost/garage_soft/api/v1/',
    // baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Accept':'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem("_token"),
        'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjZThlYzVjNmRkNDJkODVkNjY2MGMwZDU0ZGEzMGQ4NGZhYzk5YTU5OTdhYzkwMTA5OGMzZWQ0MWJjMDVjMjEyZDhkMGY4MjY0MTAwMWE4In0.eyJhdWQiOiIyIiwianRpIjoiZWNlOGVjNWM2ZGQ0MmQ4NWQ2NjYwYzBkNTRkYTMwZDg0ZmFjOTlhNTk5N2FjOTAxMDk4YzNlZDQxYmMwNWMyMTJkOGQwZjgyNjQxMDAxYTgiLCJpYXQiOjE1NTg2ODc4NzksIm5iZiI6MTU1ODY4Nzg3OSwiZXhwIjoxNTkwMzEwMjc5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.RPNBv7LAU1CZfVdYPmO8zGKkxQVzJ28M0S1XLmhPP0MaqyaWwikTD3sNM7GWtEjproh_orHh4C5umI4SDGZWPhNWNdyq4ooAgLXLeJTUxVSmhbjusHyZn6GlpvgIvdJ2KSUjOW8ZEeAKJxA8RWyJBzwO3uS0yc2XOO8oCEMgQR9DDy9YkqRM9TGQpfHZNTSHGrbpuI050bBwoA1wD_AaucygFZ28Ski5n2nNllHnSWC82bQNIZWcYihDP9fMAMntxmKzIHr_WcPYWl73w4hkSPfolMfoXsckfjxcSWIodM9VA3C-pdYI9a0K1a42zbZvru25f5c9UHR0qd3csZd0aQT1StEszOeZs7mOhyu8hVuNE8tz-QW-YlgPejm13ku8me32Z9i1ghq6hw4A768RPoypYNYDOGtxvDfuT5cJ56XOeLS6mr_B49AKnZTTmAJ64B1D0eVZ97jME29p8iTILtphu_8TG47OLaFMkLt7wFLNsCliZx1etvdrCxdzY5EtFWIAjMSwxXxXS07Rua7hgTUD35B-Pzu99LozCzyQKES_KNVxv6IP0MtrWOOy15fIlVMP56VTvIS8ZUjQ1Ivm4GWZ4VtBUvsPY-eNw2mwcVZp-IgJGj3t-c3-YD86mx3KGaRjMTzzqKnGcYwOaKGpIyNxkod--Nsv1L2Mb6KECtQ",
    }
});
const Client2 = Axios.create({
    baseURL: 'https://some-domain.com/api/v2',
    headers: {'Authorization': 'Bearer ' + localStorage.getItem("_token")}
});

export default Client;
export {
    Client2
};
