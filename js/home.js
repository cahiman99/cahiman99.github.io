const base_url = "https://api.football-data.org/v2/"
const api_bola = '6caeaa7f6edc44a6ae50e4556e77a36e'
let fetchApi = base_url => {
  return fetch(base_url, {
    headers: {
    'X-Auth-Token': api_bola
    }
  });
}
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  console.log("Error : " + error);
}



function getTeams() {
   if ("caches" in window) {
      caches.match(base_url + "competitions/2021/teams", {mode: 'no-cors'}, {
        headers: {
        'X-Auth-Token': api_bola
        }
      }).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var teamsHTML = "";
            data.teams.forEach(function(datateams) {
              let urlTeamImage = datateams.crestUrl;
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');

              teamsHTML += `
                  <div class="col s12 m4">
                    <div style="border-radius: 20px;" class="card hoverable">
                      <div class="card-image">
                        <center>
                        <img class="responsive-img" src="${urlTeamImage}" style="padding:10px; width:300px; height: 300px;" />
                        </center>
                      </div>
                      <div class="card-content center">
                        <h5 style="font-weight: bold;">${datateams.name} (${datateams.tla})</h5>
                        <p>${datateams.founded}</p>
                        <p>${datateams.website}</p>
                      </div>
                      <div style="border-radius: 20px;" class="card-action center">
                        <a href="./detail_team.html?id=${datateams.id}" style="border-radius: 5px;" class="waves-effect waves-light btn-large"><i class="material-icons right">navigate_next</i>Detail Profile Team</a>
                      </div>
                    </div>
                    </div>
                  `;
            });
            document.getElementById("teams").innerHTML = teamsHTML;
          });
        }
      });
    }

  fetch(base_url + "competitions/2021/teams", {
      headers: { 'X-Auth-Token': api_bola },
    })
      .then(status)
      .then(json)
       .then(function(data) {
            var teamsHTML = "";
            data.teams.forEach(function(datateams) {
              let urlTeamImage = datateams.crestUrl;
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
              teamsHTML += `
                    <div class="col s12 m4">
                    <div style="border-radius: 20px;" class="card hoverable">
                      <div class="card-image">
                        <center>
                        <img class="responsive-img" src="${urlTeamImage}" style="padding:10px; width:300px; height: 300px;" />
                        </center>
                      </div>
                      <div class="card-content center">
                        <h5 style="font-weight: bold;">${datateams.name} (${datateams.tla})</h5>
                        <p>${datateams.founded}</p>
                        <p>${datateams.website}</p>
                      </div>
                      <div class="card-action center" style="border-radius: 20px;">
                        <a href="./detail_team.html?id=${datateams.id}" style="border-radius: 5px;" class="waves-effect waves-light btn-large"><i class="material-icons right">navigate_next</i>Detail Profile Team</a>
                      </div>
                    </div>
                    </div>
                  `;
            });
            document.getElementById("teams").innerHTML = teamsHTML;
          })
          .catch(error);
    }
   


function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam, {mode: 'no-cors'}, {
         headers: {
          'X-Auth-Token': api_bola
          }
      }).then(function(response) {
        if (response) {
          response.json().then(function(data) {

          let urlTeamImage = data.crestUrl;
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
          var detail_teamHTML = `
              <div class="container">
                <div class="col s12">
                  <div style="border-radius: 20px;" class="card horizontal">
                    <div class="card-image responsive-img">
                        <img src="${urlTeamImage}" style="padding:7px;" width="250px" height="250px">
                    </div>
                    <div class="card-stacked">
                      <div class="card-content">
                          <p><b>Nama Tim       </b> : ${data.name} (${data.tla}) </p>
                          <p><b>Nama Panggilan </b> : ${data.shortName}</p>
                          <p><b>Warna Kaos     </b> : ${data.clubColors}</p>
                          <p><b>Berdiri        </b> : ${data.founded}</p>
                          <p><b>E-mail         </b> : ${data.email}</p>
                          <p><b>Stadion        </b> : ${data.venue}</p>
                          <p><b>Telepon        </b> : ${data.phone}</p>
                          <p><b>Alamat         </b> : ${data.address}</p>
                      </div>
                      <div class="card-action">
                          <a href="${data.website}" target="_BLANK" style="border-radius: 5px;" class="waves-effect waves-light btn-small"><i class="material-icons right">navigate_next</i>Go To Website</a>
                      </div>
                    </div>
                  </div>
                </div>  
                </div>
              <div class="container">
                  <h3 class="center"> Squad Team </h3>
                  <hr style="width: 250px; border-top: 3px solid #7cb342;">
                   <ul  style="border-radius: 20px;" class="collection">`;
                      data.squad.forEach(function(squad) {
                      detail_teamHTML += `
                          <li class="collection-item avatar">
                            <img src="../aset/user.svg" alt="icon-user" class="circle">
                            <p><b>Nama :</b> ${squad.name}</p>
                            <p><b>TTL :</b> ${squad.countryOfBirth}, ${new Date(squad.dateOfBirth).toDateString()}</p>
                            <p><b>Kebangsaan :</b> ${squad.nationality}</p>
                            <p><b>Peran :</b> ${squad.role}</p>
                            <p><b>Posisi Main :</b> ${squad.position}</p>
                            <p><b>Nomor Punggung :</b> ${squad.shirtNumber}</p>
                          </li>`;
                      });
                      detail_teamHTML+=`
                  </ul>
             </div>
            `;

          document.getElementById("body-content").innerHTML = detail_teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

  fetch(base_url + "teams/" + idParam, {
          headers: { 'X-Auth-Token': api_bola },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      let urlTeamImage = data.crestUrl;
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
      // Menyusun komponen card artikel secara dinamis
      var detail_teamHTML = `
              <div class="container">
                <div class="col s12">
                  <div style="border-radius: 20px;" class="card horizontal">
                      <div class="card-image responsive-img">
                        <img src="${urlTeamImage}" style="padding:7px;" width="250px" height="250px">
                      </div>
                    <div class="card-stacked">
                      <div class="card-content">
                          <p><b>Nama Tim       </b> : ${data.name} (${data.tla}) </p>
                          <p><b>Nama Panggilan </b> : ${data.shortName}</p>
                          <p><b>Warna Kaos     </b> : ${data.clubColors}</p>
                          <p><b>Berdiri        </b> : ${data.founded}</p>
                          <p><b>E-mail         </b> : ${data.email}</p>
                          <p><b>Stadion        </b> : ${data.venue}</p>
                          <p><b>Telepon        </b> : ${data.phone}</p>
                          <p><b>Alamat         </b> : ${data.address}</p>
                      </div>
                      <div class="card-action">
                          <a href="${data.website}" target="_BLANK" style="border-radius: 5px;" class="waves-effect waves-light btn-small"><i class="material-icons right">navigate_next</i>Go To Website</a>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>

              <div class="container">
              <h3 class="center"> Squad Team </h3>
              <hr style="width: 250px; border-top: 3px solid #7cb342;">
               <ul style="border-radius: 20px;" class="collection">`;
                  data.squad.forEach(function(squad) {
                  detail_teamHTML += `
                      <li class="collection-item avatar">
                        <img src="../aset/user.svg" alt="icon-user" class="circle">
                        <p><b>Nama :</b> ${squad.name}</p>
                        <p><b>TTL :</b> ${squad.countryOfBirth}, ${new Date(squad.dateOfBirth).toDateString()}</p>
                        <p><b>Kebangsaan :</b> ${squad.nationality}</p>
                        <p><b>Peran :</b> ${squad.role}</p>
                        <p><b>Posisi Main :</b> ${squad.position}</p>
                        <p><b>Nomor Punggung :</b> ${squad.shirtNumber}</p>
                      </li>`;
                  });
                  detail_teamHTML+=`
              </ul>
             </div>
            `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = detail_teamHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
    });
});
}



function getJadwal() {
  if ("caches" in window) {
       caches.match(base_url + "competitions/2021/matches?status=SCHEDULED", {mode: 'no-cors'},{
        headers: {
        'X-Auth-Token': api_bola
        }
       }).then(function(response) {
        if (response) {
          response.json().then(function(data) {
             var matcheHTML = "";
               matcheHTML +=`
                 <div class="container center">
                    <h3>Jadwal ${data.competition.name}</h3>
                    <h5>Last Update : ${new Date(data.competition.lastUpdated).toDateString()}</h5>
                    <hr style="width: 250px; border-top: 3px solid #7cb342;"><br>
                 </div>
                  <table class="highlight stripped  green accent-3 responsive-table centered">
                  <thead>
                      <tr>
                        <th>Schedule</th>
                        <th>Away</th>
                        <th>Home</th>
                        <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>`;
                  data.matches.forEach(function(match) {
                  matcheHTML +=`
                    <tr>
                      <td>${new Date(match.utcDate).toDateString()}</td>
                      <td>${match.awayTeam.name}</td>
                      <td>${match.homeTeam.name}</td>
                      <td>${match.status}</td>
                    </tr>`;
                  });
                  matcheHTML +=`
                  </tbody>
                  </table>`;
            document.getElementById("jadwal_tanding").innerHTML = matcheHTML;
          });
        }
       });
     }

  fetch(base_url + "competitions/2021/matches?status=SCHEDULED",{
        headers: {
        'X-Auth-Token': api_bola
        }
      })
   .then(status)
      .then(json)
      .then(function(data) {
          var matcheHTML = "";
          matcheHTML += `
                <div class="container center">
                    <h3>Jadwal ${data.competition.name}</h3>
                    <h5>Last Update : ${new Date(data.competition.lastUpdated).toDateString()}</h5>
                    <hr style="width: 250px; border-top: 3px solid #7cb342;"><br>
                </div>
                <table class="highlight stripped  green accent-3 responsive-table centered">
                  <thead>
                      <tr>
                        <th>Schedule</th>
                        <th>Away</th>
                        <th>Home</th>
                        <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>`;
                  data.matches.forEach(function(match) {
                  matcheHTML += `
                  <tr>
                    <td>${new Date(match.utcDate).toDateString()}</td>
                    <td>${match.awayTeam.name}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.status}</td>
                  </tr>`;
                  });
                  matcheHTML +=`
                  </tbody>
                </table>
          `;
       document.getElementById("jadwal_tanding").innerHTML =matcheHTML;
    })
   .catch(error);
}



function getKlasemen() {
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/standings", { mode: 'no-cors'}, {
      headers: {
      'X-Auth-Token': api_bola
      }
    }).then(function(response) {
    if (response) {
    response.json().then(function (data) {
    // Menyusun komponen card secara dinamis
    var winner = data.standings[0];
    var klasemenHTML = "";
          klasemenHTML += `
            <div class="container center">
                <h3>Total Klasemen ${data.competition.name}</h3>
                <h5>Season : ${new Date(data.season.startDate).toDateString()} - ${new Date(data.season.endDate).toDateString()}</h5>
                <hr style="width: 250px; border-top: 3px solid #7cb342;"><br>
            </div>

            <table class="highlight stripped  green accent-3 responsive-table centered">
            <thead>
                <tr>
                  <th>Posisi</th>
                  <th>Logo</th>
                  <th>Club</th>
                  <th>PG</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Points</th>
                </tr>
            </thead>
            <tbody>`;

          winner.table.forEach(function(tabelklasemen) {
          let urlTeamImage = tabelklasemen.team.crestUrl;
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
          klasemenHTML += `
            <tr>
              <td>${tabelklasemen.position}</td>
              <td><a href="./detail_team.html?id=${tabelklasemen.team.id}" class="circle"><img src="${urlTeamImage}" width="20px" height="20px"></a></td>
              <td><a href="./detail_team.html?id=${tabelklasemen.team.id}" class="white-text">${tabelklasemen.team.name}</a></td>
              <td>${tabelklasemen.playedGames}</td>
              <td>${tabelklasemen.won}</td>
              <td>${tabelklasemen.draw}</td>
              <td>${tabelklasemen.lost}</td>
              <td>${tabelklasemen.goalsFor}</td>
              <td>${tabelklasemen.goalsAgainst}</td>
              <td>${tabelklasemen.goalDifference}</td>
              <td>${tabelklasemen.points}</td>
            </tr>`;
          });
          klasemenHTML +=`
            </tbody>
            </table>`;
          document.getElementById("klasemen").innerHTML = klasemenHTML;
    });
    }  
    });
  }

  fetch(base_url + "competitions/2021/standings", {
      headers: {
      'X-Auth-Token': api_bola
      }
    }).then(status)
    .then(json)
    .then(function(data) {
      var winner = data.standings[0];
      var klasemenHTML = "";
            klasemenHTML += `
              <div class="container center">
                <h3>Total Klasemen ${data.competition.name}</h3>
                <h5>Season : ${new Date(data.season.startDate).toDateString()} - ${new Date(data.season.endDate).toDateString()}</h5>
                <hr style="width: 250px; border-top: 3px solid #7cb342;"><br>
              </div>

              <table class="highlight stripped  green accent-3 responsive-table centered">
              <thead>
                  <tr>
                    <th>Posisi</th>
                    <th>Logo</th>
                    <th>Club</th>
                    <th>PG</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                  </tr>
              </thead>
              <tbody>`;

            winner.table.forEach(function(tabelklasemen) {
            let urlTeamImage = tabelklasemen.team.crestUrl;
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
            klasemenHTML += `
              <tr>
                <td>${tabelklasemen.position}</td>
                <td><a href="./detail_team.html?id=${tabelklasemen.team.id}" class="circle"><img src="${urlTeamImage}" width="20px" height="20px"></a></td>
                <td><a href="./detail_team.html?id=${tabelklasemen.team.id}" class="white-text">${tabelklasemen.team.name}</a></td>
                <td>${tabelklasemen.playedGames}</td>
                <td>${tabelklasemen.won}</td>
                <td>${tabelklasemen.draw}</td>
                <td>${tabelklasemen.lost}</td>
                <td>${tabelklasemen.goalsFor}</td>
                <td>${tabelklasemen.goalsAgainst}</td>
                <td>${tabelklasemen.goalDifference}</td>
                <td>${tabelklasemen.points}</td>
              </tr>`;
            });
            klasemenHTML +=`
              </tbody>
              </table>`;
        document.getElementById("klasemen").innerHTML = klasemenHTML;
    }).catch(error);
}



function getSavedTeams() {
  getAll().then(function(teams) {
  var  teamsHTML = "";
    teams.forEach(function(team) {
      let urlTeamImage = team.crestUrl;
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');                   
        teamsHTML += `
                <div class="col s12 m4">
                  <div style="border-radius: 20px;" class="card hoverable">
                  <div class="card-image">
                      <center>
                      <img class="responsive-img" src="${urlTeamImage}" style="padding:10px; width:300px; height: 300px;" />
                      </center>
                  </div>
                    <div class="card-content center">
                      <h5 style="font-weight: bold;">${team.name} (${team.tla})</h5>
                      <p>${team.shortName}</p>
                      <p>${team.website}</p>
                    </div>
                  <div style="border-radius: 20px;" class="card-action center">
                    <a href="./detail_team.html?id=${team.id}&saved=true" style="border-radius: 5px;" class="waves-effect waves-light btn-large"><i class="material-icons right">navigate_next</i>Detail Profile Team</a>
                  </div>
                 </div>
                </div>
                  `;
            });
            document.getElementById("saved").innerHTML =  teamsHTML;
          });
        }



function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");   
    getById(idParam).then(function(team) {
      let urlTeamImage = team.crestUrl;
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://'); 

        var detail_teamHTML = `
             <div class="container">
                      <div class="col s12">
                        <div style="border-radius: 20px;" class="card horizontal">
                            <div class="card-image responsive-img">
                              <img src="${urlTeamImage}" style="padding:7px;" width="250px" height="250px">
                            </div>
                          <div class="card-stacked">
                            <div class="card-content">
                                <p><b>Nama Tim       </b> : ${team.name} (${team.tla}) </p>
                                <p><b>Nama Panggilan </b> : ${team.shortName}</p>
                                <p><b>Warna          </b> : ${team.clubColors}</p>
                                <p><b>Berdiri        </b> : ${team.founded}</p>
                                <p><b>E-mail         </b> : ${team.email}</p>
                                <p><b>Stadion        </b> : ${team.venue}</p>
                                <p><b>Telepon        </b> : ${team.phone}</p>
                                <p><b>Alamat         </b> : ${team.address}</p>
                            </div>
                            <div class="card-action">
                                <a href="${team.website}" target="_BLANK" class="waves-effect waves-light btn-small"><i class="material-icons right">navigate_next</i>Go To Website</a>
                            </div>
                          </div>
                        </div>
                      </div>  
                    </div>

              <div class="container">
              <h3 class="center"> Squad Team </h3>
              <hr style="width: 250px; border-top: 3px solid #7cb342;">
               <ul style="border-radius: 20px;" class="collection">`;
                  team.squad.forEach(function(squad) {
                  detail_teamHTML += `
                      <li class="collection-item avatar">
                        <img src="../aset/user.svg" alt="icon-user" class="circle">
                        <p><b>Nama           :</b> ${squad.name}</p>
                        <p><b>TTL            :</b> ${squad.countryOfBirth}, ${new Date(squad.dateOfBirth).toDateString()}</p>
                        <p><b>Kebangsaan     :</b> ${squad.nationality}</p>
                        <p><b>Peran          :</b> ${squad.role}</p>
                        <p><b>Posisi Main    :</b> ${squad.position}</p>
                        <p><b>Nomor Punggung :</b> ${squad.shirtNumber}</p>
                      </li>`;
                  });
                  detail_teamHTML+=`
              </ul>
             </div>
            `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = detail_teamHTML;
      });
    }