//import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart');
const GRAPHSTATUS = document.getElementById("GraphStatus");
const GRAPHTYPE = document.getElementById("GraphType");
const DATEBEGIN = document.getElementById("DateBegin");
const DATEEND = document.getElementById("DateEnd");
const LINEBAR = document.getElementById("LineBar");

var curdate = getDate();


var Labels = [];
var CalorieData = [];
var NutritionData = [];
var WeightData = [];
var GraphData = [];
var CalorieDataset = [{
  label: 'Calorie Data',
  data: [1000],
  borderWidth: 1,
}];
InitializeVars();
const myChart = InitializeGraph();

function InitializeGraph()
{
  console.log(curdate);
  const MONTH = curdate[5] + curdate[6];
  const DAY = curdate[8] + curdate[9];
  
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [MONTH+'\\'+DAY],
      datasets: [{
        label: 'Calorie Data',
        data: [1000],
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

function ChangeGraph()
{

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
      LabelMaker(DATEBEGIN, DATEEND);
      if(LINEBAR.value == "Bar")
      {
        GRAPHSTATUS.style.visibility="hidden";
        ctx.style.visibility="visible";
        
        myChart.config.type = 'bar'
        //console.log(myChart.data.datasets[0].data);
        //console.log(myChart.data.labels[0]);
      }
      else
      {
        // console.log(DATEBEGIN.value == DATEEND.value);
        // console.log(DATEBEGIN.value < DATEEND.value);
        ctx.style.visibility="visible";
        //ctx.type='line';
        if(DATEEND.value != DATEBEGIN.value)
          myChart.config.type = 'line';
        else
          myChart.config.type = 'bar'
        GRAPHSTATUS.style.visibility="hidden";
      }

      if(DATEEND.value == DATEBEGIN.value)
      {
        
        for(var i = myChart.data.datasets.length-1; i >= 0; --i)
        {
          //reset everything so that it doesn't show a bunch of stuff for singular type graphs
          //myChart.data.datasets[i] = [];
        }
        myChart.data.labels = Labels; 
        switch(GRAPHTYPE.value)
        {

          case "Calories":
            //console.log("We got here");
            myChart.data.datasets[0].label = "Calorie Data";
            //console.log("error?");
            myChart.data.datasets[0].data = [CalorieData[Number(Labels[0][2] +Labels[0][3])-1]];
            break;
          case "Nutrition":
            for(var i = 0; i < 5; ++i)
            {
              myChart.data.datasets[i].data = [5*(NutritionData[Number(Labels[0][2] +Labels[0][3])-1])+i];
              switch(i){
                case 0:
                  myChart.data.datasets[i].label = "Iron"
                  break;
                case 1:
                  myChart.data.datasets[i].label = "Sugar"
                 break;
                case 2:
                  myChart.data.datasets[i].label = "Calcium"
                  break;
                case 3:
                  myChart.data.datasets[i].label = "Fat"
                  break;
                case 4:
                  myChart.data.datasets[i].label = "Potassium"
                  break;
                default:
                  console.log("error in setting the correct label for Nutrition");
              }
            }
            break;
          case "Weight":
            myChart.data.datasets[0].label = "Weight Data";
            myChart.data.datasets[0].data = [WeightData[Number(Labels[0][2] +Labels[0][3])-1]];
            break;
          default:
            console.log("something went wrong with GRAPHTYPE");

        }
      }
      if(GRAPHTYPE.value == "Calories")
      {

      }
      else if (GRAPHTYPE.value == "Nutrition")
      {

      }
      else
      {

      }

    }
    //console.log("end of func?");
    myChart.update();
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

function InitializeVars()
{
  for(var i = 0; i < 31; ++i)
  {
    for(var j=0; j < 5; ++j)
    {
      NutritionData[5*i + j] = Math.floor(Math.random() * 100);
    }
    CalorieData[i] = Math.floor(Math.random() * 1500) + 1500;
    WeightData[i] = Math.random() * 5 + 160
  }
}
function LabelMaker(begin, end)
{
  const startmonth = Number(begin.value[5] + begin.value[6]);
  const startday = Number(begin.value[8] + begin.value[9]);
  const endmonth = Number(end.value[5] + end.value[6]);
  const endday = Number(end.value[8] + end.value[9]);
  console.log(startmonth);
  console.log(startday);
  console.log(endmonth);
  console.log(endday);

  if(startmonth == endmonth)
  {
    Labels = [];//reset what labels is so it doesn't have random data
    
    for(var i = 0; i <= endday-startday; ++i)
    {
      Labels[i] = startmonth + '\/' + (startday + i);
    }
  }
  else
  {

  }
}