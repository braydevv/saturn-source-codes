console.log("YaGames SDK is mocked locally");

// Mock Yandex SDK
var YaGames = {
    init: function() {
        console.log("InitYandex executed (mocked)");
        return Promise.resolve({
            // Advertising methods
            adv: {
                showFullscreenAdv: function(options) {
                    console.log("Mock showFullscreenAdv called");
                    if (options && options.callbacks) {
                        if (options.callbacks.onOpen) {
                            options.callbacks.onOpen();
                        }
                        
                        // Simulate ad closing after a short delay
                        setTimeout(() => {
                            if (options.callbacks.onClose) {
                                options.callbacks.onClose(true);
                            }
                        }, 500);
                    }
                    return Promise.resolve();
                },
                showRewardedVideo: function(options) {
                    console.log("Mock showRewardedVideo called");
                    if (options && options.callbacks) {
                        if (options.callbacks.onOpen) {
                            options.callbacks.onOpen();
                        }
                        
                        // Simulate reward after a short delay
                        setTimeout(() => {
                            if (options.callbacks.onRewarded) {
                                options.callbacks.onRewarded();
                            }
                            if (options.callbacks.onClose) {
                                options.callbacks.onClose();
                            }
                        }, 500);
                    }
                    return Promise.resolve();
                }
            },
            
            // Player methods
            getPlayer: function() {
                console.log("Mock getPlayer called");
                return Promise.resolve({
                    getName: function() { return "MockPlayer"; },
                    getPhoto: function() { return null; },
                    getUniqueID: function() { return "mock-player-id"; },
                    getData: function() { return Promise.resolve({}); },
                    setData: function() { return Promise.resolve(); }
                });
            },
            
            // Leaderboard methods
            getLeaderboards: function() {
                console.log("Mock getLeaderboards called");
                return Promise.resolve({
                    getLeaderboardEntries: function() {
                        return Promise.resolve({
                            entries: []
                        });
                    },
                    setLeaderboardScore: function(leaderboardName, score) {
                        console.log("Mock setLeaderboardScore called for", leaderboardName, "with score", score);
                        return Promise.resolve();
                    }
                });
            },
            
            // Feedback methods
            feedback: {
                canReview: function() {
                    return Promise.resolve({ value: true });
                },
                requestReview: function() {
                    return Promise.resolve({ feedbackSent: true });
                }
            },
            
            // Device info
            deviceInfo: {
                type: "desktop",
                isMobile: function() { return false; },
                isDesktop: function() { return true; },
                isTablet: function() { return false; },
                isTV: function() { return false; }
            }
        });
    }
};