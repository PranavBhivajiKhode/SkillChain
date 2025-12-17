package com.pranav_khode.payment_service.services.custom_exceptions;

public class InvalidDetailsException extends Exception {
    public InvalidDetailsException(String message) {
        super(message);
    }
}
