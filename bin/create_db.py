#!/usr/bin/env python3

import asyncio
import aiosqlite


async def create_db():
    db = await aiosqlite.connect("../database/partners_list.db")
    cursor = await db.cursor()

    with open("../database/schema.sql") as f:
        await cursor.executescript(f.read())

    insert_dummy = input("Would you like to insert dummy data? (y/n): ") == "y"
    if insert_dummy:
        with open("../database/dummy_data.sql") as f:
            await cursor.executescript(f.read())

    await cursor.close()
    await db.commit()
    await db.close()


if __name__ == "__main__":
    asyncio.run(create_db())
