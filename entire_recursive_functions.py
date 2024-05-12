def newFunction45(n):
    if n <= 1:
        return 1
    else:
        return n * newFunction45(n - 1)


