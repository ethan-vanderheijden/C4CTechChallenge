from partners_list.models.base_db import get_db_cursor


async def get_all_partners():
    async with get_db_cursor() as cursor:
        await cursor.execute("SELECT id, name, logo, description, active FROM Partners")
        rows = await cursor.fetchall()
        formatted = [dict(row) for row in rows]
        formatted = [{**row, "active": bool(row["active"])} for row in formatted]
        return formatted


async def delete_partner(id):
    async with get_db_cursor() as cursor:
        await cursor.execute("DELETE FROM Partners where id=?", (id,))
