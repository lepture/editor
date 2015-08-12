
module.exports = {
  entry: [
    "./app.js",
    "./lib/editor.css",
  ],

  output: {
    path: __dirname + "/build/",
    filename: "build.js",
    publicPath: "/build/",
  },

  devtool: "#source-map"
};
