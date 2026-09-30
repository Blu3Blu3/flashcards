import { useState, useEffect } from 'react'
import './App.css'
import { pools } from './flashcards.js'

// Images (mostly stock)
import {imgsAnimals, img_default} from './assets'

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

function Flashcard({id, cardData, side}) {
    // So... once a props object has been destructured like this, the derived vars can be used as normal,
    //  without any curly braces.
    let {sideA, sideB, imgA, imgB} = cardData
    const [aUp, setAUp] = useState({side})
    const [currText, setCurrText] = useState(sideA)
    const [currImg, setCurrImg] = useState(imgA)
    const [currWidth, setCurrWidth] = useState(0)
    const [currHeight, setCurrHeight] = useState(0)

    // Rerender testing...
    useEffect(() => {
        setAUp(true)        
    }, [])

    function flipCard() {
        // Swap between the text and images on sides A and B. Only show images if a source string is provided.
        // Flip to B-side
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
                setCurrWidth(0)
                setCurrHeight(0)
            }
        }
        // Flip to A-side
        else {
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
            id={id} 
            className="flashcard"
            onClick={() => {
                    flipCard()
                }
            }
        >
            <img
                className="image"
                width={`${currWidth}px`}
                height={`${currHeight}px`}
                src={imgsAnimals[currImg]}
            />
            <p className="desc">{currText}</p>
        </div>
    )
}


function App() {
    const [currFlashcard, setCurrFlashcard] = useState(0)
    // If you ever extend this to include different flashcard pools, you'll use these setters.
    const [currPoolName, setCurrPoolName] = useState("animals")
    // const [currImgs, setCurrImgs] = useState(`imgs${currPoolName}`)
    const [flashcards, setFlashcards] = useState(get_by_name(pools, currPoolName))
    const [side, setSide] = useState(true)

    function handleScroll(scrollRight = true) {
        if(scrollRight && currFlashcard < flashcards["pool"].length-1) {
            setCurrFlashcard(currFlashcard+1)
            console.log("scrolling right")
        }
        else if(!scrollRight && currFlashcard > 0) {
            setCurrFlashcard(currFlashcard-1)
            console.log("scrolling left")
        }
        else {
            // This doesn't even help with rerenders...
            setCurrFlashcard(currFlashcard)
            console.log("stay! good boy!")
        }
        // >:/
        setSide(true)
    }

    function handleShuffle(arr) {
        console.log("shuffling...")
        arr = shuffle(arr)
        setSide(true)
        return arr
    }
    
    return (
        <div>
            <h1>{flashcards["title"]}</h1>
            <p>{flashcards["desc"]}</p>
            <div className="navbar">
                <button
                    id="scrollLeft"
                    onClick={
                        () => {
                            handleScroll(false)
                            setSide(true)
                        }
                    }
                >
                    {" < "}
                </button>
                <button
                    id="shuffle"
                    onClick={
                        () => {
                            handleShuffle(flashcards["pool"])
                            setSide(true)
                        }
                    }
                >
                     Shuffle cards 
                </button>
                <button
                    id="scrollRight"
                    onClick={
                        () => {
                            handleScroll(true)
                            setSide(true)
                        }
                    }
                >
                    {" > "}
                </button>
            </div>
            <Flashcard
                id="flashcard"
                cardData={flashcards["pool"][currFlashcard]}
                side={side}
            />
        </div>
    )
}

export default App
