import { useState } from 'react'
import './App.css'
import { pools } from './flashcards.js'

// Images (mostly stock)
import {imgsAnimals, img_default} from './assets'
console.log("Here come the images")
console.log(imgsAnimals)
console.log(img_default)
console.log("There went the images")


const TIME_FLIP = 0.5
// In pixels
const DEFAULT_IMAGE_WIDTH = 330
const DEFAULT_IMAGE_HEIGHT = 330
const DEFAULT_IMAGE = img_default
let currImgs = imgsAnimals

function get_by_name(arr, target) {
    for(let t = 0; t < arr.length; t++) {
        if(arr[t]["name"] == target) {
            return arr[t]
        }
    }
}


function shuffle(arr) {
    /*
    Shuffles a given array in place.
    */
    let swaps = arr.length - 1
    while(swaps > 0) {
        let swapInd = Math.floor(Math.random() * arr.length)
        let hold = arr[swapInd]
        arr[swapInd] = arr[swaps]
        arr[swaps] = hold
        swaps--
    }
    return arr
}

function Flashcard({cardData}) {
    // So... once a props object has been destructured like this, the derived vars can be used as normal,
    //  without any curly braces.
    let {sideA, sideB, imgA, imgB} = cardData
    // imgA = "./assets".concat(imgA)
    // imgB = "./assets".concat(imgB)
    const [aUp, setAUp] = useState(true)
    const [currText, setCurrText] = useState(sideA)
    const [currImg, setCurrImg] = useState(imgA)
    const [currWidth, setCurrWidth] = useState(0)
    const [currHeight, setCurrHeight] = useState(0)

    function flipCard() {
        // Swap between the text and images on sides A and B. Only show images if a source string is provided.
        // Flip to B-side
        console.log({aUp})
        if(aUp) {
            setAUp(false)
            setCurrText(sideB)
            if(imgB.length > 1) {
                setCurrImg(imgB)
                setCurrWidth(DEFAULT_IMAGE_WIDTH)
                setCurrHeight(DEFAULT_IMAGE_HEIGHT)

            }
            else {
                setCurrImg(DEFAULT_IMAGE)
                setCurrWidth(100)
                setCurrHeight(100)
            }
        }
        // Flip to A-side
        else {
            console.log("going true")
            setAUp(true)
            setCurrText(sideA)
            if(imgA.length > 1) {
                setCurrImg(imgA)
                setCurrWidth(DEFAULT_IMAGE_WIDTH)
                setCurrHeight(DEFAULT_IMAGE_HEIGHT)
            }
            else {
                setCurrImg(DEFAULT_IMAGE)
                setCurrWidth(0)
                setCurrHeight(0)
            }
        }
    }

    return (
        <div 
            className="flashcard"
            onClick={() => {
                    flipCard()
                    console.log(cardData)
                }
            }
        >
            <img
                className="image"
                width={`${currWidth}px`}
                height={`${currHeight}px`}
                src={imgsAnimals[currImg]}
            />
            <p>{currText}</p>
        </div>
    )
}


function App() {
    const [currFlashcard, setCurrFlashcard] = useState(0)
    // If you ever extend this to include different flashcard pools, you'll use these setters.
    const [currPoolName, setCurrPoolName] = useState("animals")
    // const [currImgs, setCurrImgs] = useState(`imgs${currPoolName}`)
    const [flashcards, setFlashcards] = useState(get_by_name(pools, currPoolName))

    function handleScroll(scrollRight = true) {
        if(scrollRight && currFlashcard < flashcards["pool"].length-1) {
            setCurrFlashcard(currFlashcard => currFlashcard+1)
        }
        else if(!scrollRight && currFlashcard > 0) {
            setCurrFlashcard(currFlashcard => currFlashcard-1)
        }
        else {
            // Is this necessary so rerenders happen?
            setCurrFlashcard(currFlashcard)
        }
    }

    function handleShuffle(arr) {
        // Could this also not be hard-coded? I hope so...
        console.log("shuffling...")
        console.log(arr)
        arr = shuffle(arr)
        console.log("shuffled!")
        console.log(arr)
        return arr
    }

    return (
        <div>
            <h1>{flashcards["title"]}</h1>
            <p>{flashcards["desc"]}</p>
            <div className="navbar">
                <button
                    id="scrollLeft"
                    onClick={() => {handleScroll(false)}}
                >
                    {" < "}
                </button>
                <button
                    id="shuffle"
                    onClick={() => handleShuffle(flashcards["pool"])}
                >
                     Shuffle cards 
                </button>
                <button
                    id="scrollRight"
                    onClick={() => {handleScroll(true)}}
                >
                    {" > "}
                </button>
            </div>
            <Flashcard
                id="flashcard"
                cardData={flashcards["pool"][currFlashcard]}
            />
        </div>
    )
}

export default App
