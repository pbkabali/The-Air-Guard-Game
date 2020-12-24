module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          { loader: "file-loader" },
          {
            loader: "image-webpack-loader",
            options: {
              // Compresses JPEG images
              mozjpeg: {
                progressive: true,
              },
              // Compresses PNG images
              optipng: {
                enabled: false,
              },
              // Compresses PNG images
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              // Compresses GIF images
              ifsicle: {
                interlaced: false,
              },
              // Compresses JPG and PNG into WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
};
