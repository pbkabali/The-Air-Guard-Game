module.exports = {
  setupFiles: ["./config/__mocks__/dom.js"],
  moduleNameMapper: {
    ".+\\.(wav|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
};
