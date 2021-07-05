const express =  require('express');
const app = express();
const fs= require('fs');
const BigEval = require('bigeval')
app.use(express.json())

const PORT = process.env.PORT || 8080;

//declare global variable
var tariff = null;

//read value from Json file
fs.readFile('data/tariffData.json', (err, data) => {
    if (err) throw err;
    tariff = JSON.parse(data);
});


app.listen(PORT,
    ()=> console.log(`it is alive http://localhost:${PORT}`)
    );

    app.get('/api/tariff/:consumption',
        (req,res)=>{
            //let tariff = JSON.parse(rawdata);
            //res.status(200).send(tariff)
            var consumption = parseInt(req.params.consumption);
            var Obj = new BigEval();
            tariff.forEach(function(record) {
               record.AnnualCost = eval(record.AnnualCostformula.replace(new RegExp('consumption', 'g'), consumption.toString()));
            });

            tariff.sort((a, b) => {
                return  a.AnnualCost - b.AnnualCost; // ascending
              })

            res.json(tariff);
        });

