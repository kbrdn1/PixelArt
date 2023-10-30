FROM node:20.9.0 AS react-build
WORKDIR /build/react
COPY ./react/index.html /build/react/
COPY ./react/package.json /build/react/
COPY ./react/.eslintrc.cjs /build/react/

# Install dependencies
RUN npm install

# Copy source code
COPY ./react/public ./public
COPY ./react/src ./src

# Build
RUN npm run build

# Display the build directory structure and time of build
RUN ls -lR /build/react
RUN date

FROM node:20.9.0 AS vue-build
WORKDIR /build/vue
COPY ./vue/index.html /build/vue/
COPY ./vue/package.json /build/vue/

# Install dependencies
RUN npm install

# Copy source code
COPY ./vue/public ./public
COPY ./vue/src ./src

# Build
RUN npm run build

# Display the build directory structure and time of build
RUN ls -lR /build/vue
RUN date