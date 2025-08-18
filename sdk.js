// sdk.js dummy - mocks Yandex SDK for local file:// use
var YaGames = {
    init: function() {
        console.log("YaGames SDK is mocked locally");
        return {
            then: function(callback) {
                const ysdk = {
                    player: {
                        getName: () => "LocalPlayer",
                        getID: () => "local123"
                    },
                    payments: {
                        purchase: (id) => console.log("Purchase mocked:", id)
                    },
                    shortcut: {
                        canShowPrompt: () => ({ canShow: false })
                    },
                    feedback: {
                        canReview: () => ({ value: false, reason: "local mock" })
                    }
                };
                callback(ysdk);
                return { catch: () => {} }; // dummy catch
            }
        };
    }
};

// Optional: expose global function if your game calls InitYandex()
function InitYandex() {
    YaGames.init().then(ysdk => {
        console.log("InitYandex executed (mocked)");
        window.ysdk = ysdk;
        // Initialize whatever game functions you need
        if (typeof FullAdShow === "function") FullAdShow();
        if (typeof InitPlayer === "function") InitPlayer(0, []);
    });
}

// Immediately call InitYandex to mimic original behavior
InitYandex();
