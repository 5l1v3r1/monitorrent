from __future__ import unicode_literals
import threading


def timer(interval, timer_func, *args, **kwargs):
    stopped = threading.Event()

    def loop_fn():
        while not stopped.wait(interval):
            timer_func(*args, **kwargs)

    thread = threading.Thread(target=loop_fn, name="timer")
    thread.daemon = True
    thread.start()

    return stopped.set
