// Mock Yandex SDK for multiplayer games
console.log("Yandex SDK mock loaded");

// Define YaGames if not already defined
var YaGames = {
  init: function() {
    console.log("YaGames.init() called");
    return Promise.resolve({
      // Game provider methods
      gameplayStart: function() {
        console.log("ysdk.gameplayStart called");
        return Promise.resolve();
      },
      gameplayStop: function() {
        console.log("ysdk.gameplayStop called");
        return Promise.resolve();
      },
      
      // Player methods
      getPlayer: function(options) {
        console.log("ysdk.getPlayer called with options:", options);
        return Promise.resolve({
          getName: function() { return "Player"; },
          getPhoto: function() { return null; },
          getUniqueID: function() { return "local-player"; },
          getMode: function() { return "resolved"; },
          setData: function(data, flush) {
            console.log("player.setData called with data:", data, "flush:", flush);
            return Promise.resolve();
          },
          getData: function(keys) {
            console.log("player.getData called with keys:", keys);
            return Promise.resolve({ saves: null });
          }
        });
      },
      
      // Advertising methods
      adv: {
        showFullscreenAdv: function(options) {
          console.log("ysdk.adv.showFullscreenAdv called");
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
          console.log("ysdk.adv.showRewardedVideo called");
          if (options && options.callbacks) {
            if (options.callbacks.onOpen) options.callbacks.onOpen();
            setTimeout(() => {
              if (options.callbacks.onRewarded) options.callbacks.onRewarded();
              if (options.callbacks.onClose) options.callbacks.onClose();
            }, 300);
          }
        },
        getBannerAdvStatus: function() {
          return Promise.resolve({ stickyAdvIsShowing: false });
        },
        showBannerAdv: function() {
          console.log("ysdk.adv.showBannerAdv called");
          return Promise.resolve();
        },
        hideBannerAdv: function() {
          console.log("ysdk.adv.hideBannerAdv called");
          return Promise.resolve();
        }
      },
      
      // Leaderboard methods
      getLeaderboards: function() {
        console.log("ysdk.getLeaderboards called");
        return Promise.resolve({
          getLeaderboardDescription: function(name) {
            return Promise.resolve({
              default: true,
              description: {
                invert_sort_order: false,
                score_format: {
                  options: {
                    decimal_offset: 0
                  }
                },
                type: "numeric"
              }
            });
          },
          setLeaderboardScore: function(name, score) {
            console.log("ysdk.leaderboards.setLeaderboardScore called with name:", name, "score:", score);
            return Promise.resolve();
          },
          getLeaderboardEntries: function(name, options) {
            console.log("ysdk.leaderboards.getLeaderboardEntries called with name:", name, "options:", options);
            return Promise.resolve({
              entries: []
            });
          }
        });
      },
      
      // Payments methods
      getPayments: function() {
        console.log("ysdk.getPayments called");
        return Promise.resolve({
          getCatalog: function() {
            return Promise.resolve([]);
          },
          getPurchases: function() {
            return Promise.resolve([]);
          },
          purchase: function(id) {
            console.log("ysdk.payments.purchase called with id:", id);
            return Promise.resolve({ productID: id });
          },
          consumePurchase: function(token) {
            console.log("ysdk.payments.consumePurchase called with token:", token);
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
      
      // Shortcut methods
      shortcut: {
        canShowPrompt: function() {
          return Promise.resolve({ canShow: true });
        },
        showPrompt: function() {
          return Promise.resolve({ outcome: 'accepted' });
        }
      },
      
      // Auth methods
      auth: {
        openAuthDialog: function() {
          return Promise.resolve();
        }
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
            console.log("ysdk.features.LoadingAPI.ready called");
          }
        }
      }
    });
  }
};