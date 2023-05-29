const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const clientId =
  "754762656836-hfu8vulvrtgv31ese1bseebelp3m2lf6.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUrl = "TU_REDIRECT_URL";

const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["http://localhost:3000/oauth2callback/"],
});

console.log("Visita esta URL para obtener el código de autorización:", authUrl);

// Después de obtener el código de autorización:
const code = "CODIGO_DE_AUTORIZACION";

oauth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.error("Error al obtener los tokens:", err);
    return;
  }

  const refreshToken = tokens.refresh_token;
  const accessToken = tokens.access_token;

  console.log("refreshToken:", refreshToken);
  console.log("accessToken:", accessToken);
});
