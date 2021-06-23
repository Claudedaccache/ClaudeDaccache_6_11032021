// fetch("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json")
// .then(response => {
//    return response.json();
// }).then(data => console.log(data)) 
// .catch(function (err) {
//     console.log("Fetch problem show: " + err.message);
//   });


// fetch("./index.json")
// .then(response => {
//    return response.json();
// })
// .then(data => console.log(data)) 
// .catch(function (err) {
//     console.log("Fetch problem show: " + err.message);
//   });


async function dataCollection (){
const response = await fetch("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json");
const data = await response.json()
console.log (data)
}

dataCollection()