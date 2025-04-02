package com.pitchperfect.service;

import com.pitchperfect.exception.PaymentProcessingException;

public class PaymentService {
    // In a real application, this would integrate with a payment gateway
    // like Stripe, Razorpay, or PayPal

    public boolean processPayment(double amount, String cardNumber, String expiryDate, String cvv) {
        try {
            // Validate card details
            validateCardDetails(cardNumber, expiryDate, cvv);

            // Simulate payment processing
            Thread.sleep(1000); // Simulate network delay

            // In a real application, this would make an API call to the payment gateway
            // For demo purposes, we'll just return true if the card number is valid
            return isValidCardNumber(cardNumber);
        } catch (Exception e) {
            throw new PaymentProcessingException("Payment processing failed: " + e.getMessage());
        }
    }

    private void validateCardDetails(String cardNumber, String expiryDate, String cvv) {
        // Remove spaces from card number
        cardNumber = cardNumber.replaceAll("\\s", "");

        // Basic validation
        if (cardNumber.length() < 13 || cardNumber.length() > 19) {
            throw new PaymentProcessingException("Invalid card number length");
        }

        if (!cardNumber.matches("\\d+")) {
            throw new PaymentProcessingException("Card number must contain only digits");
        }

        if (!expiryDate.matches("\\d{2}/\\d{2}")) {
            throw new PaymentProcessingException("Invalid expiry date format");
        }

        if (!cvv.matches("\\d{3,4}")) {
            throw new PaymentProcessingException("Invalid CVV format");
        }

        // Validate expiry date
        String[] parts = expiryDate.split("/");
        int month = Integer.parseInt(parts[0]);
        int year = Integer.parseInt(parts[1]);

        if (month < 1 || month > 12) {
            throw new PaymentProcessingException("Invalid month");
        }

        // Add more validation as needed
    }

    private boolean isValidCardNumber(String cardNumber) {
        // Luhn algorithm for card number validation
        int sum = 0;
        boolean alternate = false;

        // Remove spaces
        cardNumber = cardNumber.replaceAll("\\s", "");

        // Loop from right to left
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            int n = Integer.parseInt(cardNumber.substring(i, i + 1));
            if (alternate) {
                n *= 2;
                if (n > 9) {
                    n = (n % 10) + 1;
                }
            }
            sum += n;
            alternate = !alternate;
        }

        return (sum % 10 == 0);
    }

    public void refundPayment(String transactionId) {
        // In a real application, this would integrate with the payment gateway's refund API
        try {
            // Simulate refund processing
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new PaymentProcessingException("Refund processing failed: " + e.getMessage());
        }
    }

    public String generateInvoice(String transactionId) {
        // In a real application, this would generate a proper invoice
        return "INV-" + transactionId + "-" + System.currentTimeMillis();
    }
}
