//name of dataset where Data is
const ProjName = "seniorproject-414021";
const datasetId = "SeniorProj";
const MealsTableID = "meals_table";
const IngredientTableID = "ingredients_table";
const DailyMealID = "daily_meals_table";
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
  const tableId = "daily_meals_table";
  const schema = [
    { name: 'Date', type: 'STRING' },
    { name: 'meal1', type: 'STRING' },
    { name: 'meal1serving', type: 'FLOAT64'},
    { name: 'meal2', type: 'STRING' },
    { name: 'meal2serving', type: 'FLOAT64'},
    { name: 'meal3', type: 'STRING' },
    { name: 'meal3serving', type: 'FLOAT64'},
    { name: 'meal4', type: 'STRING' },
    { name: 'meal4serving', type: 'FLOAT64'},
    { name: 'meal5', type: 'STRING' },
    { name: 'meal5serving', type: 'FLOAT64'},
    { name: 'meal6', type: 'STRING' },
    { name: 'meal6serving', type: 'FLOAT64'},
    { name: 'meal7', type: 'STRING' },
    { name: 'meal7serving', type: 'FLOAT64'},
    { name: 'meal8', type: 'STRING' },
    { name: 'meal8serving', type: 'FLOAT64'},
    { name: 'meal9', type: 'STRING' },
    { name: 'meal9serving', type: 'FLOAT64'},
    { name: 'meal10', type: 'STRING' },
    { name: 'meal10serving', type: 'FLOAT64'},

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

  async GetMeal(name) {
    const queryString = `SELECT * FROM \`${ProjName}.${datasetId}.${MealsTableID}\` WHERE name='${name}' LIMIT 1`;
  
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

  async GetDaily(date)
  {
    const queryString = `SELECT * FROM \`${ProjName}.${datasetId}.${DailyMealID}\` WHERE Date='${date}' LIMIT 1`;

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

  async DeleteMeal(name) {
    const queryString = `DELETE FROM \`${ProjName}.${datasetId}.${MealsTableID}\` WHERE name='${name}'`;
  
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

  async CreateMeal(name,servingsize,calories,fat,cholesterol,sodium,carbs,protein,
    ingredients,ingredientservings)
  {
    var queryString = `INSERT INTO \`${ProjName}.${datasetId}.${MealsTableID}\` VALUES('${name}',${servingsize},${calories},${fat},${cholesterol},${sodium},${carbs},${protein}`;
    for(var i = 0; i < 20; ++i)
    {
      if(i < ingredients.length)
      {
        queryString += `,'${ingredients[i]}',${ingredientservings[i]}`;
      }
      else
      {
        queryString += `,NULL,NULL`;
      }
    }
    queryString += ')';

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

  async CreateDaily(date)
  {
    var queryString = `INSERT INTO \`${ProjName}.${datasetId}.${DailyMealID}\` VALUES('${date}'`;
    for(var i = 0; i < 10; ++i)
    {
      queryString += `,NULL,NULL`;
    }
    queryString += ',NULL)';//final null is Notes

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

  async UpdateIngredient(name, servingsize, calories, fat=0,cholesterol=0,sodium=0,carbs=0,protein=0)
  {
    const queryString = `UPDATE \`${ProjName}.${datasetId}.${IngredientTableID}\` SET servingsize=${servingsize},calories=${calories},fat=${fat},cholesterol=${cholesterol},sodium=${sodium},carbs=${carbs},protein=${protein} WHERE name='${name}'`;
    
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

  async UpdateDaily(date, meals, servings)
  {
      var queryString = `UPDATE \`${ProjName}.${datasetId}.${DailyMealID}\` SET `;

      console.log(meals.length)
      for(var i= 0; i < meals.length; ++i)
      {
        if(i==0)
          queryString += `meal${i+1}='${meals[i]}', meal${i+1}serving=${servings[i]}`;
        else
          queryString += `,meal${i+1}='${meals[i]}', meal${i+1}serving=${servings[i]}`;
        //console.log(queryString);
      }
      for(var i= meals.length; i < 10; ++i)//stragglers
      {
        if(i==0)
          queryString += `meal${i+1}=NULL, meal${i+1}serving=NULL`;
        else
          queryString += `,meal${i+1}=NULL, meal${i+1}serving=NULL`;
      }

      queryString += ` WHERE Date='${date}' `;
    
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

//console.log("blah");
//QueryIng("potato");
//createTable();

module.exports = {A};