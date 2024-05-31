from quart import request, Blueprint

from partners_list.models.partners import (
    get_all_partners,
    delete_partner,
    add_partner,
    update_partner,
)

partners_api = Blueprint("partners", __name__, url_prefix="/api/partners")


@partners_api.route("/all", methods=["GET"])
async def get_partners():
    return await get_all_partners()


@partners_api.route("/add", methods=["POST"])
async def add_partners():
    data = await request.get_json()
    if not data.get("name"):
        return "Name is required", 400

    data.setdefault("logo", "")
    data.setdefault("description", "")
    data.setdefault("active", False)

    id = await add_partner(data["name"], data["logo"], data["description"], data["active"])
    return {"id": id}


@partners_api.route("/<id>", methods=["PATCH", "DELETE"])
async def manipulate_partners(id):
    if request.method == "PATCH":
        data = await request.get_json()
        if not data.get("id") or not data.get("name"):
            return "Id and name are required", 400

        data.setdefault("logo", "")
        data.setdefault("description", "")
        data.setdefault("active", False)

        await update_partner(
            data["id"], data["name"], data["logo"], data["description"], data["active"]
        )
        return {}
    elif request.method == "DELETE":
        await delete_partner(id)
        return {}
