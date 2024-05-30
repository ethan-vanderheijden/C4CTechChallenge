import aiosqlite
from contextlib import asynccontextmanager

_db_conn = None


@asynccontextmanager
async def get_db_cursor():
    """
    Get a cursor to the sqlite database. Cursor is automatically closed.
    """
    global _db_conn
    if _db_conn is None:
        _db_conn = await aiosqlite.connect("database/partners_list.db", isolation_level=None)
        _db_conn.row_factory = aiosqlite.Row

    cursor = await _db_conn.cursor()
    try:
        yield cursor
    finally:
        await cursor.close()
