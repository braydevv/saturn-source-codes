// Mock implementation of Yandex Games SDK for Grow a Garden game
console.log("YaGames SDK is mocked locally");

// Define global variables that the game might be looking for
window.player = null;
window.nowFullAdOpen = false;
window.promptCanShow = false;
window.reviewCanShow = false;

// Define game provider functions
window.gameProviderStart = function() {
    console.log("Mock: gameProviderStart called");
};

window.gameProviderStop = function() {
    console.log("Mock: gameProviderStop called");
};

// Define YaGames if not already defined
if (typeof YaGames === "undefined") {
    var YaGames = {
        init: function() {
            console.log("InitYandex executed (mocked)");
            return Promise.resolve({
                // Game provider methods
                gameplayStart: function() {
                    console.log("Mock: ysdk.gameplayStart called");
                    return Promise.resolve();
                },
                gameplayStop: function() {
                    console.log("Mock: ysdk.gameplayStop called");
                    return Promise.resolve();
                },
                
                // Player methods
                getPlayer: function(options) {
                    console.log("Mock: getPlayer called with options:", options);
                    window.player = {
                        getName: function() { return "MockPlayer"; },
                        getPhoto: function() { return "null"; },
                        getUniqueID: function() { return "mock-player-id"; },
                        getMode: function() { return "resolved"; },
                        setData: function(data, flush) {
                            console.log("Mock: player.setData called with data:", data, "flush:", flush);
                            return Promise.resolve();
                        },
                        getData: function(keys) {
                            console.log("Mock: player.getData called with keys:", keys);
                            return Promise.resolve({ saves: null });
                        }
                    };
                    return Promise.resolve(window.player);
                },
                
                // Advertising methods
                adv: {
                    showFullscreenAdv: function(options) {
                        console.log("Mock: showFullscreenAdv called");
                        if (options && options.callbacks) {
                            window.nowFullAdOpen = true;
                            if (options.callbacks.onOpen) options.callbacks.onOpen();
                            setTimeout(() => {
                                window.nowFullAdOpen = false;
                                if (options.callbacks.onClose) options.callbacks.onClose(true);
                            }, 300);
                        }
                    },
                    showRewardedVideo: function(options) {
                        console.log("Mock: showRewardedVideo called");
                        if (options && options.callbacks) {
                            if (options.callbacks.onOpen) options.callbacks.onOpen();
                            setTimeout(() => {
                                if (options.callbacks.onRewarded) options.callbacks.onRewarded();
                                if (options.callbacks.onClose) options.callbacks.onClose();
                            }, 300);
                        }
                    },
                    getBannerAdvStatus: function() {
                        return Promise.resolve({ stickyAdvIsShowing: false, reason: "mocked" });
                    },
                    showBannerAdv: function() {
                        console.log("Mock: showBannerAdv called");
                        return Promise.resolve();
                    },
                    hideBannerAdv: function() {
                        console.log("Mock: hideBannerAdv called");
                        return Promise.resolve();
                    }
                },
                
                // Auth methods
                auth: {
                    openAuthDialog: function() {
                        console.log("Mock: openAuthDialog called");
                        return Promise.resolve();
                    }
                },
                
                // Payments methods
                getPayments: function() {
                    console.log("Mock: getPayments called");
                    return Promise.resolve({
                        purchase: function(id) {
                            console.log("Mock: purchase called with id:", id);
                            return Promise.resolve({ productID: id });
                        },
                        getCatalog: function() {
                            console.log("Mock: getCatalog called");
                            return Promise.resolve([
                                {
                                    id: "mock_item_1",
                                    title: "Mock Item 1",
                                    description: "This is a mock item",
                                    imageURI: "",
                                    priceValue: "100"
                                }
                            ]);
                        },
                        getPurchases: function() {
                            console.log("Mock: getPurchases called");
                            return Promise.resolve([]);
                        },
                        consumePurchase: function(token) {
                            console.log("Mock: consumePurchase called with token:", token);
                            return Promise.resolve();
                        }
                    });
                },
                
                // Shortcut methods
                shortcut: {
                    canShowPrompt: function() {
                        console.log("Mock: canShowPrompt called");
                        return Promise.resolve({ canShow: true });
                    },
                    showPrompt: function() {
                        console.log("Mock: showPrompt called");
                        return Promise.resolve({ outcome: 'accepted' });
                    }
                },
                
                // Feedback methods
                feedback: {
                    canReview: function() {
                        console.log("Mock: canReview called");
                        return Promise.resolve({ value: true, reason: null });
                    },
                    requestReview: function() {
                        console.log("Mock: requestReview called");
                        return Promise.resolve({ feedbackSent: true });
                    }
                },
                
                // Leaderboard methods
                getLeaderboards: function() {
                    console.log("Mock: getLeaderboards called");
                    return Promise.resolve({
                        setLeaderboardScore: function(name, score) {
                            console.log("Mock: setLeaderboardScore called with name:", name, "score:", score);
                            return Promise.resolve();
                        },
                        getLeaderboardEntries: function(name, options) {
                            console.log("Mock: getLeaderboardEntries called with name:", name, "options:", options);
                            return Promise.resolve({
                                entries: []
                            });
                        }
                    });
                },
                
                // Environment and device info
                environment: {
                    i18n: {
                        lang: "en",
                        tld: "com"
                    },
                    browser: {
                        lang: "en"
                    },
                    app: {
                        id: "mock-app-id"
                    },
                    payload: {}
                },
                deviceInfo: {
                    type: "desktop",
                    isMobile: function() { return false; },
                    isDesktop: function() { return true; },
                    isTablet: function() { return false; },
                    isTV: function() { return false; }
                },
                
                // Features
                features: {
                    LoadingAPI: {
                        ready: function() {
                            console.log("Mock: LoadingAPI.ready called");
                        }
                    }
                }
            });
        }
    };
}

// Mock the functions that the game is trying to call
window.InterAdvShow = function() {
    console.log("Mock: InterAdvShow called");
};

window.RequestingEnvironmentData = function() {
    console.log("Mock: RequestingEnvironmentData called");
    return Promise.resolve();
};

window.InitPlayer = function() {
    console.log("Mock: InitPlayer called");
    return Promise.resolve();
};

window.TVInit = function() {
    console.log("Mock: TVInit called");
};

window.LoadCloud = function() {
    console.log("Mock: LoadCloud called");
    return Promise.resolve("no data");
};

window.InitReview = function() {
    console.log("Mock: InitReview called");
    return Promise.resolve();
};

window.GetStats = function() {
    console.log("Mock: GetStats called");
    return Promise.resolve();
};

window.InitPayments = function() {
    console.log("Mock: InitPayments called");
    return Promise.resolve();
};

window.GetAllGames = function() {
    console.log("Mock: GetAllGames called");
    return Promise.resolve();
};

window.InitLeaderboards = function() {
    console.log("Mock: InitLeaderboards called");
    return Promise.resolve();
};

window.InitGameLabel = function() {
    console.log("Mock: InitGameLabel called");
    return Promise.resolve();
};

window.GetFlags = function() {
    console.log("Mock: GetFlags called");
    return Promise.resolve();
};