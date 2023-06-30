

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app  = express();
const port = 3001;


const configuration = new Configuration({
    // organization: "org-116GdI3bivetsydNnhzCYRLs",
    apiKey: "asdfasdfsad",
});
const openai = new OpenAIApi(configuration);


const models = openai.listModels().then(result => {
    console.log(result.data)
    return result.data;
});


app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 1500,
        temperature: 0.2,
    });

    if (response.data.choices) {
        console.log(response.data);
        res.json({
            message: response.data.choices[0].text
        })
    } else {
        console.log(response);
        res.json({
            message: "Something went wrong"
        })
    }
});

app.listen(port, () => {
    console.log('Example app listening');
});