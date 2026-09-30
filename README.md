# Web Development Project 2 - Flashcard Base

Submitted by: **Christian Guiang**

This web app: **A React web app about going through different sets of flashcards based on different topics. Flashcard order can be randomized.**

Time spent: **24** hours spent in total

## Required Features

The following **required** functionality is completed:


- [✔] **The app displays the title of the card set, a short description, and the total number of cards**
  - [✔] Title of card set is displayed 
  - [✔] A short description of the card set is displayed 
  - [✔] A list of card pairs is created
  - [ ] The total number of cards in the set is displayed 
  - [✔] Card set is represented as a list of card pairs (an array of dictionaries where each dictionary contains the question and answer is perfectly fine)
- [✔] **A single card at a time is displayed**
  - [✔] Only one half of the information pair is displayed at a time
- [✔] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  - [✔] Clicking on a card flips it over, showing the back with corresponding information 
  - [✔] Clicking on a flipped card again flips it back, showing the front
- [✔] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [✔] Cards contain images in addition to or in place of text
  - [✔] Some or all cards have images in place of or in addition to text
- [ ] Cards have different visual styles such as color based on their category
  - Example categories you can use:
    - Difficulty: Easy/medium/hard
    - Subject: Biology/Chemistry/Physics/Earth science

The following **additional** features are implemented:

* [✔] Cards can be scrolled back in addition to forward
* [✔] Future card pools/sets can be added
*   [ ] Future card pools/sets can be selected from the main page

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://imgur.com/a/j31LZAy' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif



## Notes

I cannot understand why the flashcard component doesn't re-render to show its front when the state var used for the current side updates to the front, nor can I understand why none of the attempted workarounds to force a new render (e.g., setState, useEffect, forceUpdate) worked. It's even more mind-boggling that the means of updating the state var worked in a previous, near-identical app built as my Week 1 project. There's something very off here.

Either way, I'll be back to work on this and eventually resolve this main problem, and add better stylizing for the components. For anyone reading this in the future: an easy way to flip the cards is to have "--rotate_x: 180deg" in the CSS code. Or however that command is formatted; to be honest, I just glanced at it from the demo.

## License

    Copyright 2026 [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
