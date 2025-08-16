// mock-yagames.js
// Mock YaGames for local testing / school-safe version
if (typeof YaGames === "undefined") {
  var YaGames = {
    init: function() {
      console.log("YaGames is mocked locally");
      return Promise.resolve({
        player: {
          getName: () => "LocalPlayer",
          getID: () => "local123"
        },
        payments: {
          purchase: (id) => console.log("Purchase mocked:", id)
        },
        getLeaderboard: () => ({ getPlayerPosition: () => 0 })
      });
    }
  };
}
