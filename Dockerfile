FROM node:16-alpine

ENV MONGO_URL=mongodb+srv://adminmongo:adminmongo@shop.qajzb.mongodb.net/shop?retryWrites=true&w=majority
ENV PORT=8888
ENV PASS_SECRET=thaibinhdeptrai
ENV JWT_SECRET=thaibinhdeptrai
ENV STRIPE_KEY=sk_test_51JpGapE1ZkTAxgOTplpJkqYOiLKpDF4ju8Sgq7GvZuDamzpEYDclqGfhdkZFysywmX4EZ5An08me65nlEZgrCgkk00OQOl0n8l
ENV CLOUDINARY_CLOUD_NAME=dcj2pwpxy
ENV CLOUDINARY_API_KEY=977742739239461
ENV CLOUDINARY_API_SECRET=xa2mN-06IZgfo5kvDFHZlT5rC9k
ENV CLOUDINARY_URL=cloudinary://977742739239461:xa2mN-06IZgfo5kvDFHZlT5rC9k@dcj2pwpxy
ENV NETLIFY_BLURHASH_URI=https://elegant-griffin-5fd0c1.netlify.app/.netlify/functions/blurhash

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5001
ENTRYPOINT ["npm", "start"]