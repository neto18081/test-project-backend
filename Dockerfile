FROM golang:1.19.3 AS build

WORKDIR /app

COPY controllers/ ./controllers
COPY initializers/ ./initializers
COPY models/ ./models
COPY .env/ ./
COPY go.mod/ ./
COPY go.sum/ ./
COPY main.go/ ./

RUN go mod download

RUN go build -o /server

FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /server /server
COPY .env/ ./

EXPOSE 3000

USER nonroot:nonroot

ENTRYPOINT [ "/server" ]