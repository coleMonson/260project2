document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();

  let value = document.getElementById("materialInput").value;
  value = value.replace(" ", "_");
  //value = "big_hearty_radish"; // auto-value for testing

  const url = "https://botw-compendium.herokuapp.com/api/v2/entry/" + value;

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      console.log(json);

      let results = "";

      let name = json.data.name;
      results += '<div class="label name">' + name.charAt(0).toUpperCase() + name.slice(1) + "</div>";

      results += '<div class="picture">';
      results += '<img src="' + json.data.image + '"/>';
      results += "</div>";

      results += '<div class="description">' + json.data.description + "</div>";

      results += '<div class="label">' + "Common locations: " + "</div>";
      results += '<div class="locations">';
      for (let i = 0; i < json.data.common_locations.length; ++i) {
        results += '<div class="location">' + json.data.common_locations[i] + '</div>';
      }
      results += "</div>";

      let hearts = json.data.hearts_recovered;
      let effect = json.data.cooking_effect;

      if (hearts > 0) {
        results += '<div class="bottom label">' + "Hearts recovered: " + "</div>";
        results += '<div class="info heartIcons">';
        for (let i = 0; i < Math.floor(hearts); ++i) {
          results += '<i class="fas fa-heart"></i>';
        }
        if (Math.round(hearts) != hearts) {
          results += '<i class="half fas fa-heart"></i>';
        }
        results += "</div>";
      }

      if (!(effect == "")) {
        results += '<div class="bottom label">' + "Cooking effect: " + "</div>";
        results += '<div class="info effect">' + effect + "</div>";
      }

      document.getElementById("materialResults").innerHTML = results;
    });
});