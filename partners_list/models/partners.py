from partners_list.models.base_db import get_db_cursor


async def get_all_partners():
    async with get_db_cursor() as cursor:
        await cursor.execute("SELECT id, name, logo, description, active FROM partners")
        rows = await cursor.fetchall()
        return [dict(row) for row in rows]
