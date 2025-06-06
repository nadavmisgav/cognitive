import asyncio
import sys
import time
from collections.abc import Callable
from concurrent.futures import Future, ThreadPoolExecutor
from threading import Thread
from time import sleep

# from concurrent.futures import Future

# def read_message(future_result: Future[str]):
#     message = "df"
#     future_result.set_result(message)

# def main():
#     future_result = Future[str]()
#     read_message(future_result)
#     result = future_result.result() # blocks and waits for result
#     print(result)
# if __name__ == "__main__":
#     main()

# concept of a future for callbacks and not blocking the main thread
# f = Future[str]()


# def do_work_in_thread():
#     sleep(2)
#     f.set_result("Done from thread!")

# async def main():
#     Thread(target=do_work_in_thread).start()
#     print("Waiting for result...")
#     a_f = asyncio.wrap_future(f)
#     result = await a_f
#     print("Result:", result)

# if __name__ == "__main__":
#     asyncio.run(main())

# f = Future[str]()


# def do_work_in_thread(f: Future[str]):
#     sleep(2)
#     f.set_result("Done from thread!")

# def main():
#     f1 = Future[str]()
#     f2 = Future[str]()
#     Thread(target=do_work_in_thread, args=(f1,)).start()
#     Thread(target=do_work_in_thread, args=(f2,)).start()
#     print("Waiting for results...")
#     result1 = f1.result()  # This will block until the thread completes
#     result2 = f2.result()  # This will block until the thread completes
#     print("Results:", result1, result2)

#####################

# thread pool executor example helper to create futures and await them
# why we need two threads, how can do we do it with one with asyncio

# import time
# from concurrent.futures import Future, ThreadPoolExecutor


# def do_work_in_thread() -> str:
#     time.sleep(2)
#     return "Done from thread!"

# with ThreadPoolExecutor(max_workers=2) as executor:
#     start = time.perf_counter()
#     future: Future[str] = executor.submit(do_work_in_thread)
#     future2: Future[str] = executor.submit(do_work_in_thread)

#     print("Waiting for result...")
#     result = future.result()  # This will block until the thread completes
#     result2 = future2.result()  # This will block until the thread completes
#     print(result, result2)
#     print(f"Elapsed time: {time.perf_counter() - start:.2f} seconds")

#####################

# asyncio example to run them in paralel using asyncio.gather

# async def do_work_in_thread() -> str:
#     await asyncio.sleep(2)
#     return "Done from thread!"

# async def main():
#     start = time.perf_counter()
#     print("Waiting for result...")
#     result1, result2 = await asyncio.gather(
#         do_work_in_thread(),
#         do_work_in_thread()
#     )
#     print("Result:", result1, result2)
#     print(f"Elapsed time: {time.perf_counter() - start:.2f} seconds")

# if __name__ == "__main__":
    # asyncio.run(main())


#####################

# dimistifying the asyncio.run() and asyncio.gather functions how can we do it ourselves
# under the hood it creates a task from our coroutine, adds a callback to when its finished
# then calls run_forever where the callbacks ends the forever loop
# asyncio.run() is a convenience function that creates an event loop, runs the coroutine, and closes the loop when done and handles
# exceptions and edge cases

# async def do_work_in_thread() -> str:
#     await asyncio.sleep(2)
#     return "Done from thread!"

# start = time.perf_counter()
# loop = asyncio.get_event_loop()
# result = loop.run_until_complete(do_work_in_thread())
# print("Result:", result)
# print(f"Elapsed time: {time.perf_counter() - start:.2f} seconds")

#######################

# how to do two tasks like asyncio.gather() does use a future that is set when both tasks are done
# add callbacks to each task to count how many are finished
# gather handles exceptions and edge_cases, we will not handle them here

# async def do_work_in_thread() -> str:
#     await asyncio.sleep(2)
#     return "Done from thread!"

# start = time.perf_counter()
# loop = asyncio.get_event_loop()
# task1 = loop.create_task(do_work_in_thread())
# task2 = loop.create_task(do_work_in_thread())
# nfinished_futures = 0
# g_fut = asyncio.Future()
# def callback(future):
#     global nfinished_futures
#     nfinished_futures += 1
#     print(f"Task finished: {future.result()} (Total finished: {nfinished_futures})")
#     if nfinished_futures == 2:
#         g_fut.set_result("All tasks completed")
# # Add the callback to each task
# task1.add_done_callback(callback)
# task2.add_done_callback(callback)

# resut = loop.run_until_complete(g_fut)
# print("Result:", resut)
# print(f"Elapsed time: {time.perf_counter() - start:.2f} seconds")


###############

# testing forever loop and how to stop it


# def wait_and_print(seconds: float):
#     print(f"Waited {seconds} seconds")

# # async def wait_and_print_async(seconds: float):
    # await asyncio.sleep(seconds)
# #     print(f"Waited {seconds} seconds (async)")

# def handle_input():
#     print("Got bytes from stdin")
#     line = sys.stdin.readline()
#     if not line:
#         return
#     try:
#         seconds = float(line.strip())
#         loop.call_later(seconds, wait_and_print, seconds)
#         # task = loop.create_task(wait_and_print_async(seconds))

#     except ValueError:
#         print("Please enter a valid number.")

# loop = asyncio.new_event_loop()
# loop.add_reader(sys.stdin, handle_input)
# loop.run_forever()


###################

# stopping the event loop with a callback
# import asyncio

# def hello_world(loop):
#     """A callback to print 'Hello World' and stop the event loop"""
#     print('Hello World')
#     loop.stop()

# loop = asyncio.new_event_loop()

# # Schedule a call to hello_world()
# loop.call_soon(hello_world, loop)

# # Blocking call interrupted by loop.stop()
# try:
#     loop.run_forever()
# finally:
#     loop.close()


######

# selector based polling example

# import selectors
# import socket

# sel = selectors.DefaultSelector()

# def accept(sock, mask):
#     conn, addr = sock.accept()  # Should be ready
#     print('accepted', conn, 'from', addr)
#     conn.setblocking(False)
#     sel.register(conn, selectors.EVENT_READ, read)

# def read(conn, mask):
#     data = conn.recv(1000)  # Should be ready
#     if data:
#         print('echoing', repr(data), 'to', conn)
#         conn.send(data)  # Hope it won't block
#     else:
#         print('closing', conn)
#         sel.unregister(conn)
#         conn.close()

# sock = socket.socket()
# sock.bind(('localhost', 1234))
# sock.listen(100)
# sock.setblocking(False)
# sel.register(sock, selectors.EVENT_READ, accept)

# while True:
#     events = sel.select()
#     for key, mask in events:
#         callback = key.data
#         callback(key.fileobj, mask)

# def read_message(on_message: Callable[[str], None]):
