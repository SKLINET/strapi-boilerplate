export default () => ({
  "video-field": {
    enabled: true,
    resolve: "./src/plugins/video-field",
  },
  graphql: {
    config: {
      apolloServer: {
        introspection: true,
      },
      defaultLimit: 100,
      maxLimit: -1,
      playgroundAlways: true,
    },
  },
});
