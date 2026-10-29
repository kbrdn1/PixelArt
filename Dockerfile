FROM oven/bun:1.4.2 AS react-build
WORKDIR /build/react
COPY ./react/package.json ./react/bun.lock /build/react/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY ./react/index.html ./react/vite.config.js /build/react/
COPY ./react/public ./public
COPY ./react/src ./src

# Build (--bun : the image ships no node, run vite on the bun runtime)
RUN bun --bun run build

# Display the build directory structure and time of build
RUN ls -lR /build/react
RUN date

FROM oven/bun:1.4.2 AS vue-build
WORKDIR /build/vue
COPY ./vue/package.json ./vue/bun.lock /build/vue/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY ./vue/index.html ./vue/vite.config.js /build/vue/
COPY ./vue/public ./public
COPY ./vue/src ./src

# Build (--bun : the image ships no node, run vite on the bun runtime)
RUN bun --bun run build

# Display the build directory structure and time of build
RUN ls -lR /build/vue
RUN date
