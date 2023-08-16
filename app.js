(async ()=>{
    const response = await fetch("./movie-data.json");
    const movies = await response.json();
    console.log(movies);

    const genreBtn = document.getElementById("genre");
    const yearBtn = document.getElementById("year");
    const languageBtn = document.getElementById("language");
    const ratingBtn = document.getElementById("rating");
    const para = document.getElementById("para");

    para.display = 'hidden';

function displaySearchResult(results){
  
if(results.length === 0){
  para.display = "block";
  para.innerHTML = `Please Select Atleast 3 Options OR No Record Found`;
  table.innerHTML =""
}else{

  
  table.innerHTML =" ";
  counter = 1;
  results.forEach((movie)=>{
    let date =movie.release_date.split("-");
    let year = date[0];
    let time = toHoursAndMinutes(movie.runtime);
    let hr = time.hours;
    let min = time.minutes; 
    para.innerHTML = ``
     table.innerHTML +=  `
       <tr class="bg-white border-b dark:bg-white-200 text-gray-900 dark:border-gray-700">
       <td class="px-6 py-3">${movie.id}</td>
       <td class="px-6 py-3 flex"> <div><img class="px-2 inline-block" src="${'https://image.tmdb.org/t/p/w45' + movie.poster_path}" />
            </div>  <div><div class="font-semibold text-xl text-blue-500 pb-2">
            ${movie.title}</div>
            <button class="bg-gray-100 border-black-500 border-2 text-blackfont-bold text-center p-[1px] mr-2 rounded">${movie.certification}</button> ${movie.genres.toString(" , ")} • ${hr}h ${min}m</div></td>
       <td class="px-6 py-3">${year}</td>
       </tr>
       `;
       counter++;
       
      })
    }
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

console.log(toHoursAndMinutes(100));


    
function valCheck(value){
  if(value == 'all'){return true}
  return false;
}


function search(){
 
  let genreQuery = document.getElementById("genre").value.toLowerCase();
  let yearQuery = document.getElementById("year").value.toLowerCase();
  let languageQuery = document.getElementById("language").value.toLowerCase();
  let ratingQuery = document.getElementById("rating").value.toLowerCase();
  const results = movies.filter(function(movie){
    let date =movie.release_date.split("-");
    let year = date[0];

  if ((!valCheck(languageQuery)) && (!valCheck(ratingQuery) && (!valCheck(yearQuery) && (!valCheck(genreQuery))))){
    return(
      movie.original_language.toLowerCase().includes(languageQuery) && movie.vote_average >= ratingQuery && movie.genres.toString(" ").toLowerCase().includes(genreQuery) && year == yearQuery
    )
  }
  else if ((valCheck(languageQuery)) && (!valCheck(ratingQuery) && (!valCheck(yearQuery) && (!valCheck(genreQuery))))){
      return(
          movie.vote_average >= ratingQuery && movie.genres.toString(" ").toLowerCase().includes(genreQuery) && year == yearQuery
      )
  }
  else if ((!valCheck(languageQuery)) && (valCheck(ratingQuery) && (!valCheck(yearQuery) && (!valCheck(genreQuery))))){
      return( 
          movie.original_language.toLowerCase().includes(languageQuery) && movie.genres.toString(" ").toLowerCase().includes(genreQuery) 
          && year == yearQuery ) 
  }
  else if ((!valCheck(languageQuery)) && (!valCheck(ratingQuery) && (valCheck(yearQuery) && (!valCheck(genreQuery))))){
      return( 
          movie.original_language.toLowerCase().includes(languageQuery) &&
          movie.vote_average >= ratingQuery && movie.genres.toString(" ").toLowerCase().includes(genreQuery) 
          ) 
  }
  else if((!valCheck(languageQuery)) && (!valCheck(ratingQuery) && (!valCheck(yearQuery) && (valCheck(genreQuery))))){
      return( 
          movie.original_language.toLowerCase().includes(languageQuery) &&
          movie.vote_average >= ratingQuery && year == yearQuery ) 
      }
  else{
  return false;
  }
  })

 console.log(genreQuery);
 console.log(yearQuery);
 console.log(languageQuery);
 console.log(ratingQuery);
 console.log(results);
 displaySearchResult(results);
}
btnElem.addEventListener("click", search);

})();