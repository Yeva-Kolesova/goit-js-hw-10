import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Wq25tiXRQOLXBtUQYEgdUJkqAGDSEbBr2L020tYNgKcUbxH4q0y2wQccQNo8jF6c";


const BASE_URL = `https://api.thecatapi.com/v1`;

function fetchBreeds() {
    const END_POINT = `/breeds`;
    const url = `${BASE_URL}${END_POINT}`

    // const options = {
    //     headers: {
    //         "content-type": "application/json",
    //         'x-api-key': 'live_Wq25tiXRQOLXBtUQYEgdUJkqAGDSEbBr2L020tYNgKcUbxH4q0y2wQccQNo8jF6c'
    //     }
    // }

    // return fetch(url, options)
    //     .then(res => res.json())
    //     .catch(err => {
    //         console.log(err);
    //         throw err;
    //     })

    return axios.get(url)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            throw err;
        });
}

function fetchCatByBreed(breedId) {
    const END_POINT = `/images/search`;
    const params = `?breed_ids=${breedId}`
    const url = `${BASE_URL}${END_POINT}${params}`

    // const options = {
    //     headers: {
    //         "content-type": "application/json",
    //         'x-api-key': 'live_Wq25tiXRQOLXBtUQYEgdUJkqAGDSEbBr2L020tYNgKcUbxH4q0y2wQccQNo8jF6c'
    //     }
    // }

    // return fetch(url, options)
    //     .then(res => res.json())

    return axios.get(url)
        .then(res => res.data);
}



export { fetchBreeds, fetchCatByBreed }
