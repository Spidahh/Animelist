function renderAnime(data) {
  const container = document.getElementById("animeList");
  const genreFilter = document.getElementById("genreFilter");
  container.innerHTML = "";

  const genres = new Set();
  data.forEach(row => {
    if (row["Genere principale"]) genres.add(row["Genere principale"]);
  });

  genreFilter.innerHTML = '<option value="Tutti">Tutti</option>';
  Array.from(genres).sort().forEach(g => {
    genreFilter.innerHTML += `<option value="${g}">${g}</option>`;
  });

  // Rileva se siamo su GitHub Pages con una sottocartella tipo /Animelist/
  const basePath = window.location.pathname.includes("Animelist") ? "/Animelist" : "";

  function filterAndRender() {
    const selected = genreFilter.value;
    container.innerHTML = "";
    data
      .filter(row => selected === "Tutti" || row["Genere principale"] === selected)
      .forEach(anime => {
        const imagePath = `${basePath}${anime["Link con immagine rappresentativa"]}`;
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
          <img src="${imagePath}" alt="${anime["Titolo originale"]}">
          <div class="anime-info">
            <h3>${anime["Titolo originale"]}</h3>
            <p><strong>Genere:</strong> ${anime["Genere principale"]}</p>
            <p><strong>Voto:</strong> ${anime["VOTO"]}/10</p>
            <p><strong>Anno:</strong> ${anime["ANNO"]}</p>
          </div>
        `;
        container.appendChild(card);
      });
  }

  genreFilter.onchange = filterAndRender;
  filterAndRender();
}

Papa.parse("anime.csv", {
  download: true,
  header: true,
  complete: function(results) {
    renderAnime(results.data);
  }
});

