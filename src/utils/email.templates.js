function forgotPasswordEmailTemplate(otp) {
  const date = new Date();
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgot Password Email</title>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif; background: black">
    <table
      width="100%"
      role="presentation"
      cellspacing="0"
      border="0"
      style="background: black; color: rgb(236, 255, 253)"
    >
      <tr align="center">
        <td style="padding: 24px 16px">
          <table
            width="100%"
            role="presentation"
            cellspacing="0"
            border="0"
            style="max-width: 400px; border: 1px solid; padding: 16px"
          >
            <tr>
              <td>
                <h1 style="font-size: 18px">Forgot Your Password?</h1>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 14px">
                  We have recieved forgot password request. Please use the
                  following code to reset your password. This token will be
                  expired after
                  <strong>6 hours</strong>.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <span
                  style="
                    font-size: 18px;
                    background: white;
                    color: black;
                    display: inline-block;
                    padding: 10px 24px;
                  "
                >
                  ${otp}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 14px">
                  If you didn't request this email, ignore this email and delete
                  it.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 14px">
                  &copy;copyright Sofia Phone Store. ${date.getFullYear()} All rights are
                  reserved!
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

module.exports = {
  forgotPasswordEmailTemplate,
};
