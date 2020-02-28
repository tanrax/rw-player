// Imports
import axios from "../node_modules/axios"
import Amplitude from "../node_modules/amplitudejs"
import SiriWave from "../node_modules/siriwave"

// Variables
const URL_API: string = 'http://republicaweb.es/wp-json/ssp/v1/episodes/'
const COVER = 'img/logo-republica-web-v2.png'
let lastEpisode: object = undefined
let mySiriWare = undefined
let mySongPlayerdProgress = document.getElementById('song-played-progress')
let siriContainer = document.getElementById('siri-container')

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

function startPlayer(name: string, episode: string, url: string, cover: string): void {
    // Init Way
    mySiriWare = new SiriWave({
	    container: siriContainer,
        height: 100,
        autostart: true,
        style: 'ios9',
        amplitude: 0
    })
    // Init Amplitude (custom audio player)
    Amplitude.init({
		"songs": [
			{
				"name": name,
				"artist": "República Web",
				"album": episode,
				"url": url,
				"cover_art_url": cover
			}
        ],
        "callbacks": {
            'pause': function() {
                mySiriWare.setAmplitude(0)
            },
            'playing': function() {
                mySiriWare.setAmplitude(3)
            },
            'ended': function() {
                mySiriWare.setAmplitude(0)
            }
        }
    });
    // Init progressbar
    handlesProgressbar()
}

function handlesProgressbar(): void {
    window.onkeydown = function(e) {
      return !(e.keyCode == 32);
    };
    mySongPlayerdProgress.addEventListener('click', function( e ) {
        let offset = this.getBoundingClientRect()
        let x: string = (e.pageX - offset.left).toString()

        Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( mySongPlayerdProgress.offsetWidth.toString()) ) * 100 )
    })
}

// Init
start()