// scrolling btn
var scrollBtn = document.querySelector("#scrollMainPage");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  // console.log(scrolled)

  if (scrolled < 300) {
    scrollBtn.style.display = "none";
  } else {
    scrollBtn.style.display = "block";
    scrollBtn.style.position = "fixed";
  }
});

// increasing and decreasing likes:                            not workingggg

var likesNumber = document.querySelectorAll(".likesNumber");

// icons.forEach((icon) => icon.addEventListener("click",  () => {

// if(icon.className === "LikesIcon i.resp"){
//   parseInt(likesNumber++)
// }
// else {
//   parseInt(likesNumber--)
// }

// }))

// for (i=0; i < icons.length; i++){
//   icons[i].addEventListener("click", () => {

//   if(icons.checked == true ){
//       // parseInt(likesNumber++)
//       likesNumber.textContent++
// }
// else {
//     // parseInt(likesNumber--)
//     likesNumber.textContent--

//   }
// })}

// total likes:

// var totalLikes = document.querySelector("photographerLikesSec imput")
// var sum =0
// likesNumber.forEach((like) => {
//   var likeValue = parseInt(like.textContent)
//   sum+=likeValue
// })

//   console.log(sum)

// opening of filter menu:
// filterIcon.addEventListener("click", () => {
//   if (filterNotActive.className === "notActive") {
//     filterNotActive.className += " responsive";
//   } else {
//     filterNotActive.className = "notActive";
//   }
// })
