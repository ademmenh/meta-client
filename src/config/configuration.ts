export default () => ({
    environment: process.env.BUN_ENV || 'dev',
    port: parseInt(process.env.PORT || '8000', 10),

    meta: {
        appId: process.env.META_APP_ID,
        systemUserToken: process.env.META_SYSTEM_USER_TOKEN,
        graphVersion: process.env.META_GRAPH_VERSION || '24.0',
        baseUrl: `https://graph.facebook.com/v${process.env.META_GRAPH_VERSION || '24.0'}`,
    },
});
