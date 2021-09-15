import { createClient } from "contentful";

export default (function () {
  let client;

  return {
    getClient: () => {
      if (!client) {
        client = createClient({
          space: process.env.CONTENTFUL_SPACE_ID,
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        });
      }

      return client;
    },
  };
})();
