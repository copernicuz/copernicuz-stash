// Override the global fetch function
const originalFetch = window.fetch;

window.fetch = async (...args) => {
    if (args[0].toString().endsWith('/graphql')) {
        const requestBody = await args[1]?.body?.toString();
        if (requestBody?.includes('SceneMarkerCreate')) {
            console.log('autoGenerateMarkers: Intercepted GraphQL request with "SceneMarkerCreate" operation:', args);

            const sceneID = JSON.parse(requestBody).variables.scene_id;

            fetch("/graphql", {
                "headers": {
                    "content-type": "application/json",
                },
                "body": `{\"operationName\":\"MetadataGenerate\",\"variables\":{\"input\":{\"covers\":false,\"sprites\":false,\"previews\":false,\"imagePreviews\":true,\"previewOptions\":{\"previewSegments\":12,\"previewSegmentDuration\":0.75,\"previewExcludeStart\":\"5%\",\"previewExcludeEnd\":\"5%\",\"previewPreset\":\"slow\"},\"markers\":true,\"markerImagePreviews\":true,\"markerScreenshots\":true,\"transcodes\":false,\"phashes\":false,\"interactiveHeatmapsSpeeds\":false,\"clipPreviews\":false,\"imageThumbnails\":false,\"sceneIDs\":[\"${sceneID}\"]}},\"query\":\"mutation MetadataGenerate($input: GenerateMetadataInput!) {\\n  metadataGenerate(input: $input)\\n}\"}`,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            });
        }
    }

    // Call the original fetch function
    return originalFetch(...args);
};
