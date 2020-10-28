let dbPromised = idb.open("bolaku", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
      let teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
        });
          teamsObjectStore.createIndex("name", "name", { unique: false });
      }
  });

  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Team berhasil di simpan dalam database.");
      });
  }


  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }



  function getById(id) {
    let getId = parseInt(id);
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.get(getId);
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }


function checkFavorite(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.get(id);
        }).then(function (favorite) {
            if(favorite !== undefined){
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}


function deleteTeam(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            store.delete(id);
            return tx.complete;
        }).then(function () {
            console.log("id", id, "Berhasil Terhapus dalam database!");
        })
    })
}


