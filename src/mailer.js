import nunjucks from "nunjucks";
import AWS from "aws-sdk";
import glob from "tiny-glob";
import path from "path";

// Amazon SES configuration
const SESConfig = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};

nunjucks.configure({
  noCache: true,
});

function mailer({ config }) {
  return {
    getTemplates: getTemplates(config),
    useTemplate: useTemplate(config),
    sendMail: sendMail(config),
  };
}

function getTemplates(config) {
  return async () => {
    if (!config.emails.templates) {
      return [];
    }
    const files = await glob(config.emails.templates);
    return files.map((fpath) => {
      const templateId = path.basename(fpath, path.extname(fpath));
      const title = templateId
        .replace(/[0-9]{2,}/g, (match) => ` ${match} `)
        .replace(/[^A-Z0-9][A-Z]/g, (match) => `${match[0]} ${match[1]}`)
        .replace(
          /[A-Z][A-Z][^A-Z0-9]/g,
          (match) => `${match[0]} ${match[1]}${match[2]}`
        )
        .replace(/[ ]{2,}/g, (match) => " ")
        .replace(/\s./g, (match) => match.toUpperCase())
        .replace(/^./, (match) => match.toUpperCase())
        .trim();

      return { title, templateId, path: fpath };
    });
  };
}

const useTemplate = (config) => {
  const _getTemplates = getTemplates(config);
  return async (templateId, args) => {
    const templates = await _getTemplates();
    const template = templates.find((t) => t.templateId === templateId);
    if (!template) {
      throw new Error("Invalid template ID");
    }
    return new Promise((resolve, reject) => {
      nunjucks.render(template.path, args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  };
};

const sendMail = (config) => {
  return async (options) => {
    console.log("SENDING EMAIL TO", options.to);
    const params = {
      Source: config.emails.emailSender,
      Destination: {
        ToAddresses: [options.to],
        BccAddresses: [config.emails.emailReplyAddress],
      },
      ReplyToAddresses: [config.emails.emailReplyAddress],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: options.html,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: options.subject,
        },
      },
    };
    await new AWS.SES(SESConfig).sendEmail(params).promise();
  };
};

export default mailer;
