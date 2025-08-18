// Mock implementation of Yandex Games SDK
console.log("YaGames SDK is mocked locally");

var YaGames = {
    init: function() {
        console.log("InitYandex executed (mocked)");
        return Promise.resolve({
            // Mock adv object
            adv: {
                showFullscreenAdv: function(callbacks) {
                    console.log("Mock: showFullscreenAdv called");
                    if (callbacks && callbacks.callbacks) {
                        if (callbacks.callbacks.onOpen) callbacks.callbacks.onOpen();
                        setTimeout(() => {
                            if (callbacks.callbacks.onClose) callbacks.callbacks.onClose(true);
                        }, 300);
                    }
                    return Promise.resolve();
                },
                showRewardedVideo: function(callbacks) {
                    console.log("Mock: showRewardedVideo called");
                    if (callbacks && callbacks.callbacks) {
                        if (callbacks.callbacks.onOpen) callbacks.callbacks.onOpen();
                        setTimeout(() => {
                            if (callbacks.callbacks.onRewarded) callbacks.callbacks.onRewarded();
                            if (callbacks.callbacks.onClose) callbacks.callbacks.onClose();
                        }, 300);
                    }
                    return Promise.resolve();
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
            
            // Mock auth object
            auth: {
                openAuthDialog: function() {
                    console.log("Mock: openAuthDialog called");
                    return Promise.resolve();
                }
            },
            
            // Mock player object
            getPlayer: function(options) {
                console.log("Mock: getPlayer called", options);
                return Promise.resolve({
                    getName: function() { return "MockPlayer"; },
                    getPhoto: function() { return null; },
                    getUniqueID: function() { return "mock-player-id"; },
                    getMode: function() { return "lite"; }
                });
            },
            
            // Mock payments object
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
            
            // Mock shortcut object
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
            
            // Mock feedback object
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
            
            // Mock leaderboards object
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
            
            // Mock environment and device info
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
            
            // Mock features
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

// Export YaGames
window.YaGames = YaGames;