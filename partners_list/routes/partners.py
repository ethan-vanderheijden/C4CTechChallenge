from quart import request, Blueprint

from partners_list.models.partners import get_all_partners, delete_partner

partners_api = Blueprint("partners", __name__, url_prefix="/api/partners")


@partners_api.route("/all", methods=["GET"])
async def get_partners():
    return await get_all_partners()


@partners_api.route("/<id>", methods=["POST", "DELETE"])
async def manipulate_partners(id):
    if request.method == "POST":
        return "TODO", 501
    elif request.method == "DELETE":
        await delete_partner(id)
        return ""
