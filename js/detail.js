// REGISTER SERVICE WORKER
  if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(function() {
              console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function() {
              console.log("Pendaftaran ServiceWorker gagal");
            });
        });
      } else {
        console.log("ServiceWorker belum didukung browser ini.");
      }



      document.addEventListener("DOMContentLoaded", function() {
            var urlParams = new URLSearchParams(window.location.search);
            var isFromSaved = urlParams.get("saved");
            var save = document.getElementById("save");
            var isSaved = false;
            var idParam = urlParams.get("id");
            checkFavorite(idParam);
            var btnDelete = document.getElementById("delete");

            if (isFromSaved) {   
                if (isSaved) {
                  console.log("False isSaved");
                  item.then(function(team) {
                  // Menghapus Team Apabila icon turned_in nya ditekan dan mengubahnya menjadi turned_in_not
                    deleteTeam(team.id);
                          document.getElementById("btnAdd").innerHTML = "turned_in_not";
                          M.toast({
                            html: 'Terhapus didalam Saved!'
                          });
                        });
                        isSaved = false;
                    } else {
                      console.log("True isSaved");
                      document.getElementById("btnAdd").innerHTML = "delete";
                      isSaved = true;
                    }
                  // Hide fab jika dimuat dari indexed db
                  // save.style.display = 'none';
                  // ambil artikel lalu tampilkan
                  getSavedTeamById();
                } else {
                  if(save.innerText =="turned_in_not" ){
                    isSaved = false;
                  }
                  else{
                    isSaved = true;
                    console.log(save.innerText);
                  }
                  var item = getTeamById();
                }

                save.onclick = function () {
                    console.log("Tombol FAB di klik.");
                    var item = getTeamById();
                    if (isSaved) {
                      console.log("False isSaved");
                      item.then(function(team) {
                        // Menghapus Team Apabila iconnya turned_in_not
                        deleteTeam(team.id);
                        document.getElementById("btnAdd").innerHTML = "turned_in_not";
                        M.toast({
                          html: 'Terhapus didalam Saved!'
                        });
                      });
                      isSaved = false;
                    } else {
                      console.log("True isSaved");
                      item.then(function(team) {
                        // Menambah Team Apabila iconnya delete
                        saveForLater(team);
                        document.getElementById("btnAdd").innerHTML = "delete";
                        M.toast({
                            html: 'Berhasil Tersimpan kedalam Saved!'
                        });
                        console.log(team);
                      });
                      isSaved = true;
                    }
                };
              });

