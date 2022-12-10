FROM golang:1.19.3 AS build

WORKDIR /backend

COPY ./backend/customer/ ./customer
COPY ./backend/initializers/ ./initializers
COPY ./backend/models/ ./models
COPY ./backend/.env/ ./
COPY ./backend/go.mod/ ./
COPY ./backend/go.sum/ ./
COPY ./backend/main.go ./

RUN go mod download

RUN go build -o /server

FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /server /server
COPY ./backend/.env/ ./


EXPOSE 8000

USER nonroot:nonroot

ENTRYPOINT [ "/server" ]