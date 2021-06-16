{
	photographers = [
        {
			"name": "Mimi Keel",
			"id": 243,
			"city": "London",
			"country": "UK",
			"tags": ["portrait", "events", "travel", "animals"],
			"tagline": "Voir le beau dans le quotidien",
			"price": 400,
			"portrait": "MimiKeel.jpg",
			"link": "./MimiKeel.html"
		},
		{
			"name": "Ellie-Rose Wilkens",
			"id": 930,
			"city": "Paris",
			"country": "France",
			"tags": ["sports", "architecture"],
			"tagline": "Capturer des compositions complexes",
			"price": 250,
			"portrait": "EllieRoseWilkens.jpg",
			"link": "./EllieRoseWilkens.html"
		},
		{
			"name": "Tracy Galindo",
			"id": 82,
			"city": "Montreal",
			"country": "Canada",
			"tags": ["art", "fashion", "events"],
			"tagline": "Photographe freelance",
			"price": 500,
			"portrait": "TracyGalindo.jpg",
			"link": "./TracyGalindo.html"

		},
		{
			"name": "Nabeel Bradford",
			"id": 527,
			"city": "Mexico City",
			"country": "Mexico",
			"tags": ["travel", "portrait"],
			"tagline": "Toujours aller de l'avant",
			"price": 350,
			"portrait": "NabeelBradford.jpg",
			"link": "./NabeelBradford.html"
		},
		{
			"name": "Rhode Dubois",
			"id": 925,
			"city": "Barcelona",
			"country": "Spain",
			"tags": ["sport", "fashion", "events", "animals"],
			"tagline": "Je crée des souvenirs",
			"price": 275,
			"portrait": "RhodeDubois.jpg",
			"link": "./RhodeDubois.html"
		},
		{
			"name": "Marcel Nikolic",
			"id": 195,
			"city": "Berlin",
			"country": "Germany",
			"tags": ["travel", "architecture"],
			"tagline": "Toujours à la recherche de LA photo",
			"price": 300,
			"portrait": "MarcelNikolic.jpg",
			"link": "./MarcelNikolic.html"
		}
	]   
}



var photographersList= document.querySelector(".photographersList");

function tags(tags){
return	`
<div class="photographerHashtags">
${tags.map(function(tag){
	return `<a href="#" class="Travel">#${tag}</a>`}).join("")}
</div>
`}


function photographersInfo (photographer){
return `

<figure class="photographer">
<a href="${photographer.link}"><img src="./SamplePhotos/PhotographersIDPhotos/${photographer.portrait}"
	alt="photo de ${photographer.name}" title="clicker pour voir ce photographe"
	class="photographerImg"></a>
	<figcaption class="photographerComment">
		<a href="${photographer.link}"><h2 class="photographerName">${photographer.name}</h2></a>
	<div class="photographerCommentText">
		<p class="photographerLocation">${photographer.city}, ${photographer.country}</p>
		<p class="photographerQuote">${photographer.tagline}</p>
		<p class="photographerFees">${photographer.price}€/jour</p>
	</div>
	${tags(photographer.tags)}
	
</figcaption>
</figure>
`
}

photographersList.innerHTML= `${photographers.map(photographersInfo).join("")}`






/// main page menu hashtags filter :

// const MenuBtnSearch = document.querySelectorAll(".MenuTag");
// const photographerInfo = document.querySelectorAll(".photographer");

// for (let i=0; i < MenuBtnSearch.length; i++){
// 	MenuBtnSearch[i].addEventListener("click", (e) => {
//     e.preventDefault();

// photographers.forEach((photographer) =>{
// 	console.log(photographer.tags)})})}





//     photographers.forEach((photographer) => {
// if (photographer.tags.contains(filterTags)){
// 	photographer.style.display = "block"}
//   else {
//     photographer.style.display = "none"}

