import smtplib
import sys

def send_otp(email, otp):
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        email_address = "botforproject@gmail.com"
        password = "bbvogbdgqrwewvqw"  # Replace with your app password or use environment variables

        server.login(email_address, password)
        message = otp
        server.sendmail(email_address, email, message)
        server.quit()
        return True
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    email = sys.argv[1]  # Get email from command line arguments
    otp = sys.argv[2]    # Get OTP from command line arguments
    send_otp(email, otp)
