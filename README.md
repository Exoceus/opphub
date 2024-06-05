<img width="1694" alt="image" src="https://github.com/Exoceus/opphub/assets/27310726/515cb976-0e7d-4d47-926f-f3bb6e1b56a8">

# OppHub
> An Online Portal To Explore Extraccuicular Student Activities

## Context
This repository is acctually an internal fork of the (private) OppHub source code which is currently deployed at opp-hub.com. I began work on OppHub in 2020 at a time where I found myself having a lot of free time due to the pandemic and has not been worked since summer of 2021. Thus, I decided to learn through building and decided to build out my first full stack web app. The main point I wanted to emphasize is that this an inaccurate representation of my ability to code as this was arguable the first meaningful code I ever wrote and was written before I ever learnt about code organization, source control, readability and various programming principles. My goal with OppHub was simply to build something that atleast one person in the world outside of myself found useful.

Some of the biggest things I would change if I were to resume development on this project would be:
- Abstractions, abstractions, abstractions: I would try to wrap the logic for interacting external services that I am using like AWS and Firebase Auth
- React Hooks: This project uses the old class-based React components logic. I would ideally setup more React Hooks and convert everything to functional components.
- Data Invariants: Since I used a NoSQL database like MongoDB, there were many situations certain documents would be formatted in two different ways resulting in many bugs and band-aid fixes using conditionals. Instead, I would focus on data unformity and better database design.
- CSS: For the first ever release of OppHub, I just had a single CSS file that contained all the styling which was around 250 lines. But as the project grew, I just kept dumping things into that same file which ended up growing to almost 4k lines. Instead of this, I would try to use reusable styled componets and perhaps experiment with solutions like Tailwind CSS.

While most of my recent work is done on private repos (professional workd, school projects, personal projects), my more recent projects are better documented and are a better representation of my abilities.

## Technical Details
The project is strucutred as a mono-repo containing both the server logic and client-side logic, which are deployed together. The core API is found at `/api/<topic>` which uses Node.js and Express for middleware. The React-based frontend can be found under `client` folder. 
