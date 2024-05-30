from quart import Quart

from partners_list.routes.pages import pages
from partners_list.routes.partners import partners_api


def create_app():
    app = Quart(__name__)

    app.register_blueprint(pages)
    app.register_blueprint(partners_api)

    return app
