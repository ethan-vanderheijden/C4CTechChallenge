from quart import Blueprint, render_template

pages = Blueprint("pages", __name__)


@pages.route("/")
async def index():
    return await render_template("index.html")
