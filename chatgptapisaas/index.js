

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app  = express();
const port = 3001;


const configuration = new Configuration({
    // organization: "org-116GdI3bivetsydNnhzCYRLs",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 100,
        temperature: 0,
    })
    .catch(error => {
        console.log("error occured" + error);
    });

    console.log(response.data);

    if (response.data.choices) {
        res.json({
            message: response.data.choices[0].text
        })
    } else {
        res.json({
            message: "Something went wrong"
        })
    }
});

app.listen(port, () => {
    console.log('Example app listening');
});