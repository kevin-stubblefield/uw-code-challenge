const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

const PORT = 3000;

app.use(cors());

app.get('/repositories', async (req, res) => {
    let response = {};
    try {
        response = await axios.get('https://api.github.com/repositories?since=1000');
    } catch(error) {
        return res.status(403).send(`Sorry, we hit our rate limit and can't retrieve the repositories. Try again in an hour.`);
    }

    let repos = response.data;

    let dataToSend = {};
    for (repo of repos) {
        let username = repo.owner.login;
        if (!dataToSend.hasOwnProperty(username)) {
            dataToSend[username] = {};
            dataToSend[username].avatarUrl = repo.owner.avatar_url;

            if (username[0].toLowerCase() === 'a') {
                dataToSend[username].followers = await getFollowers(repo.owner.followers_url);
            }
        }
    }

    return res.json(dataToSend);
});

getFollowers = async (url) => {
    let response = {};
    try {
        response = await axios.get(url);
    } catch(error) {
        return `Sorry, we hit our rate limit and can't retrieve the followers for this user. Try again in an hour.`;
    }

    let followers = response.data.map(follower => { 
        return follower.login;
    });
    return followers.join('\n');
};

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});