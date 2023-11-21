const searchButton = async () => {
  const searchInput = document.getElementById('searchInput').value;
  console.log(searchInput)
  const card = document.getElementById('searchGameContainer')
  await fetch(`http://localhost:3000/games?title_like=${searchInput}`)
  .then(response => response.json())
  .then(
    result => {
      result.forEach((element) => {
     
        card.innerHTML += `
        <div class="col pb-3">
          <div class="card">
            <div class="card-body">
              <img src="${element.image}" class="card-img-top" alt="${element.title}"> 
              <div class="card-text d-flex flex-column text-center align-items-center">
                <h5 class="card-title py-3">${element.title}</h5>
                <div>
                  <button type="button" class="button" onclick="gameDetail(${element.id})">
                    <span class="button__text">Ver más!</span>
                    <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
   })
 }
 )}
 const gameDetail = id => {
  localStorage.setItem("id",id);
  window.location.href = '../pages/gameDetails.html'
};