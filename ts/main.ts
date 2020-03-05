// Imports
import axios from '../node_modules/axios'
import R from '../node_modules/ramda'

// Variables
const URL_API: string = 'https://republicaweb.es/wp-json/ssp/v1/episodes/'
let lastEpisode: object = undefined


// Funcions

function start(): void {
    axios.get(URL_API)
        .then(function (response) {
            // handle success
            lastEpisode = response.data[0]
            document.querySelector('#player').setAttribute('src', lastEpisode.meta.audio_file)
            startPlayer(
                lastEpisode["title"].rendered,
                "test",
                lastEpisode["meta"].audio_file,
                COVER
                )
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}