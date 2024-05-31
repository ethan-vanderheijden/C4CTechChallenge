# C4C Tech Challenge - Summer 2024

![main page showing partner organizations](https://raw.githubusercontent.com/ethan-vanderheijden/staticimages/main/C4CTechChallenge/main_page.jpg)
![edit partner organizations details](https://raw.githubusercontent.com/ethan-vanderheijden/staticimages/main/C4CTechChallenge/edit_details_page.jpg)

## Setup

1. Install python requirements

Recommendation: do this in a python virtual environment

```bash
pip install -r requirements.txt
```

2. Create the sqlite database

```bash
cd /path/to/C4CTechChallenge
bin/create_db.py
```

3. Run the server

Note: this will run the Quart server (development mode) and start Webpack (watch mode)

```bash
bin/run_dev.sh
```

The website should be visisble at [http://localhost:5000](http://localhost:5000)

## Architecture

The website uses Quart on the backend (essentially an asynchronous version of Flask) and React on the frontend.

### Backend

Normally, I use a three-layered MVC architecture, but this project is simple enough that two layers, the model and view layers, are enough. The model layer is found inside `partners_list/models/` and the view layer is under `partners_list/routes/`. `__init__.py` has a factory function that creates the Quart application and `__main__.py` runs the application with a default config.

The API itself is super simple: it has an endpoint for getting all partner organizations, and endpoints for creating, deleting, and updating partners.

### Frontend

Normally, Quart(/Flask) applications serve static HTML through the Jinja templating engine. However, SPAs built with frameworks like React are centered around Javascript files, and essentially, Javascript has replaced HTML as being entrypoint file. To work around React's fundamental incompatibility with Quart, I moved all the frontend code into `frontend/`. Webpack will process Javascript, CSS, and HTML files and output them in a format the Quart understands and can serve. Specifically, Javascript/CSS is outputted to `partners_list/static/` and generated HTML files are outputted to `partners_list/templates/`.

## Q&A

### What did I learn from this project? What challenges did I face?

I've used Flask before, but never had a chance to try out Quart or write asynchronous Python code. I must say... I am not a fan. If you want to write async Python, everything must be async, and that means throwing "await" in front of almost every line of code. Also, all your dependencies must be written in async, and while some modern libraries provide both a synchroneous and asynchronous API, that is more the exception than the rule. I had to use an async shim for the sqlite library, but the library was spawning threads as non-daemons, which meant the program remained alive after the main thread exited. In my use case, it is difficult to ensure that the database connection is always closed gracefully, so I monkey-patched the library, but hopefully, the maintainers are open to a fix.

### Any bonus features?

Organization data persists inside an sqlite database, and you can edit an individual organization's details (in addition to creating/deleting them). I added the database because you can't really call it a full-stack project if you don't have one, and editing organizations was easy to add as it reused an exiting UI.

There are also at least 3 dogs. Or maybe it was 4? I lost count.
