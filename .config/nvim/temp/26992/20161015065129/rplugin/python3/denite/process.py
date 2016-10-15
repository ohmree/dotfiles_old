# ============================================================================
# FILE: process.py
# AUTHOR: Shougo Matsushita <Shougo.Matsu at gmail.com>
# License: MIT license
# ============================================================================

import subprocess


class Process(object):
    def __init__(self, commands, context, cwd):
        self.__proc = subprocess.Popen(commands,
                                       stdout=subprocess.PIPE,
                                       stderr=subprocess.PIPE,
                                       cwd=cwd)
        self.__eof = False
        self.__context = context

    def eof(self):
        return self.__eof

    def kill(self):
        if not self.__proc:
            return
        self.__proc.kill()
        self.__proc = None

    def communicate(self, timeout):
        if not self.__proc:
            return []

        outs = []
        errs = []
        try:
            outs, errs = self.__proc.communicate(timeout=timeout)
            outs = outs.decode(self.__context['encoding'],
                               errors='replace').split('\n')
            errs = errs.decode(self.__context['encoding'],
                               errors='replace').split('\n')
            self.__eof = True
        except subprocess.TimeoutExpired:
            return (outs, errs)

        self.__proc = None
        return (outs, errs)
