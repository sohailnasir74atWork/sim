const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/fetch-data', async (req, res) => {
    const mobileNumber = req.body.mobileNumber;
    const formData = new URLSearchParams();
    formData.append('action', 'get_number_data');
    formData.append('get_number_data', 'searchdata=' + mobileNumber);

    try {
        const response = await fetch('https://simownerdetails.pk/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
