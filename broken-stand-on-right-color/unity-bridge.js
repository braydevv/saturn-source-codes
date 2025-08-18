// Unity Bridge for Yandex Games SDK
// This script provides a bridge between Unity WebGL and the Yandex Games SDK

console.log("Unity Bridge for Yandex Games SDK loaded");

// Store references to Unity instance and SDK
let unityInstance = null;
let sdkInstance = null;

// Define global functions that Unity will call
window.gameProviderStart = function() {
    console.log("Unity called gameProviderStart");
    if (sdkInstance && typeof sdkInstance.gameplayStart === 'function') {
        sdkInstance.gameplayStart().catch(err => {
            console.error("Error in gameplayStart:", err);
        });
    }
};

window.gameProviderStop = function() {
    console.log("Unity called gameProviderStop");
    if (sdkInstance && typeof sdkInstance.gameplayStop === 'function') {
        sdkInstance.gameplayStop().catch(err => {
            console.error("Error in gameplayStop:", err);
        });
    }
};

// Initialize the bridge
function initUnityBridge(unity) {
    console.log("Initializing Unity Bridge");
    unityInstance = unity;
    
    // If we already have the SDK, send initialization to Unity
    if (sdkInstance) {
        sendSDKInitializationToUnity();
    }
}

// Set the SDK instance
function setSDKInstance(sdk) {
    console.log("Setting SDK instance");
    sdkInstance = sdk;
    
    // If we already have Unity, send initialization
    if (unityInstance) {
        sendSDKInitializationToUnity();
    }
}

// Send SDK initialization to Unity
function sendSDKInitializationToUnity() {
    if (!unityInstance) {
        console.warn("Unity instance not available yet");
        return;
    }
    
    try {
        // Create a mock player if needed
        if (!sdkInstance || !sdkInstance.getPlayer) {
            console.log("Using mock player data");
            const authJson = {
                "playerAuth": "resolved",
                "playerName": "LocalPlayer",
                "playerId": "local-player-id",
                "playerPhoto": "null"
            };
            
            unityInstance.SendMessage('YandexGame', 'SetInitializationSDK', JSON.stringify(authJson));
        } else {
            // Try to get real player data
            sdkInstance.getPlayer().then(player => {
                const playerName = player.getName ? player.getName() : "Player";
                const playerId = player.getUniqueID ? player.getUniqueID() : "local-id";
                const playerPhoto = player.getPhoto ? player.getPhoto("medium") : "null";
                
                const authJson = {
                    "playerAuth": "resolved",
                    "playerName": playerName,
                    "playerId": playerId,
                    "playerPhoto": playerPhoto
                };
                
                unityInstance.SendMessage('YandexGame', 'SetInitializationSDK', JSON.stringify(authJson));
            }).catch(err => {
                console.error("Error getting player:", err);
                // Fall back to mock data
                const authJson = {
                    "playerAuth": "rejected",
                    "playerName": "anonymous",
                    "playerId": "anonymous",
                    "playerPhoto": "null"
                };
                
                unityInstance.SendMessage('YandexGame', 'SetInitializationSDK', JSON.stringify(authJson));
            });
        }
    } catch (e) {
        console.error("Error in sendSDKInitializationToUnity:", e);
    }
}

// Export the bridge functions
window.UnityBridge = {
    init: initUnityBridge,
    setSDK: setSDKInstance
};