// mock-yagames.js
// Mock YaGames SDK for local/school-safe testing
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
        shortcut: {
          canShowPrompt: () => Promise.resolve({ canShow: false })
        },
        feedback: {
          canReview: () => Promise.resolve({ value: false, reason: "local mock" })
        }
      });
    }
  };
}
