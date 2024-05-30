from aiosqlite.core import Connection
from queue import SimpleQueue


# By default, aiosqlite spawns threads as non-daemonic which keeps the program
# alive even after the main thread has finished.
# Ideally, you should manually close the aiosqlite connection, but letting the
# connection expire by killing the program should be safe.
# relevant: https://github.com/omnilib/aiosqlite/issues/299
def _patched_init(self, connector, iter_chunk_size):
    super(Connection, self).__init__(daemon=True)
    self._running = True
    self._connection = None
    self._connector = connector
    self._tx = SimpleQueue()
    self._iter_chunk_size = iter_chunk_size


Connection.__init__ = _patched_init


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
