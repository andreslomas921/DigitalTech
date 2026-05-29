import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Allow parsing larger payloads for attaching base64 receipt screenshots
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API endpoint for sending notifications
  app.post("/api/send-order", async (req, res) => {
    try {
      const { form, productTitle, finalPrice, selectedEdition, specsString, receiptImage } = req.body;
      
      if (!form || !productTitle || !finalPrice) {
        return res.status(400).json({ error: "Datos del pedido incompletos" });
      }

      const isTransfer = form.paymentMethod === "transfer";
      const paymentMethodLabel = isTransfer ? "🏦 Transferencia Bancaria" : "📦 Pago Contra Entrega";

      // 1. Setup mail options
      const emailSubject = `🚨 NUEVO PEDIDO REGISTRADO - ${form.city} - ${form.name}`;
      
      const emailBodyHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #1f2937;">
          <div style="background-color: #10b981; padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">DIGITAL TECH ECUADOR</h1>
            <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Notificación de Venta Registrada exitosamente</p>
          </div>
          
          <div style="padding: 24px; line-height: 1.6;">
            <h2 style="margin-top: 0; font-size: 18px; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
              Detalles de la Orden
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold; width: 150px;">Dispositivo:</td>
                <td style="padding: 6px 0; color: #111827; font-weight: bold;">${productTitle}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Presentación:</td>
                <td style="padding: 6px 0; color: #111827;">${selectedEdition === "bundle" ? "Edición con Combo Digital Tech" : "Edición Estándar"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Monto Final:</td>
                <td style="padding: 6px 0; color: #059669; font-weight: bold; font-size: 16px;">$${finalPrice} USD</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Forma de Pago:</td>
                <td style="padding: 6px 0; color: #1d4ed8; font-weight: bold;">${paymentMethodLabel}</td>
              </tr>
            </table>

            <h2 style="font-size: 18px; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px; margin-top: 24px;">
              Datos del Cliente
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold; width: 150px;">Nombre:</td>
                <td style="padding: 6px 0; color: #111827;">${form.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Email de Contacto:</td>
                <td style="padding: 6px 0; color: #111827;">${form.email}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Teléfono:</td>
                <td style="padding: 6px 0; color: #111827; font-weight: bold;">${form.phone}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Ciudad / Cantón:</td>
                <td style="padding: 6px 0; color: #111827;">${form.city}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Dirección Exacta:</td>
                <td style="padding: 6px 0; color: #111827;">${form.address}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Código Postal:</td>
                <td style="padding: 6px 0; color: #111827;">${form.postalCode || "N/A"}</td>
              </tr>
            </table>

            <h2 style="font-size: 18px; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px; margin-top: 24px;">
              Especificaciones del Equipo
            </h2>
            <pre style="background-color: #f9fafb; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; border: 1px solid #e5e7eb; white-space: pre-wrap; color: #4b5563;">${specsString}</pre>

            ${isTransfer && receiptImage ? `
              <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 16px; margin-top: 24px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #065f46;">📸 Comprobante de Transferencia Adjunto</p>
                <p style="margin: 0; font-size: 12px; color: #047857;">Nombre de archivo: ${receiptImage.name || 'comprobante.png'}</p>
              </div>
            ` : ""}
          </div>
          
          <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af;">
            <p style="margin: 0 0 4px 0;">Este es un mensaje de control directo registrado en el sistema de ventas de Digital Tech.</p>
            <p style="margin: 0; font-weight: bold;">Destinatario Principal: andres.lomas921@gmail.com</p>
          </div>
        </div>
      `;

      // 2. Transporter configuration (Check for credentials in process.env)
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = Number(process.env.SMTP_PORT) || 465;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      let transporter: nodemailer.Transporter;
      let isEthereal = false;
      let etherealUrl = "";

      if (smtpUser && smtpPass) {
        // Real SMTP configured by user
        console.log(`[SMTP] Usando configuración real SMTP con usuario: ${smtpUser}`);
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true for 465
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });
      } else {
        // No SMTP configured, fallback to fake Ethereal SMTP for seamless local/preview verification
        console.log("[SMTP] Sin configuración SMTP en variables de entorno. Generando cuenta Ethereal de prueba...");
        const testAccount = await nodemailer.createTestAccount();
        isEthereal = true;
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      }

      // Configure recipient lists: always send to the shop owner, and optionally CC the customer
      const mailOptions: nodemailer.SendMailOptions = {
        from: smtpUser ? `"Digital Tech Ventas" <${smtpUser}>` : `"Digital Tech Ventas" <sales@digitaltech.com.ec>`,
        to: "andres.lomas921@gmail.com",
        cc: form.email || undefined,
        subject: emailSubject,
        html: emailBodyHTML,
      };

      // Add receipt image as attachment if present
      if (isTransfer && receiptImage && receiptImage.base64) {
        const base64Content = receiptImage.base64.split(";base64,").pop();
        if (base64Content) {
          mailOptions.attachments = [
            {
              filename: receiptImage.name || "comprobante.png",
              content: base64Content,
              encoding: "base64",
            },
          ];
        }
      }

      // Send the actual mail
      const info = await transporter.sendMail(mailOptions);
      console.log("[SMTP] Correo enviado exitosamente:", info.messageId);

      if (isEthereal) {
        etherealUrl = nodemailer.getTestMessageUrl(info) || "";
        console.log(`[SMTP] Enlace de previsualización Ethereal: ${etherealUrl}`);
      }

      res.json({
        success: true,
        message: "Pedido registrado y enviado por correo.",
        messageId: info.messageId,
        isEthereal,
        etherealUrl,
      });

    } catch (error: any) {
      console.error("[SMTP Error] Error al enviar correo de la orden:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Error interno del servidor al procesar el envío de correo",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Vite] Integrado en modo desarrollo con middlewareMode");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[Vite] Sirviendo archivos estáticos de producción desde", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Corriendo en puerto ${PORT}`);
  });
}

startServer();
