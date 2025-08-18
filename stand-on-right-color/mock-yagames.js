// Mock implementation of Yandex Games SDK for Stand on the Right Color game
console.log("YaGames SDK is mocked locally");

// Define game provider functions
window.gameProviderStart = function() {
    console.log("Mock: gameProviderStart called");
};

// Define YaGames if not already defined
if (typeof YaGames === "undefined") {
    var YaGames = {
        init: function() {
            console.log("InitYandex executed (mocked)");
            return {
                then: function(callback) {
                    // Create a mock ysdk object with all required methods
                    const ysdk = {
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
                            return Promise.resolve({
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
                            });
                        },
                        
                        // Advertising methods
                        adv: {
                            showFullscreenAdv: function(options) {
                                console.log("Mock: showFullscreenAdv called");
                                if (options && options.callbacks) {
                                    if (options.callbacks.onOpen) options.callbacks.onOpen();
                                    setTimeout(() => {
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
                    };
                    
                    // Call the callback with our mock ysdk
                    callback(ysdk);
                    
                    // Return a mock promise
                    return { 
                        catch: function(callback) {
                            // We don't call the catch callback since our mock always succeeds
                            return this;
                        }
                    };
                }
            };
        }
    };
}

// Export YaGames to the window
window.YaGames = YaGames;