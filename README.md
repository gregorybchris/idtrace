<div align="center">
  <h1>idtrace</h1>

  <p>
    <strong>Trace the origin of unique identifiers</strong>
  </p>

  <hr />
</div>

## About

idtrace is a microservice used to track the origin of unique IDs. For example, if you wanted to implement a "share" button in your social media app, you'd probably generate a link containing the unique ID of a post. With idtrace, you can generate a new link based on the post ID and the ID of the user generating the shareable link. When someone opens a shareable link, idtrace can query its database to determine both the original post ID and the sender of the link.

## Installation

Install using [Poetry](https://python-poetry.org/)

```bash
poetry install
```

## Local development

```bash
fastapi dev idtrace/app/app.py
```

## API reference

Open [http://0.0.0.0:8000/docs](http://0.0.0.0:8000/docs) after starting up the dev server.

## Frontend example

```bash
cd example
pnpm dev
```
