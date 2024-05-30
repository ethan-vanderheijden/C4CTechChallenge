from quart import Blueprint

from partners_list.models.partners import get_all_partners

partners_api = Blueprint("partners", __name__, url_prefix="/api/partners")


@partners_api.route("/all", methods=["GET"])
async def get_partners():
    return await get_all_partners()
