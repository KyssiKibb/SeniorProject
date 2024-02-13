//name of dataset where Data is
const ProjName = "seniorproject-414021";
const datasetId = "SeniorProj";
const MealsTableID = "meals_table";
const IngredientTableID = "ingredients_table"
// Import the Google Cloud client library and create a client
const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

'use strict';

async function createDataset() {
  // Creates a new dataset named "my_dataset".

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */


  // Specify the geographic location where the dataset should reside
  const options = {
    location: 'US',
  };

  // Create a new dataset
  const [dataset] = await bigquery.createDataset(datasetId, options);
  console.log(`Dataset ${dataset.id} created.`);
}
//createDataset();
console.log("blah");
// create a table using code
async function createTable() {
  // Creates a new table named "my_table" in "my_dataset".

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const datasetId = "my_dataset";
  const tableId = "meals_table";
  const schema = [
    { name: 'mealid', type: 'INTEGER' },
    { name: 'name', type: 'STRING' },
    { name: 'servingsize', type: 'FLOAT' },
    { name: 'calories', type: 'INTEGER' },
  ]
  // For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
  const options = {
    schema: schema,
    location: 'US',
  };

  // Create a new table in the dataset
  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tableId, options);

  console.log(`Table ${table.id} created.`);
}
class A{
  async QueryIng(name) {
    const queryString = `SELECT * FROM \`${ProjName}.${datasetId}.${IngredientTableID}\` WHERE name = '${name}' LIMIT 1`;
  
    const options = {
      query: queryString,
      location: 'US',
    };
  
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);
  
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
  
    // Print the results
    console.log('Rows:');
    rows.forEach(row => console.log(row.name));
    return rows;
  }
}

console.log("blah");
//QueryIng("potato");

module.exports = {A};