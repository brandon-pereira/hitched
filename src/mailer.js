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
    sendMail,
  };
}

function getTemplates(config) {
  console.log(config);
  return async () => {
    console.log("INSIDE");
    if (!config.admin.emailTemplates) {
      return [];
    }
    const files = await glob(config.admin.emailTemplates);
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
    console.log(templates);
    const template = templates.find((t) => t.templateId === templateId);
    console.log(templateId, templates);
    console.log(template);
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

const sendMail = async (options) => {
  console.log("SENDING EMAIL TO", options.to);
  const params = {
    Source: "noreply@emma-brandon.wedding",
    Destination: {
      ToAddresses: [options.to],
      BccAddresses: [process.env.GMAIL_USER],
    },
    ReplyToAddresses: [process.env.GMAIL_USER],
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
  console.log("DONE");
};

export default mailer;
