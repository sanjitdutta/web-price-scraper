"""Sends email to watcher"""

import smtplib
from email.message import EmailMessage

def connect():
    """Opens connection to SMTP server"""
    return smtplib.SMTP("localhost")

def close(connection):
    """Closes connection to SMTP server"""
    connection.quit()

def send_email(connection, subject, recipient, sender, body):
    """Sends an email based on arguemnts using connection"""
    msg = EmailMessage()
    msg.set_content(body)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient
    connection.send_message(msg)
