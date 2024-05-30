import os

from partners_list import create_app

if __name__ == "__main__":
    app = create_app()

    debug = os.getenv("QUART_DEBUG") == "true"
    if debug:
        app.run(debug=True, host="0.0.0.0", port=5000)
    else:
        app.run(host="127.0.0.1", port=5000)
