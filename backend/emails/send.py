import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Verification email after sign up
def send_verification_email(code, username, to_email):
    from_email = os.getenv("EMAIL_USER")
    from_password = os.getenv("EMAIL_PASS")

    if not from_email or not from_password:
        raise ValueError("Email credentials are not set in the .env file")
    
    # Read the HTML template from a file
    with open("emails/templates/verification_email.html", "r") as file:
        email_content = file.read()
    
    code_str = str(code)
    email_content = email_content.replace("{{ name }}", username)
    email_content = email_content.replace("{{ d1 }}", code_str[0])
    email_content = email_content.replace("{{ d2 }}", code_str[1])
    email_content = email_content.replace("{{ d3 }}", code_str[2])
    email_content = email_content.replace("{{ d4 }}", code_str[3])

    print(email_content)

    # Set up the MIME
    message = MIMEMultipart("alternative")
    message["From"] = from_email
    message["To"] = to_email
    message["Subject"] = "Please verify your email address"

    # Attach the HTML content
    mime_text = MIMEText(email_content, "html")
    message.attach(mime_text)

    # Set up the SMTP server
    server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    server.login(from_email, from_password)
    
    # Send the email
    server.sendmail(from_email, to_email, message.as_string())
    
    # Quit the server
    server.quit()

    return True