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
    { name: 'name', type: 'STRING' },
    { name: 'servingsize', type: 'FLOAT' },
    { name: 'calories', type: 'INTEGER' },
    { name: 'fat', type: 'INTEGER' },
    { name: 'cholesterol', type: 'INTEGER' },
    { name: 'sodium', type: 'INTEGER' },
    { name: 'carbs', type: 'INTEGER' },
    { name: 'protein', type: 'INTEGER' },
    { name: 'ing1', type: 'STRING' },
    { name: 'ing1serving', type: 'FLOAT' },
    { name: 'ing2', type: 'STRING' },
    { name: 'ing2serving', type: 'FLOAT' },
    { name: 'ing3', type: 'STRING' },
    { name: 'ing3serving', type: 'FLOAT' },
    { name: 'ing4', type: 'STRING' },
    { name: 'ing4serving', type: 'FLOAT' },
    { name: 'ing5', type: 'STRING' },
    { name: 'ing5serving', type: 'FLOAT' },
    { name: 'ing6', type: 'STRING' },
    { name: 'ing6serving', type: 'FLOAT' },
    { name: 'ing7', type: 'STRING' },
    { name: 'ing7serving', type: 'FLOAT' },
    { name: 'ing8', type: 'STRING' },
    { name: 'ing8serving', type: 'FLOAT' },
    { name: 'ing9', type: 'STRING' },
    { name: 'ing9serving', type: 'FLOAT' },
    { name: 'ing10', type: 'STRING' },
    { name: 'ing10serving', type: 'FLOAT' },
    { name: 'ing11', type: 'STRING' },
    { name: 'ing11serving', type: 'FLOAT' },
    { name: 'ing12', type: 'STRING' },
    { name: 'ing12serving', type: 'FLOAT' },
    { name: 'ing13', type: 'STRING' },
    { name: 'ing13serving', type: 'FLOAT' },
    { name: 'ing14', type: 'STRING' },
    { name: 'ing14serving', type: 'FLOAT' },
    { name: 'ing15', type: 'STRING' },
    { name: 'ing15serving', type: 'FLOAT' },
    { name: 'ing16', type: 'STRING' },
    { name: 'ing16serving', type: 'FLOAT' },
    { name: 'ing17', type: 'STRING' },
    { name: 'ing17serving', type: 'FLOAT' },
    { name: 'ing18', type: 'STRING' },
    { name: 'ing18serving', type: 'FLOAT' },
    { name: 'ing19', type: 'STRING' },
    { name: 'ing19serving', type: 'FLOAT' },
    { name: 'ing20', type: 'STRING' },
    { name: 'ing20serving', type: 'FLOAT' },
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
    //console.log(`Job ${job.id} started.`);
  
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
  
    // Print the results
    // console.log('Rows:');
    // rows.forEach(row => console.log(row.name));
    return rows;
  }

  async GetIngredients() {
    const queryString = `SELECT * FROM \`${ProjName}.${datasetId}.${IngredientTableID}\` LIMIT 1000`;
  
    const options = {
      query: queryString,
      location: 'US',
    };
  
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    //console.log(`Job ${job.id} started.`);
  
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
  
    // Print the results
    // console.log('Rows:');
    // rows.forEach(row => console.log(row.name));
    return rows;
  }

  async GetMeals() {
    const queryString = `SELECT * FROM \`${ProjName}.${datasetId}.${MealsTableID}\` LIMIT 1000`;
  
    const options = {
      query: queryString,
      location: 'US',
    };
  
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    //console.log(`Job ${job.id} started.`);
  
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
  
    // Print the results
    // console.log('Rows:');
    // rows.forEach(row => console.log(row.name));
    return rows;
  }


  async DeleteIngredient(name) {
    const queryString = `DELETE FROM \`${ProjName}.${datasetId}.${IngredientTableID}\` WHERE name='${name}'`;
  
    const options = {
      query: queryString,
      location: 'US',
    };
  
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    //console.log(`Job ${job.id} started.`);
  
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
  
    // Print the results
    // console.log('Rows:');
    // rows.forEach(row => console.log(row.name));
    return rows;
  }

  async CreateIngredient(name, servingsize, calories, fat=0,cholesterol=0,sodium=0,carbs=0,protein=0)
  {
    const queryString = `INSERT INTO \`${ProjName}.${datasetId}.${IngredientTableID}\` VALUES('${name}',${servingsize},${calories},${fat},${cholesterol},${sodium},${carbs},${protein})`;
    
    const options = {
      query: queryString,
      location: 'US',
    };
  
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    //console.log(`Job ${job.id} started.`);
  
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
  
    // Print the results
    // console.log('Rows:');
    // rows.forEach(row => console.log(row.name));
    return rows;
  }
}

console.log("blah");
//QueryIng("potato");
//createTable();
module.exports = {A};