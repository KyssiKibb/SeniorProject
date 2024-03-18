//import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart');
const GRAPHSTATUS = document.getElementById("GraphStatus");
const GRAPHTYPE = document.getElementById("GraphType");
const DATEBEGIN = document.getElementById("DateBegin");
const DATEEND = document.getElementById("DateEnd");
const LINEBAR = document.getElementById("LineBar");

var curdate = getDate();
var DAYS_IN_MONTH;
if(new Date().getFullYear() % 4 == 0)
  DAYS_IN_MONTH = [31,29,31,30,31,30,31,31,30,31,30,31];
else
  DAYS_IN_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
//console.log(DAYS_IN_MONTH[1]);

var QUERIEDBEGIN;
var QUERIEDEND;

var Labels = [];
var YearLabels = [];
var CalorieData = [];
var FatData = [];
var CholesterolData = [];
var SodiumData = [];
var CarbData = [];
var ProteinData = [];

var WeightData = [];
var GraphData = [];
const MONTH = curdate[5] + curdate[6];
const DAY = curdate[8] + curdate[9];
const YEAR = curdate[0] + curdate[1]; + curdate[2] + curdate[3];
var dbdate = getDateDatabase();

var myChart;

InitData();



async function GetData()
{
  LabelMaker(DATEBEGIN.value, DATEEND.value);
  YearLabelMaker(DATEBEGIN.value, DATEEND.value);
  CalorieData = [];
  FatData = [];
  CholesterolData = [];
  SodiumData = [];
  CarbData = [];
  ProteinData = [];

  QUERIEDBEGIN = DATEBEGIN.value;
  QUERIEDEND = DATEEND.value;

  for(var i = 0; i < Labels.length; ++i)
  {
    console.log(`Querying: ${YearLabels[i]}`);
    await fetch(`http://localhost:5500/GetDaily?search=${YearLabels[i]}`)
    .then(response => response.json())
    .then(meals => {
      if(meals.length == 0)
      {
        CalorieData[i] = 0;
        FatData[i] = 0;
        CholesterolData[i] = 0;
        SodiumData[i] = 0;
        CarbData[i] = 0;
        ProteinData[i] = 0;

      }
      else
      {
        CalorieData[i] = meals[0].calories;
        FatData[i] = meals[0].fat;
        CholesterolData[i] = meals[0].cholesterol;
        SodiumData[i] = meals[0].sodium;
        CarbData[i] = meals[0].carbs;
        ProteinData[i] = meals[0].protein;
      }

    })
  }
}

async function InitData()
{
  await fetch(`http://localhost:5500/GetDaily?search=${dbdate}`)
  .then(response => response.json())
  .then(meals => {
    if(meals.length == 0)
      CalorieData[0] = 0;
    else
      CalorieData[0] = meals[0].calories;
  }).then(() => {
    setTimeout(()=>{InitializeGraph();},10);
    //InitializeGraph();
  });

}


async function InitializeGraph()
{
  //console.log(curdate);
  LabelMaker(DATEBEGIN.value, DATEEND.value);
  
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Labels,
      datasets: [{
        label: 'Calorie Data',
        data: CalorieData,
        borderWidth: 1,
      }]},
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



async function ChangeGraph()
{
    //console.log(myChart);
    //console.log(DATEBEGIN.value);

    // console.log(Begin.getDate());
    // console.log(DATEEND);
    // console.log(DATEEND);
    // console.log(ctx);

    if(DATEEND.value < DATEBEGIN.value) //invalid dates
    {
        ctx.style.visibility="hidden";
        GRAPHSTATUS.style.visibility="visible";
    }
    else
    {
      if(QUERIEDBEGIN != DATEBEGIN.value || QUERIEDEND != DATEEND.value)
        await GetData();//grab all of the data we need
      GRAPHSTATUS.style.visibility = "hidden";
      ctx.style.visibility="visible";
      myChart.destroy();
      if(GRAPHTYPE.value == "Calories")
      {
        myChart = new Chart(ctx, {
          type: `${LINEBAR.value.toLowerCase()}`,
          data: {
            labels: Labels,
            datasets: [{
              label: 'Calories',
              data: CalorieData,
              borderWidth: 1,
            }]},
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
      else if(GRAPHTYPE.value == "Weight")
      {
        myChart = new Chart(ctx, {
          type: `${LINEBAR.value.toLowerCase()}`,
          data: {
            labels: Labels,
            datasets: [{
              label: 'Weight',
              data: WeightData,
              borderWidth: 1,
            }]},
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
      else
      {
        myChart = new Chart(ctx, {
          type: `${LINEBAR.value.toLowerCase()}`,
          data: {
            labels: Labels,
            datasets: [{
              label: 'Fat',
              data: FatData,
              borderWidth: 1,
              }, 
              {
                label: 'Cholesterol',
                data: CholesterolData,
                borderWidth: 1,
              }, 
              {
                label: 'Sodium',
                data: SodiumData,
                borderWidth: 1,
              }, 
              {
                label: 'Carbs',
                data: CarbData,
                borderWidth: 1,
              },
              {
                label: 'Protein',
                data: ProteinData,
                borderWidth: 1,
              }]},
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }


    }
    
    //   if(LINEBAR.value == "Bar")
    //   {
    //     GRAPHSTATUS.style.visibility="hidden";
    //     ctx.style.visibility="visible";
        
    //     myChart.config.type = 'bar'
    //     console.log(myChart.data.datasets[0].data);
    //     console.log(myChart.data.labels[0]);
    //   }
    //   else
    //   {
    //     // console.log(DATEBEGIN.value == DATEEND.value);
    //     // console.log(DATEBEGIN.value < DATEEND.value);
    //     ctx.style.visibility="visible";
    //     //ctx.type='line';
    //     if(DATEEND.value != DATEBEGIN.value)
    //       myChart.config.type = 'line';
    //     else
    //       myChart.config.type = 'bar'
    //     GRAPHSTATUS.style.visibility="hidden";
    //   }

    //   if(DATEEND.value == DATEBEGIN.value)
    //   {
        
    //     for(var i = myChart.data.datasets.length-1; i >= 0; --i)
    //     {
    //       //reset everything so that it doesn't show a bunch of stuff for singular type graphs
    //       //myChart.data.datasets[i] = [];
    //     }
    //     myChart.data.labels = Labels; 
    //     switch(GRAPHTYPE.value)
    //     {

    //       case "Calories":
    //         //console.log("We got here");
    //         myChart.data.datasets[0].label = "Calorie Data";
    //         //console.log("error?");
    //         myChart.data.datasets[0].data = [CalorieData[Number(Labels[0][2] +Labels[0][3])-1]];
    //         break;
    //       case "Nutrition":
    //         for(var i = 0; i < 5; ++i)
    //         {
    //           myChart.data.datasets[i].data = [5*(NutritionData[Number(Labels[0][2] +Labels[0][3])-1])+i];
    //           switch(i){
    //             case 0:
    //               myChart.data.datasets[i].label = "Iron"
    //               break;
    //             case 1:
    //               myChart.data.datasets[i].label = "Sugar"
    //              break;
    //             case 2:
    //               myChart.data.datasets[i].label = "Calcium"
    //               break;
    //             case 3:
    //               myChart.data.datasets[i].label = "Fat"
    //               break;
    //             case 4:
    //               myChart.data.datasets[i].label = "Potassium"
    //               break;
    //             default:
    //               console.log("error in setting the correct label for Nutrition");
    //           }
    //         }
    //         break;
    //       case "Weight":
    //         myChart.data.datasets[0].label = "Weight Data";
    //         myChart.data.datasets[0].data = [WeightData[Number(Labels[0][2] +Labels[0][3])-1]];
    //         break;
    //       default:
    //         console.log("something went wrong with GRAPHTYPE");

    //     }
    //   }
    //   if(GRAPHTYPE.value == "Calories")
    //   {
    //     myChart.destroy();
    //     myChart = new Chart(ctx, {
    //       type: `${LINEBAR.value.toLowerCase()}`,
    //       data: {
    //         labels: Labels,
    //         datasets: [{
    //           label: 'Calorie Data',
    //           data: CalorieData,
    //           borderWidth: 1,
    //         }]},
    //       options: {
    //         scales: {
    //           y: {
    //             beginAtZero: true
    //           }
    //         }
    //       }
    //     });
    //   }
    //   else if (GRAPHTYPE.value == "Nutrition")
    //   {
    //     myChart.destroy();
    //     myChart = new Chart(ctx, {
    //       type: `${LINEBAR.value.toLowerCase()}`,
    //       data: {
    //         labels: Labels,
    //         datasets: [{
    //           label: 'NutritionData',
    //           data: NutritionData,
    //           borderWidth: 1,
    //         }]},
    //       options: {
    //         scales: {
    //           y: {
    //             beginAtZero: true
    //           }
    //         }
    //       }
    //     });
    //   }
    //   else
    //   {
    //     myChart.destroy();
    //     myChart = new Chart(ctx, {
    //       type: `${LINEBAR.value.toLowerCase()}`,
    //       data: {
    //         labels: Labels,
    //         datasets: [{
    //           label: 'Weight Data',
    //           data: WeightData,
    //           borderWidth: 1,
    //         }]},
    //       options: {
    //         scales: {
    //           y: {
    //             beginAtZero: true
    //           }
    //         }
    //       }
    //     });
    //   }

    // }
    // myChart.update();

}

function getDate()
{
  const TODAY = new Date();
  
  curdate = TODAY.getFullYear();
  curdate += '-';
  if(TODAY.getMonth()+1 < 10) //have to add leading 0
  {
    curdate += '0' + (TODAY.getMonth()+1) + '-';
  }
  else
  {
    curdate += (TODAY.getMonth()+1) + '-';
  }
  if(TODAY.getDate() < 10)
  {
    curdate += '0' + TODAY.getDate();
  }
  else
  {
    curdate += TODAY.getDate();
  }
  DATEBEGIN.value = curdate;
  DATEEND.value = curdate;
  //console.log(curdate);
  return curdate;
}

function getDateDatabase()
{
  const TODAY = new Date();
  var day= (TODAY.getMonth()+1) + '\/';
  day += TODAY.getDate();
  day += '\/';
  day+= TODAY.getFullYear();

  return day;
}


function LabelMaker(begin, end)
{

  var startmonth = Number(begin[5] + begin[6]);
  if(begin[5] == '0')
    startmonth = Number(begin[6]);
  var startday = Number(begin[8] + begin[9]);
  if(begin[8] == '0')//get rid of leading 0
    startday = Number(begin[9]);
  var endmonth = Number(end[5] + end[6]);
  if(end[5] == '0')
    endmonth = Number(end[6]);
  var endday = Number(end[8] + end[9]);
  if(end[8] == '0')//get rid of leading 0
    endday = Number(begin[9]);



  //console.log(startmonth);
  //console.log(startday);
  //console.log(endmonth);
  //console.log(endday);

  if(startmonth == endmonth)
  {
    Labels = [];//reset what labels is so it doesn't have random data
    
    for(var i = 0; i <= endday-startday; ++i)
    {
      Labels[i] = startmonth + '\/' + (startday + i);

    }
  }
  else if(startmonth < endmonth) //goes between 2 months, not a year change
  {
    Labels = [];
    var i = 0;
    var month = startmonth;
    var day = startday;
    while(month != endmonth || (day-1) != endday)
    {
      //console.log("looping");
      Labels[i] = month + '\/' + day;
      day++;
      if(day % DAYS_IN_MONTH[month-1] == 0)
      {
        month++;
        day = 1;//start of next month
      }
      i++;
    }

  }
  else//goes between 2 months, there was a year change
  {
    Labels = [];
    var i = 0;
    var month = startmonth;
    var day = startday;
    while(month != endmonth || (day-1) != endday)
    {
      Labels[i] = month + '\/' + day;
      day++;
      if(day % DAYS_IN_MONTH[month-1] == 1) //gone to 1st day of next month
      {
        month++;
        if(month % 12 == 1)
          month = 1;//go back to january
        day = 1;//start of next month
      }
      i++;
    }
  }
}

function YearLabelMaker(begin, end)
{

  var startmonth = Number(begin[5] + begin[6]);
  if(begin[5] == '0')
    startmonth = Number(begin[6]);
  var startday = Number(begin[8] + begin[9]);
  if(begin[8] == '0')//get rid of leading 0
    startday = Number(begin[9]);
  var endmonth = Number(end[5] + end[6]);
  if(end[5] == '0')
    endmonth = Number(end[6]);
  var endday = Number(end[8] + end[9]);
  if(end[8] == '0')//get rid of leading 0
    endday = Number(begin[9]);
  var startyear = Number(begin[0]+begin[1]+begin[2]+begin[3]);
  var endyear = Number(end[0]+end[1]+end[2]+end[3]);

  console.log(begin[0]);
  console.log(begin[1]);
  console.log(begin[2]);
  console.log(begin[3]);
  //console.log(startmonth);
  //console.log(startday);
  //console.log(endmonth);
  //console.log(endday);

  if(startmonth == endmonth)
  {
    YearLabels = [];//reset what labels is so it doesn't have random data
    
    for(var i = 0; i <= endday-startday; ++i)
    {
      YearLabels[i] = startmonth + '\/' + (startday + i) + '\/' + startyear;

    }
  }
  else if(startmonth < endmonth) //goes between 2 months, not a year change
  {
    console.log(startyear);
    YearLabels = [];
    var i = 0;
    var month = startmonth;
    var day = startday;
    year=startyear;
    while(month != endmonth || (day-1) != endday)
    {
      YearLabels[i] = month + '\/' + day + '\/' + year;
      day++;
      if(day % DAYS_IN_MONTH[month-1] == 0)
      {
        month++;
        day = 1;//start of next month
      }
      i++;
    }

  }
  else//goes between 2 months, there was a year change
  {
    YearLabels = [];
    var i = 0;
    var month = startmonth;
    var day = startday;
    var year = startyear;
    while(month != endmonth || (day-1) != endday)
    {
      YearLabels[i] = month + '\/' + day + '\/' + year;
      day++;
      if(day % DAYS_IN_MONTH[month-1] == 1) //gone to 1st day of next month
      {
        month++;
        if(month % 12 == 1)
        {
          month = 1;//go back to january
          year++;
        }

        day = 1;//start of next month
      }
      i++;
    }
  }
}