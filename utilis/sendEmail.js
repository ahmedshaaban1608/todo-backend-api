import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const serverUrl = process.env.SERVER_URL;
const serverPort = process.env.SERVER_PORT;
const email = process.env.EMAIL;
const emailPass = process.env.EMAIL_PASS;
// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (user) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: email,
        pass: emailPass,
      },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"TODO project" <ahmed2210shaaban@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: `${user.name} - Verify your account to ToDo project`, // Subject line
      html: ` <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    style="padding: 30px; background-color: #eceff1">
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="max-width: 600px">
          <tr>
            <td
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 36px 24px 0;
                font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                border-top: 3px solid #d4dadf;">
              <h1>Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="max-width: 600px">
          <tr>
            <td
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 24px;
                font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;">
              <p style="margin: 0">
                Tap the button below to confirm your email address. If you
                didn't create an account with
                <a href="${serverUrl}:${serverPort}">ToDO project</a>, you can safely
                delete this email.
              </p>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td
                          align="center"
                          bgcolor="#1a82e2"
                          style="border-radius: 6px">
                          <a
                            href=${serverUrl}:${serverPort}/verify/${user.id}
                            target="_blank"
                            style="
                              display: inline-block;
                              padding: 16px 36px;
                              font-family: 'Source Sans Pro', Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              color: #ffffff;
                              text-decoration: none;
                              border-radius: 6px;">Confirm your email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 24px;
                font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;">
              <p style="margin: 0">
                If that doesn't work, copy and paste the following link in
                your browser:
              </p>
              <p style="margin: 0">
                <a href=${serverUrl}:${serverPort}/verify/${user.id} target="_blank">${serverUrl}:${serverPort}/verify/${user.id}
                  </a>
              </p>
            </td>
          </tr>
                <tr>
            <td
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 24px;
                font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
                border-bottom: 3px solid #d4dadf;
              "
            >
              <p style="margin: 0">
                Best Regards,<br />
                ToDo project Team.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr></tr>
  </table>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
