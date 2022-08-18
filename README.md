# social-network-api

## Description

This app allows the user to view, create, update, and delete users, thoughts, friends, and reactions in a social network backend.

---

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Code Snippets](#code-snippets)
* [Technology](#technology)
* [Credits](#credits)
* [Testing](#testing)
* [License](#license)

---

## Installation

The files for this program can be downloaded [here](https://github.com/pdbesse/social-network-api/archive/refs/heads/main.zip). 

This app requires node.js to be installed. For download and installation instructions, please see [nodejs.org](https://nodejs.org/en/download/).

This app also requires Mongoose, Express, and Nodemon to be installed. To do this, open the terminal and navigate to the extracted folder. Enter: 
```
npm install
```
This will download any modules required for the app to work. 

---

## Usage

After downloading the files and installing the required modules, the user should enter
```
npm start
```
to start the server. 

The routes can then be tested in Insomnia.

A video walkthrough of the app can be viewed [here](https://youtu.be/QqDm2LhZ4tI).

---

## Code Snippets

This app splits the API routes up into controller functions and the routes themselves. I will highlight one example.

```javascript
createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json('Thought added')
            )
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    }
```

createThought creates a thought according to the thought schema using the data provided in the request body. It then finds a user by the user _id according to the _id procided in the request body. It adds the created thought's _id to the user's 'thoughts' array before either returning an error or 'Thought added'.

```javascript
router.route('/').post(createThought);
```

This route calls the createThought function from the thought controller when the '/' route is queried with the post method.


---

## Technology

Technology Used:
* [GitHub](https://github.com/)
* [GitBash](https://gitforwindows.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Javascipt](https://www.javascript.com/)
* [node.js](https://nodejs.org/en/)
* [Mongoose](https://mongoosejs.com/docs/)
* [Express](https://expressjs.com/)
* [Insomnia](https://docs.insomnia.rest/)

---

## Credits

All coding credited to Phillip Besse.

---

## Testing

All routes are tested in Insomnia. See video linked above.

---

## License

Phillip Besse's Social Network API is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

MIT License

Copyright (c) 2022 Phillip Besse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---