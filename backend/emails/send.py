import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Verification email after sign up
def send_verification_email(code, username, email):
    from_email = "your_email@example.com"
    from_password = "your_email_password"
    
    # Read the HTML template from a file
    with open("emails/templates/verification_email.html", "r") as file:
        email_content = file.read()
    
    code_str = str(code)
    email_content = email_content.format(name=username, d1=code_str[0], d2=code_str[1], d3=code_str[2], d4=code_str[3])

    print(email_content)

    return True