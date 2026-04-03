const nodemailer=require("nodemailer");
const dotenv=require("dotenv");
dotenv.config();

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});


exports.sendOtpEmail = async (email, otp, type, eventName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: type === "account_verification" 
            ? "Account Verification OTP" 
            : "Booking Confirmation OTP",

        html: `
        <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
            <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                
                <h2 style="color:#333;">
                    ${type === "account_verification" 
                        ? "🔐 Account Verification" 
                        : "🎟️ Booking Confirmation"}
                </h2>

                ${
                    type === "booking" && eventName
                    ? `
                    <p style="color:#555; font-size:16px;">
                        You are booking for:
                    </p>
                    <h3 style="color:#2c3e50; margin-bottom:15px;">
                        ${eventName}
                    </h3>
                    `
                    : ""
                }

                <p style="color:#555; font-size:16px;">
                    Your OTP for 
                    <strong>
                        ${type === "account_verification" 
                            ? "account verification" 
                            : "booking confirmation"}
                    </strong>
                    is:
                </p>

                <div style="margin:20px 0;">
                    <span style="font-size:28px; letter-spacing:5px; font-weight:bold; color:#2c3e50; background:#ecf0f1; padding:10px 20px; border-radius:8px;">
                        ${otp}
                    </span>
                </div>

                <p style="color:#888; font-size:14px;">
                    ⏳ This OTP will expire in <strong>5 minutes</strong>.
                </p>

                <hr style="margin:25px 0; border:none; border-top:1px solid #eee;">

                <p style="font-size:12px; color:#aaa;">
                    If you didn’t request this, please ignore this email.
                </p>
            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully");
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};
