"""Sends email to watcher"""

import smtplib

def connect():
    return smtplib.SMTP("localhost")

def quit(connection):
    connection.quit()

def send_email(connection, subject, recipient, sender, body):
    pass
