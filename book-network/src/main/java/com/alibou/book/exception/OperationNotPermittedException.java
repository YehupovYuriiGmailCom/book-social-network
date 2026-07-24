package com.alibou.book.exception;

public class OperationNotPermittedException extends RuntimeException {

    public OperationNotPermittedException(final String msg) {
        super(msg);
    }
}
